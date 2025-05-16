/**
 * 可序列化的双向映射类
 * 支持 JSON 序列化和反序列化
 */
let keyToValue = Symbol(), valueToKey = Symbol();
class BiMap {
    constructor(initialEntries = []) {
        this[keyToValue] = new Map();
        this[valueToKey] = new Map();

        // 初始化数据
        for (const [key, value] of initialEntries) {
            this.set(key, value);
        }
    }

    /**
     * 设置键值对
     * @param {*} key 
     * @param {*} value 
     */
    set(key, value) {
        // 如果键已存在，先删除旧关联
        if (this[keyToValue].has(key)) {
            const oldValue = this[keyToValue].get(key);
            this[valueToKey].delete(oldValue);
        }

        // 如果值已存在，先删除旧关联
        if (this[valueToKey].has(value)) {
            const oldKey = this[valueToKey].get(value);
            this[keyToValue].delete(oldKey);
        }

        this[keyToValue].set(key, value);
        this[valueToKey].set(value, key);
    }

    /**
     * 通过键获取值
     * @param {*} key 
     * @returns {*|undefined}
     */
    getByKey(key) {
        return this[keyToValue].get(key);
    }

    /**
     * 通过值获取键
     * @param {*} value 
     * @returns {*|undefined}
     */
    getByValue(value) {
        return this[valueToKey].get(value);
    }

    /**
     * 删除指定键的映射
     * @param {*} key 
     * @returns {boolean} 是否删除成功
     */
    deleteByKey(key) {
        if (!this[keyToValue].has(key)) return false;

        const value = this[keyToValue].get(key);
        this[keyToValue].delete(key);
        this[valueToKey].delete(value);
        return true;
    }

    /**
     * 删除指定值的映射
     * @param {*} value 
     * @returns {boolean} 是否删除成功
     */
    deleteByValue(value) {
        if (!this[valueToKey].has(value)) return false;

        const key = this[valueToKey].get(value);
        this[valueToKey].delete(value);
        this[keyToValue].delete(key);
        return true;
    }

    /**
     * 检查键是否存在
     * @param {*} key 
     * @returns {boolean}
     */
    hasKey(key) {
        return this[keyToValue].has(key);
    }

    /**
     * 检查值是否存在
     * @param {*} value 
     * @returns {boolean}
     */
    hasValue(value) {
        return this[valueToKey].has(value);
    }

    /**
     * 获取所有键值对
     * @returns {Array<[*, *]>}
     */
    entries() {
        return Array.from(this[keyToValue].entries());
    }

    /**
     * 获取所有键
     * @returns {Array<*>}
     */
    keys() {
        return Array.from(this[keyToValue].keys());
    }

    /**
     * 获取所有值
     * @returns {Array<*>}
     */
    values() {
        return Array.from(this[keyToValue].values());
    }

    /**
     * 清空所有映射
     */
    clear() {
        this[keyToValue].clear();
        this[valueToKey].clear();
    }

    /**
     * 获取映射数量
     * @returns {number}
     */
    get size() {
        return this[keyToValue].size;
    }

    /**
     * 序列化为JSON字符串
     * @returns {string}
     */
    toJSON() {
        return JSON.stringify(this.toObject());
    }

    /**
     * 从JSON字符串解析
     * @param {string} jsonStr 
     * @returns {BiMap}
     */
    static fromJSON(jsonStr) {
        return BiMap.fromObject(JSON.parse(jsonStr));
    }

    /**
     * 转换为普通对象（可序列化）
     * @returns {Object}
     */
    toObject() {
        const obj = {};
        for (const [key, value] of this[keyToValue]) {
            // 注意：对象键会被转换为字符串
            obj[key] = value;
        }
        return obj;
    }

    /**
     * 从普通对象创建
     * @param {Object} obj 
     * @returns {BiMap}
     */
    static fromObject(obj) {
        const entries = Object.entries(obj);
        return new BiMap(entries);
    }
}
module.exports = BiMap 