const adapter = require('../Qadapter');
const fhelper = require('../handles/file');
const logger = require('../handles/logger');
const PLUGIN_ROOT_DIR = './plugins/nodejs/sparkbridge2';
const PLUGIN_DATA_DIR = './plugins/sparkbridge2';
class Spark {
    QClient;
    debug = false;
    constructor(ws_type, ws, ws_reverse, qid, pwd, ssl) {
        this.QClient = new adapter(ws_type, ws, ws_reverse, qid, pwd, ssl);
        this.QClient.login();
    }
    getLogger(header){
        return logger.getLogger(header);
    }
    on(evt, func) {
        this.QClient.on(evt, func);
    }
    emit(evt,...arg){
        this.QClient.emit(evt,...arg);
    }
    /**
     * 
     * @param {*} plugin_name 
     * @returns {fhelper.FileObj}
     */
    getFileHelper(plugin_name) {
        return new fhelper.FileObj(plugin_name);
    }
    setOwnProperty(k, v) {
        this[k] = v;
    }
}

module.exports = Spark;