cc.Class({

    extends: cc.Component,

    properties: {

        entity: cc.Prefab, //场景内允许的创建的entity prefab

        towerRange:100, //监视塔的范围

        infoLabel: cc.Label, //显示玩家当前信息

        spaceIDEditBox: cc.EditBox //输入玩家需要跳转的场景
    },

    // use this for initialization
    onLoad: function () {
        //注册事件
        this.registerEvent()

        //玩家自身
        this.player = null

        //当前场景id
        this.spaceID = ""

        //当前场景视野内的玩家
        this.players = {}

        //绘制地图
        this.mash()

        let manager = cc.director.getCollisionManager();
        manager.enabledDebugDraw = true;
        manager.enabled = true;

        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            //获取当前点击的全局坐标
            var temp = event.getLocation()
            if (this.player != null) {
                var newPos = this.node.parent.convertToNodeSpaceAR(temp)
                this.player.moveTo(newPos)
                this.updateInfo(this.spaceID, newPos)
            }
        }.bind(this))

        //登录角色场景
        aliensBoot.invoke("loginRole", {})
    },

    registerEvent: function() {
        //处理登录场景成功业务
        aliensBoot.onResponse("scenePush", function(data) {
            if (this.player == null) {
                this.player = this.newEntity(data["entity"])
            }
            this.updateInfo(data["spaceID"], this.player.node.getPosition())
        }.bind(this))

        aliensBoot.onResponse("entityPush", function(data) {
            this.updateNeighbors(data["neighbors"])
        }.bind(this))

    },


    //移动到指定空间
    moveSpace: function() {
        let newSpaceID = this.spaceIDEditBox.string
        if (newSpaceID == "" || newSpaceID == this.spaceID) {
            aliensBoot.log("invalid spaceID :" + newSpaceID)
            return
        }
        aliensBoot.invoke("moveScene", {"spaceID": newSpaceID})
    },

    updateInfo: function(spaceID, pos) {
        this.spaceID = spaceID
        if (this.player != null) {
            this.infoLabel.string = "当前位置: " + this.spaceID  + "[" + pos.x + "," + pos.y + "]"
        } else {
            this.infoLabel.string = "未进入场景"
        }
    },

    mash : function() {
        let graphics = this.node.getComponent(cc.Graphics)
        let size = cc.winSize//this.node.getContentSize();
        let numXSlots = parseInt(size.width / this.towerRange) + 1
        let numYSlots = parseInt(size.height / this.towerRange) + 1

        for (var x = 0; x < numXSlots; x++) {
            for (var y = 0; y < numYSlots; y++) {
                graphics.rect(x * this.towerRange, y * this.towerRange, this.towerRange,this.towerRange);
                aliensBoot.log("init tower ", x , y)
            }
        }
        graphics.stroke();
    },

    //新建entity
    newEntity : function(entityData) {
        var node = cc.instantiate(this.entity);
        var entity = node.getComponent("entity")
        entity.init(entityData)
        this.node.addChild(node)
        return entity
    },

    updateNeighbors: function(players) {
        for(var playerID in this.players){
            if (!this.containsPlayer(players, playerID)) {
                this.players[playerID].node.removeFromParent()
                this.players[playerID].node.destroy()
                delete this.players[playerID]
            }
        }
        for (var i = 0; i < players.length; i++) {
            let playerData = players[i]
            var playerID = playerData.id
            if (this.player != null && this.player.id == playerID) {
                continue
            }
            var oldPlayer = this.players[playerID]
            if (oldPlayer == undefined) {
                this.players[playerID] = this.newEntity(playerData)
            } else {
                oldPlayer.moveTo(players[i].position)
            }
        }

    },

    containsPlayer: function(players, id) {
        for (var i = 0; i < players.length; i++) {
            if (id == players[i].id) {
                return true
            }
        }
        return false
    },

});