cc.Class({
    extends: cc.Component,

    properties: {
        username: cc.EditBox,
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame
    update: function (dt) {

    },

    login: function(username) {
        aliensBoot.onResponse("offline", function() {
            //重新回到主场景
            cc.director.loadScene("loginScene");
        })

        aliensBoot.invoke("userLogin", {username:this.username.string, password:"11111"}, function(data) {
            cc.director.loadScene("spaceScene");
        })

    }


});
