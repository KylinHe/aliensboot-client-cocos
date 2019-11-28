// aliensboot configure

// eslint-disable-next-line no-multi-assign
const aliensBoot = window.aliensBoot = window.aliensBoot || {};

const abConfig = {
    debug: true,
    network: {
        // wsUrl: 'ws://10.15.1.41:28107', // server address
        // wsUrl: 'ws://qa.game.aliensidea.com/slgserver', // server address
        // wsUrl: 'ws://10.100.1.186:28107', // server address
        // wsUrl: 'ws://192.168.10.122:28107', // 老贺的电脑
        wsUrl: 'ws://127.0.0.1:28107', // 本地

        // 心跳检查 无则不开启
        heartCheck: {
            opt: true, // 是否开启心跳优化、正常消息包参与tick计数、减少消息传输量,
            interval: 5, // 发送心跳间隔时间 在成功收到服务端心跳响应才会发下一个心跳请求
            timeout: 8, // 心跳检查超时时间 心跳超过此时间没有响应关闭退出
        },

        // 断线重连 无则不开启
        reconnect: {
            interval: 3, // 重连间隔时间
            maxCount: 5, // 最大重连次数
        },

        // 消息路由 与服务器一致 参考服务端配置 gate.yml-routes
        routes: {
            gate: 1000, passport: 1, game: 2, battle: 3, chat: 4, mail: 5, match: 6, explore: 7, fight: 8, social: 9, union: 10,
        },
    },
};

aliensBoot.config = abConfig;

export default abConfig;
