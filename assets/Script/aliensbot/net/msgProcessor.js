/**
 * Created by kylin on 2018/7/13.
 * 处理消息的编解码
 */

var processor = {};

processor.init = function (protocol, mapping) {
    this.idNameMapping = {};   //msgID - moduleName
    this.handleIDMapping = {}; //handlerName - msgID

    //var protocol = require("assets/Script/aliensBot/protocol/protocol");
    this.responseDecoder = protocol["Response"]["decode"];
    this.requestEncoder = protocol["Request"];

    var nameIDMapping = {};
    for (var x in mapping) {
        this.idNameMapping[mapping[x]] = x;
        nameIDMapping[x] = mapping[x]
    }

    var requests = this.requestEncoder.$type.children;
    for (var i in requests) {
        var module = requests[i];
        var handlers = module.fields;
        if (typeof(handlers) == "object") {
            for (var j in handlers) {
                this.handleIDMapping[handlers[j].name] = nameIDMapping[module.name]
            }
        }
    }
};


//object -> byte data
processor.encode = function(handlerName, object) {
    var msgID = this.handleIDMapping[handlerName];
    if (typeof(msgID) == "undefined" || msgID === "") {
        cc.log("unexpect request:" + handlerName);
        return
    }
    //var msgID = this.nameIDMapping[moduleName];
    var c2gsMsg = new this.requestEncoder(object);
    var encodeData = c2gsMsg["encode"]();
    var arrayBuffer = encodeData["toArrayBuffer"]();
    var array = new Uint8Array(arrayBuffer);
    var data = new Uint8Array(array.byteLength + 2);

    data.set([msgID, 0], 0);
    data.set(array, 2);

    return data.buffer
};

function uint8arrayToStringMethod(myUint8Arr){
    return String.fromCharCode.apply(null, myUint8Arr);
}

//byte data -> object
processor.decode = function (data) {
    var array = new Uint8Array(data);
    //  |msgID-2|protobuf data|

    var idData = new Uint8Array(2);
    idData.set(array.subarray(0, 2), 0);

    var newData = new Uint8Array(array.byteLength - 2);
    newData.set(array.subarray(2, array.byteLength), 0);


    //var idArray = Array.from(idData)
    //var id = idData[0];

    var id = idData[0] | idData[1]<<8;

    var moduleName = "";

    var msg = this.responseDecoder(newData.buffer);

    var msgName = "";
    var msg_content = undefined;
    if (msg.code != 0) {
        msgName = "errcode";
        msg_content = msg.code;
    } else {
        moduleName = this.idNameMapping[id];
        if (!moduleName || moduleName == "") {
            cc.log("unexpect message id ----" + id);
            return
        }
        msgName = msg[moduleName];
        msg_content = msg[msgName];
    }
    return [moduleName, msgName, msg_content]
};

module.exports = processor;