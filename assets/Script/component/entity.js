cc.Class({

    extends: cc.Component,

    properties: {

        icons: [cc.SpriteFrame],

        nickname: cc.Label, //名字组件

        view: cc.Node, //视野

        speed: 100, //移动速度

        viewRadius : 100 //视野范围
    },

    init: function(entityData) {
        this.id = entityData["id"]
        this.attrs = entityData["attrs"]
        let position = entityData["position"]

        this.node.x = position.x
        this.node.x = position.y
        this.nickname.string = "" + this.id
    },

    // use this for initialization
    onLoad: function () {
        let graphics = this.view.getComponent(cc.Graphics)
        graphics.rect(this.view.x, this.view.y, this.viewRadius * 2, this.viewRadius * 2);
    },


    //移动位置
    moveTo: function(position) {
        //获取当前的玩家的局部坐标
        var po1 = this.node.getPosition()
        if (po1.x == position.x && po1.y == position.y) {
            return
        }

        //计算玩家移动的时间
        var playTime = cc.pDistance(position, po1) / this.speed

        //让玩家移动到点击位置
        var action = cc.moveTo(playTime, position);

        cc.log("", "玩家坐标", po1.x,po1.y, " => " + position.x,position.y)

        //移动前停止所有动作
        this.node.stopAllActions()
        //进行移动
        this.node.runAction(action);

        this.entityCall("Move", "" + position.x, "" + position.y)
    },


    //调用服务端实体方法
    entityCall: function(method, ...args) {
        aliensBoot.entityCall(this.id, method, args)
    }

});
