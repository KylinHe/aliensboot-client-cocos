var aliensBot = window.aliensBot = window.aliensBot || {};

aliensBot.listeners = {}

//初始化
aliensBot.init = function (wsUrl, routes) {
    this.debug = true

    let protocol = require("protocol/protocol")
    let processor = require("net/msgProcessor")
    this.network = require("net/network");

    processor.init(protocol, routes)

    this.network.init(wsUrl, processor, )
    this.network.regMsgCallback(aliensBot.onMsg.bind(this))
};

aliensBot.invoke = function (requestName, data, callback) {
    aliensBot.log("#send data:" + requestName + "-" +  JSON.stringify(data));

    if (callback) {
        //TODO 校验响应接口
        aliensBot.onResponse(requestName + "Ret", callback)
    }
    this.network.send(requestName, data)
};

//调用服务端实体方法
aliensBot.entityCall = function(entityID, method, args) {
    let params = []
    if (args != null) {
        for (let i=0; i< args.length; i++) {
            aliensBot.log(typeof args[i])
            let buffer = msgpack.encode(args[i]);
            params.push(buffer)
        }
    }

    // for (let i=0; i< params.length; i++) {
    //     let data = msgpack.decode(params[i]);
    //     aliensBot.log(data)
    // }
    aliensBot.invoke("entityCall", {entityID:entityID, method:method, args:params})
};

aliensBot.onMsg = function (responseName, data) {
    aliensBot.log("#receive data:" + responseName + ":" + JSON.stringify(data));
    let callback = aliensBot.listeners[responseName]

    if (callback) {
        callback(data)
    }
};

//测试消息响应句柄
aliensBot.onResponse = function (responseName, cb) {
    if(typeof cb !== "function") { //是函数    其中 FunName 为函数名称
        aliensBot.log("invalid response callback type")
        return
    }
    aliensBot.listeners[responseName] = cb
};

aliensBot.log = function(...args) {
    if (this.debug) {
        cc.log(...args)
    }
};