cc.Class({
    extends: cc.Component,

    properties: {
        username: cc.EditBox,
        wsURL: 'ws://127.0.0.1:28107'
    },

    // use this for initialization
    onLoad: function () {
        //每个模块和消息编号的对应关系  消息格式为 |msgID-2位|protobuf data|
        let routes = {gate: 1000, passport: 1, game: 2, room: 3, hall: 8, scene: 9};

        //初始化
        aliensBot.init(this.wsURL, routes)
    },

    // called every frame
    update: function (dt) {

    },

    login: function(username) {
        aliensBot.onResponse("offline", function() {
            //重新回到主场景
            cc.director.loadScene("loginScene");
        })

        aliensBot.invoke("userLogin", {username:this.username.string, password:"11111"}, function(data) {
            cc.director.loadScene("spaceScene");
        })

    }


});
