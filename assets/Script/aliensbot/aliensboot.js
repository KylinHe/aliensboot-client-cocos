var aliensBoot = window.aliensBoot = window.aliensBoot || {};

aliensBoot.listeners = {}

//初始化
aliensBoot.init = function () {
    this.debug = true
    let protocol = require("protocol/protocol")
    let processor = require("net/msgProcessor")
    this.network = require("net/network");
    let config = require("config/config")

    processor.init(protocol, config.routes)
    this.network.init(processor, config.network)

    this.network.regMsgCallback(aliensBoot.onMsg.bind(this))
};

aliensBoot.invoke = function (requestName, data, callback) {
    aliensBoot.log("#send data:" + requestName + "-" +  JSON.stringify(data));

    if (callback) {
        //TODO 校验响应接口
        aliensBoot.onResponse(requestName + "Ret", callback)
    }
    this.network.send(requestName, data)
};

//测试消息响应句柄
aliensBoot.onResponse = function (responseName, cb) {
    if(typeof cb !== "function") { //是函数    其中 FunName 为函数名称
        aliensBoot.log("invalid response callback type")
        return
    }
    aliensBoot.listeners[responseName] = cb
};


//调用服务端实体方法
aliensBoot.entityCall = function(entityID, method, args) {
    let params = []
    if (args != null) {
        for (let i=0; i< args.length; i++) {
            aliensBoot.log(typeof args[i])
            let buffer = msgpack.encode(args[i]);
            params.push(buffer)
        }
    }
    // for (let i=0; i< params.length; i++) {
    //     let data = msgpack.decode(params[i]);
    //     aliensBoot.log(data)
    // }
    aliensBoot.invoke("entityCall", {entityID:entityID, method:method, args:params})
};

aliensBoot.onMsg = function (responseName, data) {
    aliensBoot.log("#receive data:" + responseName + ":" + JSON.stringify(data));
    let callback = aliensBoot.listeners[responseName]

    if (callback) {
        callback(data)
    }
};

aliensBoot.log = function(...args) {
    if (this.debug) {
        cc.log(...args)
    }
};

aliensBoot.init()