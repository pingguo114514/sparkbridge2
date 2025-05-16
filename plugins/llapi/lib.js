const CallEvent = ll.imports("SparkAPI", "callCustomEvent");
const GetEventID = ll.imports("SparkAPI", "GetEventID");
function importClass(name) {
    let res = {}, list = ll.imports("SparkAPI", name)();
    list.forEach(funcname => res[funcname] = ll.imports("SparkAPI", `${name}.${funcname}`));
    return res;
}
let mc = importClass('mc')
mc['config'] = ll.imports("SparkAPI", "GetInfo")('spark.mc.config')
module.exports = {
    spark: {
        mc: mc,
        on: (event, callback) => {
            let eventId = GetEventID();
            ll.exports(callback, event, eventId);
            CallEvent(event, eventId);
            return eventId;
        },
        QClient: {
            sendGroupMsg: ll.imports("SparkAPI", "sendGroupMsg"),
            sendWSPack: ll.imports("SparkAPI", "sendWSPack"),
        },
    },
    msgbuilder: importClass('msgbuilder'),
    packbuilder: importClass('packbuilder')
}