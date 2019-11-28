/**
 * Created by kylin on 2018/7/13.
 * 处理消息的编解码
 */

const msgProcessor = {};

msgProcessor.init = function (protocol, mapping) {
    this.idNameMapping = {}; // msgID - moduleName
    this.handleIDMapping = {}; // handlerName - msgID

    // var protocol = require("assets/Script/aliensBoot/protocol/protocol");
    this.responseDecoder = protocol['Response']['decode'];
    this.requestEncoder = protocol['Request'];

    const nameIDMapping = {};
    for (const x in mapping) {
        this.idNameMapping[mapping[x]] = x;
        nameIDMapping[x] = mapping[x];
    }

    const requests = this.requestEncoder.$type.children;
    for (const i in requests) {
        const module = requests[i];
        const handlers = module.fields;
        if (typeof (handlers) === 'object') {
            for (const j in handlers) {
                this.handleIDMapping[handlers[j].name] = nameIDMapping[module.name];
            }
        }
    }
};


// object -> byte data
msgProcessor.encode = function(handlerName, object) {
    // 心跳包
    if (handlerName === 'heartbeat') {
        const data = new Uint8Array(2);
        data.set([0, 0], 0);
        return data.buffer;
    }

    const msgID = this.handleIDMapping[handlerName];
    if (typeof (msgID) === 'undefined' || msgID === '') {
        cc.log(`unexpect request:${handlerName}`);
        return;
    }
    // var msgID = this.nameIDMapping[moduleName];
    const c2gsMsg = new this.requestEncoder(object);
    const encodeData = c2gsMsg['encode']();
    const arrayBuffer = encodeData['toArrayBuffer']();
    const array = new Uint8Array(arrayBuffer);
    const data = new Uint8Array(array.byteLength + 2);

    data.set([msgID, 0], 0);
    data.set(array, 2);

    return data.buffer;
};

function uint8arrayToStringMethod(myUint8Arr) {
    return String.fromCharCode.apply(null, myUint8Arr);
}

// byte data -> object
msgProcessor.decode = function (data) {
    const array = new Uint8Array(data);
    //  |msgID-2|protobuf data|

    const idData = new Uint8Array(2);
    idData.set(array.subarray(0, 2), 0);

    const id = idData[0] | idData[1] << 8;

    // 心跳包
    if (id === 0) {
        return ['', 'heartbeat', {}];
    }

    const newData = new Uint8Array(array.byteLength - 2);
    newData.set(array.subarray(2, array.byteLength), 0);


    // var idArray = Array.from(idData)
    // var id = idData[0];
    const ret = [];

    let moduleName = '';

    const msg = this.responseDecoder(newData.buffer);

    let msgName = '';
    let msgContent;
    if (msg.code !== 0) {
        msgName = 'errcode';
        msgContent = msg.code;
    } else if (msg.codeMessage) {
        msgName = 'errcode';
        msgContent = msg.codeMessage;
    } else {
        moduleName = this.idNameMapping[id];
        if (moduleName && moduleName !== '') {
            msgName = msg[moduleName];
            msgContent = msg[msgName];
        } else {
            // 消息ID兼容 没有消息ID遍历消息数据
            for (const tempId in this.idNameMapping) {
                moduleName = this.idNameMapping[tempId];
                msgName = msg[moduleName];
                if (msgName && msgName !== '') {
                    msgContent = msg[msgName];
                    break;
                }
            }
        }
    }
    if (!msgContent || msgContent === '') {
        aliensBoot.log(`unexpect message id ----${id}`);
    }
    if (msgName && msgContent) {
        ret[0] = [moduleName, msgName, msgContent];
    }
    // 是否有推送消息
    if (moduleName.length > 0) {
        const pushMsgName = `push${moduleName.substring(0, 1).toUpperCase()}${moduleName.substring(1)}Messages`;
        const pushMsg = msg[pushMsgName];
        if (pushMsg) {
            for (const msgName1 in pushMsg) {
                if (msgName1.length < 4 || msgName1.substring(0, 4) !== 'push') {
                    continue;
                }
                msgContent = pushMsg[msgName1];
                if (!msgContent) {
                    continue;
                }
                const idx = ret.length;
                ret[idx] = [moduleName, msgName1, msgContent];
            }
        }
    }
    return ret;
};

module.exports = msgProcessor;
