const EventEmitter = require("events");
const JSON5 = require('json5');
const BiMap = require('../../handles/BiMap');
const _config = spark.getFileHelper('mc');

_config.initFile('config.json', {
    group: 114514,
    admins: []
});

_config.initFile('xbox.json', {});

function convertArrayToNumbersSafe(arr) {
    return arr.map(item => {
        const number = Number(item);
        return isNaN(number) ? 0 : number;
    });
}
var config = JSON5.parse(_config.getFile('config.json'));
var xboxs = BiMap.fromJSON(_config.getFile('xbox.json'));

const WebConfigBuilder = spark.telemetry.WebConfigBuilder;
let wbc = new WebConfigBuilder("mc");
wbc.addNumber("group", config.group, "监听的群聊");
wbc.addEditArray("admins", config.admins, "管理员列表（请仅填入数字）");
spark.emit("event.telemetry.pushconfig", wbc);

spark.on("event.telemetry.updateconfig_mc", (plname, K, newV) => {
    let v = newV;
    if (K == 'admins') {
        v = convertArrayToNumbersSafe(newV);
    }
    config[K] = v;
    _config.updateFile("config.json", config);
})

spark.setOwnProperty('mc', {});
spark.mc.config = config;
// const eventmitter = new EventEmitter();
//spark.mc['eventmitter'] = eventmitter;

spark.mc.on = mc.listen;
// spark.mc.emit = eventmitter.emit;

// mc.listen('onChat', (p, m) => {
//     spark.mc.emit('onChat', p, m);
// });

// mc.listen('onLeft', (p) => {
//     spark.mc.emit('onLeft', p);
// });

// mc.listen('onJoin', (p) => {
//     spark.mc.emit('onJoin', p);
// });

function getXbox(qid) {
    return xboxs.getByKey(qid);
}

function addXbox(qid, xbox) {
    xboxs.set(qid, xbox);
    _config.updateFile('xbox.json', xboxs.toObject());
}

function hasXbox(xboxid) {
    return xboxs.hasValue(xboxid);
}

function remXboxByName(xbox) {
    xboxs.deleteByValue(xbox);
    _config.updateFile('xbox.json', xboxs.toObject());
}

function remXboxByQid(qid) {
    xboxs.deleteByKey(qid);
    _config.updateFile('xbox.json', xboxs.toObject());
}
function getQQByXbox(xbox) {
    return xboxs.getByValue(xbox);
}


spark.mc.remXboxByName = remXboxByName;
spark.mc.addXbox = addXbox;
spark.mc.remXboxByQid = remXboxByQid;
spark.mc.getXbox = getXbox;
spark.mc.hasXbox = hasXbox;
spark.mc.getQQByXbox = getQQByXbox;