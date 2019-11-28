/**
 * Created by kylin on 2019/4/13.
 * aliensboot network layer
 */

const network = {};

// Msg
// 'online'
// 'offline'
// 'reconnecting'   //开始重连
// 'reconnected'    //重连成功
// 'quit'  //重连指定次数失败

network.init = function (config) {
    this.config = config;
    const msgProcessor = require('msgProcessor');
    const protocol = require('protocol');

    // 初始化消息编解码器
    msgProcessor.init(protocol, config.routes);
    this._processor = msgProcessor;
    this._connected = false;
};

// 心跳检查
network.heartCheck = function () {
    const heartCheckConfig = this.config.heartCheck;
    if (!heartCheckConfig) {
        aliensBoot.log('heartCheck is not open.');
        return;
    }
    const self = this;

    this.cleanHeartCheck();

    this._heartbeatTimer = setTimeout(() => {
        // 发送心跳包
        // self.heartbeat();
        // 开启超时监听 超时时间没有响应则关闭连接 触发重连
        // self._timeoutTimer = setTimeout(() => {
        //     aliensBoot.log(`heartbeat timeout:${heartCheckConfig.timeout}`);
        //     self.close();
        // }, heartCheckConfig.timeout * 1000);
    }, heartCheckConfig.interval * 1000);
};

network.cleanHeartCheck = function () {
    // 清除心跳监听
    this._heartbeatTimer && clearTimeout(this._heartbeatTimer);
    // 清除超时监听
    this._timeoutTimer && clearTimeout(this._timeoutTimer);
};

// 向服务器发送心跳包
network.heartbeat = function () {
    // 发送心跳包
    // aliensBoot.log('send heartbeat');
    this.send('heartbeat', {});
};

// 接收服务器心跳包响应
network.onHeartbeat = function () {
    // 接收心跳包
    // aliensBoot.log('recv heartbeat');
    // 发送下一个心跳包
    this.heartCheck();
};

network.connect = function (success, failed) {
    aliensBoot.log(`connecting to ${this.config.wsUrl}`);
    // 防止重复连接
    if (this.isConnected()) {
        if (success) {
            success();
            success = null;
        }
        return;
        // this.web_socket.close();
        // this.web_socket = null;
    }
    this.web_socket = new WebSocket(this.config.wsUrl);
    this.web_socket.binaryType = 'arraybuffer';
    this.web_socket.onmessage = function (event) {
        const infos = this._processor.decode(event.data);
        for (let i = 0; i < infos.length; i++) {
            const info = infos[i];
            if (info == null) {
                continue;
            }
            const msgName = info[1];
            if (msgName === 'heartbeat') {
                this.onHeartbeat();
                continue;
            }
            const msgContent = info[2];
            if (this._msgCb) this._msgCb(msgName, msgContent);
        }
    }.bind(this);

    this.web_socket.onopen = function (event) {
        // aliensBoot.log('onopen');
        this._connected = true;
        if (this._reconnectCount > 0) {
            this.notify('reconnected');
        }
        // 连接成功后开启重连
        // this.openReconnect();
        // 连接成功开启心跳检查
        this.heartCheck();
        this.notify('online');
        if (success) {
            success();
            success = null;
        }
        if (failed) {
            failed = null;
        }
    }.bind(this);

    this.web_socket.onclose = function (event) {
        // aliensBoot.log('onclose');
        this.onOffline();
        if (failed) {
            failed();
            failed = null;
        }
    }.bind(this);

    this.web_socket.onerror = function (event) {
        // aliensBoot.log('onerror');
        this.onOffline();
        if (failed) {
            failed();
            failed = null;
        }
    }.bind(this);
};

network.onOffline = function () {
    this._connected = false;
    this.cleanHeartCheck();
    this.notify('offline');
    this.reconnect();
};

// 开启断线重连
network.openReconnect = function () {
    // 是否开启重连
    this._reconnectingFlag = true;
    // 重连次数
    this._reconnectCount = 0;
    // 重连状态
    this._reconnecting = false;
};

// 关闭断线重连
network.closeReconnect = function () {
    // 是否开启重连
    this._reconnectingFlag = false;
};

network.close = function () {
    if (this.web_socket) {
        this.web_socket.close();
        this.web_socket = null;
    }
};

network.send = function (reqName, originData) {
    if (!this.isConnected()) {
        console.error('websocket is not open');
        return;
    }
    const data = {};
    data[reqName] = originData;

    const sendData = this._processor.encode(reqName, data);
    const err = this.web_socket.send(sendData);

    if (err) {
        aliensBoot.log(err);
    }
};

network.reconnect = function () {
    // 关闭重连
    if (!this._reconnectingFlag || this._reconnecting) {
        return;
    }
    const reconnectConfig = this.config.reconnect;
    if (!reconnectConfig) {
        this.closeReconnect();
        aliensBoot.log('reconnect is not configure.');
        this.notify('quit');
        return;
    }
    if (this._reconnectCount >= reconnectConfig.maxCount) {
        this.closeReconnect();
        aliensBoot.log('reconnect max limit.');
        this.notify('quit');
        return;
    }

    // 通知重连中
    this.notify('reconnecting');

    const self = this;
    this._reconnecting = true;
    this._reconnectCount++;
    this._reconnectTimer && clearTimeout(this._reconnectTimer);
    this._reconnectTimer = setTimeout(() => {
        self.connect();
        aliensBoot.log(`reconnecting count: ${self._reconnectCount}`);
        self._reconnecting = false;
    }, reconnectConfig.interval * 1000);
};

network.isConnected = function () {
    return this.web_socket && this._connected;
};

network.regMsgCallback = function (cb) {
    network._msgCb = cb;
};

network.notify = function (param) {
    if (this._msgCb) this._msgCb(param, {});
};


// if(!CC_EDITOR) {
//     network.init();
// }
module.exports = network;
