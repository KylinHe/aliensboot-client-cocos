var config = {};

config.network = {
    wsUrl : 'ws://127.0.0.1:28107', //server address

    heartbeat: {
        interval:10, //心跳间隔时间 0不开启心跳
        opt:true, //是否开启心跳优化、正常消息包参与tick计数、减少消息传输量,
        timeout: 5, //心跳超时时间
    },
    reconnect:{
        interval:5, //重连间隔时间
        maxCount:3 //最大重连次数
    }
}

//消息路由
config.routes = {gate: 1000, passport: 1, game: 2, room: 3, hall: 8, scene: 9}


module.exports = config;