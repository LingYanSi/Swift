let util = {
    getType(obj) {
        return Object.prototype.toString.call(obj).toLowerCase().split(' ')[1].slice(0, -1)
    },

    isString(obj) {
        return !!this.getType(obj).match('string')
    },

    isFunction(obj) {
        return !!this.getType(obj).match('function')
    },

    isObject(obj) {
        return !!this.getType(obj).match('object')
    },

    isArray(obj) {
        return !!this.getType(obj).match('array')
    },

    isBoolean(obj) {
        return !!this.getType(obj).match('boolean')
    },

    isPromise(obj) {
        return !!this.getType(obj).match('promise')
    },

    isAsyncFunction(obj) {
        return !!this.getType(obj).match('asyncfunction')
    },

    isGeneratorFunction(obj) {
        return !!this.getType(obj).match('generatorfunction')
    },

    /**
     * [uniqueArray 数组去重]
     * @method uniqueArray
     * @param  {Array}     [arr=[]] [description]
     * @param  {String}    [key=''] [description]
     * @return {Array}             [description]
     */
    uniqueArray(arr = [], key = '') {
        let newArr = []
        let keyArr = []
        arr.forEach(item => {
            if (key && keyArr.indexOf(item[key]) < 0) {
                keyArr.push(item[key])
                newArr.push(item)
            }

            if (!key && newArr.indexOf(item) < 0) {
                newArr.push(item)
            }
        })

        newArr.length != arr.length && console.error('the value of key should be unique')
        return newArr
    },
    pickKeys(obj = {}, keys = []){
        let newObj = {}
        keys.forEach(key => {
            let value = obj[key]
            if (value !== undefined) {
                newObj[key] = value
            }
        })
        return newObj
    }
}

export default util
