cc.Class({
    extends: cc.Component,

    properties: {
        username: cc.EditBox,
    },

    // use this for initialization
    onLoad: function () {
        aliensBoot.onMsg('userLoginRet', this.userLoginRet.bind(this));
        // 每次连接成功都需要重新登录授权
        //aliensBoot.onMsg('reconnected', this.onReconnected.bind(this));
        //aliensBoot.onMsg('reconnecting', this.onReconnecting.bind(this));
        //aliensBoot.onMsg('quit', this.onDisconnected.bind(this));
        aliensBoot.onMsg('errcode', this.showErrCode.bind(this));
        aliensBoot.onMsg('kick', this.onKick.bind(this));
    },

    // called every frame
    update: function (dt) {

    },

    userLoginRet : function (param) {

    },

    showErrCode : function (param) {
        aliensBoot.log("errcode:" + param)
    },

    onKick : function () {
        aliensBoot.log("kick:" + param)
        aliensBoot.closeReconnect();
        cc.director.loadScene("loginScene");
    },

    login: function(username) {
        this.data = {
            'username': this.username.string,
            'password': "11111",
        };
        aliensBoot.connect(
            () => {
                aliensBoot.invoke("userLogin", this.data, function(data) {
                    // TODO 国际化处理
                    if (data.result !== 0) {
                        aliensBoot.log("login error:" + data.result)
                        return;
                    }
                    aliensBoot.log("login success")
                    aliensBoot.openReconnect();
                    cc.director.loadScene("spaceScene");
                })
            }, () => {
                aliensBoot.log('登录连接失败!');
            },
        );


    }


});
