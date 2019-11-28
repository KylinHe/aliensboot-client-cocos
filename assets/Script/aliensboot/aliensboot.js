
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
    this.sessionData = {}; // 用于存储发送时的参数
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
    this.saveSessionData(requestName, data);
    if (callback) {
        // TODO 校验响应接口
        aliensBoot.onMsg(`${requestName}Ret`, callback);
    }
    this.network.send(requestName, data);
};

// 测试消息响应句柄
aliensBoot.onMsg = function (responseName, cb) {
    if (typeof cb !== 'function') { // 是函数    其中 FunName 为函数名称
        aliensBoot.log('invalid response callback type');
        return;
    }
    aliensBoot.listeners[responseName] = cb;
};

aliensBoot._onMsg = function (responseName, data) {
    // aliensBoot.log(data)
    aliensBoot.log(`#receive data:${responseName}:${JSON.stringify(data)}`);
    const callback = aliensBoot.listeners[responseName];
    const sendData = this.popSessionData(responseName);

    if (callback) {
        callback(data, sendData);
    }
};

/**
 * 获取send的data
 * @param responseName
 * @returns {null}
 */
aliensBoot.popSessionData = function(responseName) {
    let sentData = null;
    if (this.sessionData[responseName] && this.sessionData[responseName].length > 0) {
        sentData = this.sessionData[responseName].shift();
    }
    return sentData;
};

/** 保存对应消息包发送数据 */
aliensBoot.saveSessionData = function(requestName, data) {
    this.sessionData[`${requestName}Ret`] = this.sessionData[`${requestName}Ret`] || [];
    this.sessionData[`${requestName}Ret`].push(data);
};

aliensBoot.log = function(...args) {
    if (abConfig.debug) {
        cc.log(...args);
    }
};

if (!CC_EDITOR) {
    aliensBoot.init();
}
