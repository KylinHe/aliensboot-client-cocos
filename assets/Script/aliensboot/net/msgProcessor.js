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
msgProcessor.encode = function(handlerName, object, seqID) {
    // 心跳包
    if (handlerName === 'heartbeat') {
        const data = new Uint8Array(6);
        data.set([0, 0], 0);
        data.set([0, 0, 0, 0], 2);
        return data.buffer;
    }

    const msgID = this.handleIDMapping[handlerName];
    if (typeof (msgID) === 'undefined' || msgID === '') {
        cc.log(`unexpect request:${handlerName}`);
        return;
    }
    // var msgID = this.nameIDMapping[moduleName];
    // eslint-disable-next-line new-cap
    const c2gsMsg = new this.requestEncoder(object);
    const encodeData = c2gsMsg['encode']();
    const arrayBuffer = encodeData['toArrayBuffer']();
    const protoData = new Uint8Array(arrayBuffer);
    const data = new Uint8Array(protoData.byteLength + 6);

    data.set([msgID, msgID >> 8], 0);
    data.set([seqID, seqID >> 8, seqID >> 16, seqID >> 24], 2);
    data.set(protoData, 6);

    return data.buffer;
};

function uint8arrayToStringMethod(myUint8Arr) {
    return String.fromCharCode.apply(null, myUint8Arr);
}

// byte data -> object
msgProcessor.decode = function (data) {
    const array = new Uint8Array(data);
    //  |msgID-2|msgSeqID-4|protobuf data|
    const id = array[0] | array[1] << 8;
    const seqId = array[2] | array[3] << 8 | array[4] << 16 | array[5] << 24;
    // 心跳包
    if (id === 0) {
        return [['', 'heartbeat', {}]];
    }
    const protoData = new Uint8Array(array.byteLength - 6);
    protoData.set(array.subarray(6, array.byteLength), 0);

    // var idArray = Array.from(idData)
    // var id = idData[0];
    const ret = [];

    let moduleName = '';

    const msg = this.responseDecoder(protoData.buffer);

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
    // if (!msgContent || msgContent === '') {
    //     aliensBoot.log(`unexpect message id ----${id}`);
    // }
    if (msgName && msgContent) {
        ret[0] = [moduleName, msgName, msgContent, seqId];
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
                ret[idx] = [moduleName, msgName1, msgContent, seqId];
            }
        }
    }
    return ret;
};

module.exports = msgProcessor;
