var protocol=dcodeIO.ProtoBuf.newBuilder({"populateAccessors":true})['import']({"package":"protocol","syntax":"proto3","messages":[{"name":"Role","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"id","id":1,"options":{"(gogoproto.moretags)":"bson:\\\"_id\\\" gorm:\\\"AUTO_INCREMENT\\\""}},{"rule":"optional","type":"int64","name":"uid","id":2,"options":{"(gogoproto.moretags)":"bson:\\\"uid\\\" unique:\\\"true\\\""}},{"rule":"optional","type":"string","name":"nickname","id":3,"options":{"(gogoproto.moretags)":"bson:\\\"nickname\\\""}},{"rule":"optional","type":"string","name":"spaceID","id":4,"options":{"(gogoproto.moretags)":"bson:\\\"spaceID\\\""}}]},{"name":"getRoleInfo","syntax":"proto3","fields":[]},{"name":"getRoleInfoRet","syntax":"proto3","fields":[{"rule":"repeated","type":"Role","name":"role","id":1}]},{"name":"loginRole","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"roleId","id":1}]},{"name":"loginRoleRet","syntax":"proto3","fields":[{"rule":"optional","type":"Role","name":"role","id":1}]},{"name":"changeNickname","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"newName","id":1}]},{"name":"changeNicknameRet","syntax":"proto3","fields":[{"rule":"optional","type":"bool","name":"result","id":1}]},{"name":"kickOut","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"authID","id":1},{"rule":"optional","type":"KickType","name":"kickType","id":2}]},{"name":"pushMessage","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"authID","id":1},{"rule":"optional","type":"bytes","name":"data","id":2},{"rule":"optional","type":"string","name":"service","id":3}]},{"name":"bindService","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"authID","id":1},{"rule":"map","type":"string","keytype":"string","name":"binds","id":2}]},{"name":"bindServiceRet","syntax":"proto3","fields":[{"rule":"optional","type":"bool","name":"result","id":1}]},{"name":"heartBeat","syntax":"proto3","fields":[]},{"name":"quickMatch","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"appid","id":1}]},{"name":"quickMatchRet","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"roomid","id":1},{"rule":"optional","type":"string","name":"node","id":2}]},{"name":"User","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"id","id":1,"options":{"(gogoproto.moretags)":"bson:\\\"_id\\\" gorm:\\\"AUTO_INCREMENT\\\""}},{"rule":"optional","type":"string","name":"username","id":2,"options":{"(gogoproto.moretags)":"bson:\\\"username\\\" unique:\\\"true\\\""}},{"rule":"optional","type":"string","name":"password","id":3,"options":{"(gogoproto.moretags)":"bson:\\\"password\\\""}},{"rule":"optional","type":"string","name":"salt","id":4,"options":{"(gogoproto.moretags)":"bson:\\\"salt\\\""}},{"rule":"optional","type":"string","name":"channeluid","id":5,"options":{"(gogoproto.moretags)":"bson:\\\"cuid\\\""}},{"rule":"optional","type":"string","name":"channel","id":6,"options":{"(gogoproto.moretags)":"bson:\\\"channel\\\""}},{"rule":"optional","type":"string","name":"avatar","id":7,"options":{"(gogoproto.moretags)":"bson:\\\"avatar\\\""}},{"rule":"optional","type":"string","name":"mobile","id":8,"options":{"(gogoproto.moretags)":"bson:\\\"mobile\\\"  rorm:\\\"-\\\""}},{"rule":"optional","type":"string","name":"openid","id":9,"options":{"(gogoproto.moretags)":"bson:\\\"openid\\\""}},{"rule":"optional","type":"int32","name":"status","id":10,"options":{"(gogoproto.moretags)":"bson:\\\"status\\\""}},{"rule":"optional","type":"int64","name":"regTime","id":11,"options":{"(gogoproto.moretags)":"bson:\\\"regtime\\\""}}]},{"name":"userRegister","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"username","id":1},{"rule":"optional","type":"string","name":"password","id":2},{"rule":"optional","type":"int32","name":"server","id":3}]},{"name":"userRegisterRet","syntax":"proto3","fields":[{"rule":"optional","type":"RegisterResult","name":"result","id":1},{"rule":"optional","type":"int64","name":"uid","id":2},{"rule":"optional","type":"string","name":"token","id":3},{"rule":"optional","type":"string","name":"msg","id":4},{"rule":"optional","type":"int64","name":"serverTime","id":5}]},{"name":"userLogin","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"username","id":1},{"rule":"optional","type":"string","name":"password","id":2}]},{"name":"userLoginRet","syntax":"proto3","fields":[{"rule":"optional","type":"LoginResult","name":"result","id":1},{"rule":"optional","type":"int64","name":"uid","id":2},{"rule":"optional","type":"string","name":"token","id":3},{"rule":"optional","type":"string","name":"msg","id":4},{"rule":"optional","type":"int64","name":"serverTime","id":5}]},{"name":"channelLogin","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"channel","id":1},{"rule":"optional","type":"string","name":"channelUID","id":2},{"rule":"optional","type":"string","name":"sdk","id":3},{"rule":"optional","type":"string","name":"ip","id":4}]},{"name":"channelLoginRet","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"uid","id":1},{"rule":"optional","type":"string","name":"token","id":2},{"rule":"optional","type":"int64","name":"serverTime","id":3}]},{"name":"tokenLogin","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"uid","id":1},{"rule":"optional","type":"string","name":"token","id":2}]},{"name":"tokenLoginRet","syntax":"proto3","fields":[{"rule":"optional","type":"LoginResult","name":"result","id":1},{"rule":"optional","type":"int64","name":"serverTime","id":2}]},{"name":"PlayerResult","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"playerid","id":1},{"rule":"optional","type":"Record","name":"record","id":3}]},{"name":"Record","syntax":"proto3","fields":[{"rule":"optional","type":"GameResult","name":"result","id":1},{"rule":"optional","type":"int32","name":"score","id":2},{"rule":"optional","type":"string","name":"unit","id":3}]},{"name":"Player","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"playerid","id":1},{"rule":"optional","type":"int32","name":"groupId","id":2},{"rule":"optional","type":"int32","name":"seat","id":3},{"rule":"optional","type":"string","name":"nickname","id":4},{"rule":"optional","type":"string","name":"headurl","id":5},{"rule":"optional","type":"string","name":"gender","id":6}]},{"name":"showUser","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"playerid","id":1}]},{"name":"showUserRet","syntax":"proto3","fields":[{"rule":"optional","type":"Player","name":"player","id":1}]},{"name":"roomCreate","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"appID","id":1},{"rule":"optional","type":"string","name":"roomID","id":2},{"rule":"optional","type":"bool","name":"force","id":3},{"rule":"optional","type":"int32","name":"maxSeat","id":4}]},{"name":"roomCreateRet","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"roomID","id":1},{"rule":"repeated","type":"Player","name":"players","id":2}]},{"name":"joinRoom","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"appID","id":1},{"rule":"optional","type":"string","name":"roomID","id":2}]},{"name":"joinRoomRet","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"roomID","id":1},{"rule":"repeated","type":"Player","name":"players","id":2}]},{"name":"requestJoinGame","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"appID","id":1},{"rule":"optional","type":"string","name":"roomID","id":2}]},{"name":"respondJoinGame","syntax":"proto3","fields":[{"rule":"optional","type":"int32","name":"code","id":1}]},{"name":"continueJoinGame","syntax":"proto3","fields":[{"rule":"optional","type":"int32","name":"code","id":1},{"rule":"optional","type":"int64","name":"playerID","id":2}]},{"name":"onGameStateChange","syntax":"proto3","fields":[{"rule":"optional","type":"int32","name":"state","id":1},{"rule":"optional","type":"int32","name":"reason","id":2}]},{"name":"onGameStateChangeRet","syntax":"proto3","fields":[{"rule":"optional","type":"int32","name":"code","id":1}]},{"name":"onPlayerStateChange","syntax":"proto3","fields":[{"rule":"optional","type":"int32","name":"state","id":1},{"rule":"optional","type":"int64","name":"playerID","id":2}]},{"name":"onPlayerStateChangeRet","syntax":"proto3","fields":[{"rule":"optional","type":"int32","name":"code","id":1}]},{"name":"preJoinGame","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"playerID","id":1}]},{"name":"broadcastViewer","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"data","id":1}]},{"name":"getRoomInfo","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"appID","id":1},{"rule":"optional","type":"string","name":"roomID","id":2}]},{"name":"getRoomInfoRet","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"roomID","id":1},{"rule":"repeated","type":"Player","name":"players","id":2}]},{"name":"gameData","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"data","id":1}]},{"name":"updateBigoData","syntax":"proto3","fields":[{"rule":"optional","type":"int32","name":"type","id":1},{"rule":"optional","type":"int64","name":"ts","id":2},{"rule":"optional","type":"string","name":"data","id":3},{"rule":"optional","type":"bool","name":"forceUpdate","id":4}]},{"name":"getBigoData","syntax":"proto3","fields":[{"rule":"optional","type":"int32","name":"type","id":1}]},{"name":"getBigoDataRet","syntax":"proto3","fields":[{"rule":"optional","type":"int32","name":"type","id":1},{"rule":"optional","type":"int64","name":"ts","id":2},{"rule":"optional","type":"string","name":"data","id":3}]},{"name":"gameReady","syntax":"proto3","fields":[]},{"name":"frameData","syntax":"proto3","fields":[{"rule":"optional","type":"bytes","name":"data","id":1}]},{"name":"uploadGameResult","syntax":"proto3","fields":[{"rule":"repeated","type":"PlayerResult","name":"detail","id":1}]},{"name":"uploadGameResultRet","syntax":"proto3","fields":[{"rule":"optional","type":"int32","name":"result","id":1}]},{"name":"onceMore","syntax":"proto3","fields":[]},{"name":"onceMoreRet","syntax":"proto3","fields":[]},{"name":"continueJoinGameReq","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"playerID","id":1}]},{"name":"preJoinGameReq","syntax":"proto3","fields":[{"rule":"optional","type":"Player","name":"player","id":1}]},{"name":"playerLeaveRet","syntax":"proto3","fields":[{"rule":"optional","type":"int32","name":"playerID","id":1},{"rule":"optional","type":"int32","name":"reson","id":2},{"rule":"optional","type":"string","name":"roomID","id":3}]},{"name":"endGameRet","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"roomID","id":4}]},{"name":"playerJoinRet","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"roomID","id":1},{"rule":"optional","type":"Player","name":"player","id":2}]},{"name":"gameStartRet","syntax":"proto3","fields":[]},{"name":"broadcastViewerRet","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"data","id":1}]},{"name":"gameDataRet","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"data","id":1}]},{"name":"updateBigoDataRet","syntax":"proto3","fields":[{"rule":"optional","type":"int32","name":"type","id":1},{"rule":"optional","type":"int64","name":"ts","id":2},{"rule":"optional","type":"string","name":"data","id":3}]},{"name":"frameDataRet","syntax":"proto3","fields":[{"rule":"optional","type":"int32","name":"index","id":1},{"rule":"optional","type":"string","name":"data","id":2}]},{"name":"leaveRet","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"playerid","id":1}]},{"name":"networkRet","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"playerid","id":1},{"rule":"optional","type":"bool","name":"online","id":2}]},{"name":"voiceRet","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"playerid","id":1},{"rule":"optional","type":"bool","name":"open","id":2},{"rule":"optional","type":"bool","name":"talking","id":3}]},{"name":"gameResetRet","syntax":"proto3","fields":[]},{"name":"Vector","syntax":"proto3","fields":[{"rule":"optional","type":"float","name":"x","id":1},{"rule":"optional","type":"float","name":"y","id":2},{"rule":"optional","type":"float","name":"z","id":3}]},{"name":"Entity","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"id","id":1},{"rule":"optional","type":"string","name":"typeName","id":2},{"rule":"optional","type":"Vector","name":"position","id":3},{"rule":"optional","type":"float","name":"yaw","id":4},{"rule":"optional","type":"bytes","name":"attr","id":5}]},{"name":"loginScene","syntax":"proto3","fields":[{"rule":"optional","type":"int64","name":"authID","id":1},{"rule":"optional","type":"string","name":"gateID","id":2},{"rule":"optional","type":"string","name":"spaceID","id":3}]},{"name":"moveScene","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"spaceID","id":3}]},{"name":"migrateOut","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"entityID","id":1},{"rule":"optional","type":"string","name":"toSpaceID","id":2}]},{"name":"migrateIn","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"spaceID","id":1},{"rule":"optional","type":"string","name":"entityID","id":2},{"rule":"optional","type":"bytes","name":"data","id":3}]},{"name":"entityCall","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"entityID","id":1},{"rule":"optional","type":"string","name":"method","id":2},{"rule":"repeated","type":"bytes","name":"args","id":3}]},{"name":"scenePush","syntax":"proto3","fields":[{"rule":"optional","type":"string","name":"spaceID","id":1},{"rule":"optional","type":"Entity","name":"entity","id":2}]},{"name":"entityPush","syntax":"proto3","fields":[{"rule":"repeated","type":"Entity","name":"neighbors","id":1},{"rule":"repeated","type":"string","name":"distoryEntities","id":2}]},{"name":"Request","syntax":"proto3","fields":[{"rule":"optional","type":"int32","name":"session","id":1},{"rule":"optional","type":"heartBeat","name":"heartBeat","id":8,"oneof":"gate"},{"rule":"optional","type":"bindService","name":"bindService","id":9,"oneof":"gate"},{"rule":"optional","type":"kickOut","name":"kickOut","id":10,"oneof":"gate"},{"rule":"optional","type":"pushMessage","name":"pushMessage","id":11,"oneof":"gate"},{"rule":"optional","type":"userRegister","name":"userRegister","id":20,"oneof":"passport"},{"rule":"optional","type":"userLogin","name":"userLogin","id":21,"oneof":"passport"},{"rule":"optional","type":"tokenLogin","name":"tokenLogin","id":22,"oneof":"passport"},{"rule":"optional","type":"getRoleInfo","name":"getRoleInfo","id":50,"oneof":"game"},{"rule":"optional","type":"loginRole","name":"loginRole","id":51,"oneof":"game"},{"rule":"optional","type":"changeNickname","name":"changeNickname","id":52,"oneof":"game"},{"rule":"optional","type":"showUser","name":"showUser","id":100,"oneof":"room"},{"rule":"optional","type":"getRoomInfo","name":"getRoomInfo","id":101,"oneof":"room"},{"rule":"optional","type":"joinRoom","name":"joinRoom","id":102,"oneof":"room"},{"rule":"optional","type":"roomCreate","name":"roomCreate","id":103,"oneof":"room"},{"rule":"optional","type":"getBigoData","name":"getBigoData","id":104,"oneof":"room"},{"rule":"optional","type":"onPlayerStateChange","name":"onPlayerStateChange","id":105,"oneof":"room"},{"rule":"optional","type":"onGameStateChange","name":"onGameStateChange","id":106,"oneof":"room"},{"rule":"optional","type":"gameReady","name":"gameReady","id":121,"oneof":"room"},{"rule":"optional","type":"gameData","name":"gameData","id":122,"oneof":"room"},{"rule":"optional","type":"frameData","name":"frameData","id":123,"oneof":"room"},{"rule":"optional","type":"uploadGameResult","name":"uploadGameResult","id":124,"oneof":"room"},{"rule":"optional","type":"updateBigoData","name":"updateBigoData","id":125,"oneof":"room"},{"rule":"optional","type":"continueJoinGame","name":"continueJoinGame","id":127,"oneof":"room"},{"rule":"optional","type":"preJoinGame","name":"preJoinGame","id":128,"oneof":"room"},{"rule":"optional","type":"requestJoinGame","name":"requestJoinGame","id":129,"oneof":"room"},{"rule":"optional","type":"respondJoinGame","name":"respondJoinGame","id":130,"oneof":"room"},{"rule":"optional","type":"broadcastViewer","name":"broadcastViewer","id":131,"oneof":"room"},{"rule":"optional","type":"quickMatch","name":"quickMatch","id":200,"oneof":"hall"},{"rule":"optional","type":"entityCall","name":"entityCall","id":300,"oneof":"scene"},{"rule":"optional","type":"loginScene","name":"loginScene","id":301,"oneof":"scene"},{"rule":"optional","type":"moveScene","name":"moveScene","id":302,"oneof":"scene"},{"rule":"optional","type":"migrateIn","name":"migrateIn","id":303,"oneof":"scene"},{"rule":"optional","type":"migrateOut","name":"migrateOut","id":304,"oneof":"scene"}],"oneofs":{"gate":[8,9,10,11],"passport":[20,21,22],"game":[50,51,52],"room":[100,101,102,103,104,105,106,121,122,123,124,125,127,128,129,130,131],"hall":[200],"scene":[300,301,302,303,304]}},{"name":"Response","syntax":"proto3","fields":[{"rule":"optional","type":"int32","name":"session","id":1},{"rule":"optional","type":"Code","name":"code","id":2},{"rule":"optional","type":"heartBeat","name":"heartBeat","id":8,"oneof":"gate"},{"rule":"optional","type":"KickType","name":"kick","id":1005,"oneof":"gate"},{"rule":"optional","type":"userRegisterRet","name":"userRegisterRet","id":20,"oneof":"passport"},{"rule":"optional","type":"userLoginRet","name":"userLoginRet","id":21,"oneof":"passport"},{"rule":"optional","type":"tokenLoginRet","name":"tokenLoginRet","id":22,"oneof":"passport"},{"rule":"optional","type":"getRoleInfoRet","name":"getRoleInfoRet","id":50,"oneof":"game"},{"rule":"optional","type":"loginRoleRet","name":"loginRoleRet","id":51,"oneof":"game"},{"rule":"optional","type":"changeNicknameRet","name":"changeNicknameRet","id":52,"oneof":"game"},{"rule":"optional","type":"showUserRet","name":"showUserRet","id":100,"oneof":"room"},{"rule":"optional","type":"getRoomInfoRet","name":"getRoomInfoRet","id":101,"oneof":"room"},{"rule":"optional","type":"joinRoomRet","name":"joinRoomRet","id":102,"oneof":"room"},{"rule":"optional","type":"roomCreateRet","name":"roomCreateRet","id":103,"oneof":"room"},{"rule":"optional","type":"getBigoDataRet","name":"getBigoDataRet","id":104,"oneof":"room"},{"rule":"optional","type":"onPlayerStateChangeRet","name":"onPlayerStateChangeRet","id":105,"oneof":"room"},{"rule":"optional","type":"onGameStateChangeRet","name":"onGameStateChangeRet","id":106,"oneof":"room"},{"rule":"optional","type":"gameStartRet","name":"gameStartRet","id":1101,"oneof":"room"},{"rule":"optional","type":"gameDataRet","name":"gameDataRet","id":1102,"oneof":"room"},{"rule":"optional","type":"frameDataRet","name":"frameDataRet","id":1103,"oneof":"room"},{"rule":"optional","type":"leaveRet","name":"leaveRet","id":1104,"oneof":"room"},{"rule":"optional","type":"networkRet","name":"networkRet","id":1105,"oneof":"room"},{"rule":"optional","type":"voiceRet","name":"voiceRet","id":1106,"oneof":"room"},{"rule":"optional","type":"gameResetRet","name":"gameResetRet","id":1107,"oneof":"room"},{"rule":"optional","type":"playerLeaveRet","name":"playerLeaveRet","id":1108,"oneof":"room"},{"rule":"optional","type":"playerJoinRet","name":"playerJoinRet","id":1109,"oneof":"room"},{"rule":"optional","type":"updateBigoDataRet","name":"updateBigoDataRet","id":1110,"oneof":"room"},{"rule":"optional","type":"continueJoinGameReq","name":"continueJoinGameReq","id":1111,"oneof":"room"},{"rule":"optional","type":"preJoinGameReq","name":"preJoinGameReq","id":1112,"oneof":"room"},{"rule":"optional","type":"broadcastViewerRet","name":"broadcastViewerRet","id":1113,"oneof":"room"},{"rule":"optional","type":"endGameRet","name":"endGameRet","id":1114,"oneof":"room"},{"rule":"optional","type":"quickMatchRet","name":"quickMatchRet","id":1200,"oneof":"hall"},{"rule":"optional","type":"entityCall","name":"entityCall","id":1300,"oneof":"scene"},{"rule":"optional","type":"entityPush","name":"entityPush","id":1301,"oneof":"scene"},{"rule":"optional","type":"scenePush","name":"scenePush","id":1302,"oneof":"scene"}],"oneofs":{"gate":[8,1005],"passport":[20,21,22],"game":[50,51,52],"room":[100,101,102,103,104,105,106,1101,1102,1103,1104,1105,1106,1107,1108,1109,1110,1111,1112,1113,1114],"hall":[1200],"scene":[1300,1301,1302]}}],"enums":[{"name":"KickType","syntax":"proto3","values":[{"name":"None","id":0},{"name":"OtherSession","id":1},{"name":"Timeout","id":2},{"name":"ServerClose","id":3},{"name":"ServerStop","id":4},{"name":"ServerMaintain","id":5},{"name":"KickOut","id":20}]},{"name":"LoginResult","syntax":"proto3","values":[{"name":"loginSuccess","id":0},{"name":"invalidUser","id":1},{"name":"invalidPwd","id":2},{"name":"forbiddenUser","id":3},{"name":"tokenExpire","id":4}]},{"name":"RegisterResult","syntax":"proto3","values":[{"name":"registerSuccess","id":0},{"name":"userExists","id":1},{"name":"invalidFormat","id":2}]},{"name":"Code","syntax":"proto3","values":[{"name":"Success","id":0},{"name":"InvalidRequest","id":1},{"name":"ServerException","id":2},{"name":"DBExcetpion","id":3},{"name":"ConfigException","id":4},{"name":"InternalException","id":5},{"name":"ValidateException","id":9},{"name":"appIDNotFound","id":50},{"name":"playerNotFound","id":51},{"name":"roomNotFound","id":60},{"name":"roomMaxPlayer","id":61},{"name":"roomAlreadyExist","id":62},{"name":"gameNotFound","id":101},{"name":"gameAlreadyStart","id":103},{"name":"gameInvalidMsgFormat","id":104},{"name":"entityNotFound","id":200},{"name":"invalidEntityCall","id":201},{"name":"InvalidService","id":1000}]},{"name":"GameResult","syntax":"proto3","values":[{"name":"Win","id":0},{"name":"Lose","id":1},{"name":"Equal","id":2},{"name":"Escape","id":3}]}],"isNamespace":true}).build(["protocol"]);
module.exports=protocol;