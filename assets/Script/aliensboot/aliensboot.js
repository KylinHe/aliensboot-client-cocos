
import network from './net/network';
import abConfig from './config/abConfig';

// eslint-disable-next-line no-multi-assign
const aliensBoot = window.aliensBoot = window.aliensBoot || {};

aliensBoot.listeners = {};

// 初始化
aliensBoot.init = function () {
    this.debug = true;
    this.network = network;
    this.network.init(abConfig.network);
    this.network.regMsgCallback(aliensBoot._onMsg.bind(this));
};

aliensBoot.connect = function (...param) {
    this.network.connect(...param);
};

aliensBoot.openReconnect = function() {
    this.network.openReconnect();
};

aliensBoot.closeReconnect = function() {
    this.network.closeReconnect();
};

aliensBoot.invoke = function (requestName, data, callback) {
    aliensBoot.log(`#send data:${requestName}-${JSON.stringify(data)}`);
    this.network.send(requestName, data, { data, callback });
};

// 测试消息响应句柄
aliensBoot.onMsg = function (responseName, cb) {
    if (typeof cb !== 'function') { // 是函数    其中 FunName 为函数名称
        aliensBoot.log('invalid response callback type');
        return;
    }
    aliensBoot.listeners[responseName] = cb;
};

aliensBoot._onMsg = function (responseName, data, sessionData) {
    // aliensBoot.log(data)
    aliensBoot.log(`#receive data:${responseName}:${JSON.stringify(data)}`);
    // 清除会话数据
    let requestData;
    if (sessionData) {
        requestData = sessionData.data;
        if (sessionData.callback) {
            sessionData.callback(data, requestData);
        }
    }
    const callback = aliensBoot.listeners[responseName];
    if (callback) {
        callback(data, requestData);
    }
};

aliensBoot.log = function(...args) {
    if (abConfig.debug) {
        cc.log(...args);
    }
};

if (!CC_EDITOR) {
    aliensBoot.init();
}
