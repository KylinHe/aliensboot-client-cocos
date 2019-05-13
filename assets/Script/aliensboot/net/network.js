var network = {};

network.init = function (msgProcessor, config) {
    this.updateConfig(config)
    this.processor = msgProcessor;
    this.ready = false
    this.connect();

    // if (network.config.heartbeat != null) {
    //     this.heartbeatTimer = setInterval(this.tick.bind(this), this.config.heartbeat.interval * 1000)
    // }

};

network.updateConfig =function(config) {
    //TODO 检查配置对象
    this.config = config
};


//连接超时
network.onTimeout = function () {

};


network.tick = function() {
    //发送心跳包
    if (!this.isConnected()) {
        return
    }
    //network.send("heartbeat", {})
};

network.onHeartbeat = function() {
    //发送心跳包


};

network.connect = function () {
    if (this.web_socket) {
        this.web_socket.close();
        this.web_socket = null;
    }

    this.web_socket = new WebSocket(this.config.wsUrl);
    this.web_socket.binaryType = "arraybuffer";
    this.web_socket.onmessage = function (event) {
        var info = this.processor.decode(event.data);
        if (info == null) {
            return
        }

        var msgName = info[1];
        var msgContent = info[2];
        if (this.msgCb) this.msgCb(msgName, msgContent);
    }.bind(this);

    this.web_socket.onopen = function (event) {
        //cc.log("onopen------------");
        this.ready = true;
        if (this.msgCb) this.msgCb("online", {});
    }.bind(this);

    this.web_socket.onclose = function (event) {
        //cc.log("onclose------------");
        this.web_socket = null;

        if (this.msgCb) this.msgCb("offline", {});
    }.bind(this);

    this.web_socket.onerror = function (event) {
        //cc.log("onerror------------");
        if (this.msgCb) this.msgCb("offline", {});
    }.bind(this);

    this.web_socket.ontimeout
};

network.send = function (reqName, originData) {
    if (!this.isConnected()) {
        console.error("websocket is not init");
        return;
    }
    var data = {};
    data[reqName] = originData;

    var sendData = this.processor.encode(reqName, data);
    var err = this.web_socket.send(sendData);

    if (err) {
        cc.log(err)
    }
};


network.isConnected = function() {
    return this.ready && this.web_socket
}

network.regMsgCallback = function (cb) {
    network.msgCb = cb;
};

//network._init();
module.exports = network;