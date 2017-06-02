
export default class Event {
    constructor($ele){
        this.$ele = $ele || document.body
        this.cache = {}

        /**
         * [listener 使用事件委托代理，把所有可以冒泡的事件到代理到根元素，节省性能]
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        this.listener = event => {
            const id = event.target.__swift_id
            if (!id) return
            let isStopPropagation = false 

            this.cache[event.type].filter(item => {
                return id.startsWith(item.id)
            })
            .sort((a, b) => b.id.length - a.id.length)
            .some((item, index, arr) => {
                // 因为我们使用事件委托，因此需要proxy event，处理诸如currentTarget, stopPropagation, preventDefault
                let cur = {
                    currentTarget: $ele.__map[item.id],
                    stopPropagation: ()=>{
                        isStopPropagation = true;
                        event.stopPropagation()
                    },
                    preventDefault: () => event.preventDefault(),
                }

                let proxyEvent = {}
                if (window.Proxy && 0) {
                    proxyEvent = new Proxy({}, {
                        get: function(target, name) {
                            return cur[name] ? cur[name] : event[name]
                        }
                    })
                } else {
                    Event.KEYS.forEach(key => cur[key] = event[key])
                    proxyEvent = cur
                }

                item.callback(proxyEvent, event)

                return isStopPropagation
            })
        }
    }
    addEvents(type){
        this.$ele.addEventListener(type, this.listener)
    }
    removeEvents(type){
        this.$ele.removeEventListener(type, this.listener)
    }
    offFromNode(node){
        this.off(new RegExp('^' + node.id))
    }
    on(id, type, callback){
        let {cache} = this
        cache[type] = cache[type] || []
        cache[type].push({id, callback})
        if (cache[type].length == 1) {
            this.addEvents(type)
        }
        return this
    }
    off(id, type, callback){
        let {cache} = this
        let isRegexp = id instanceof RegExp
        console.log(id);

        ;(type ? [type] : Object.keys(cache)).forEach(type => {
            cache[type] = cache[type] || []
            cache[type] = cache[type].filter(item => {
                let cb = callback ? item.callback !== callback : true
                return (isRegexp ? !id.test(item.id) : item.id !== id) && cb
            })

            if (cache[type].length == 0) {
                this.removeEvents(type)
            }
        })

        return this
    }
    trigger(id, type, ...args){
        let {cache} = this
        cache[type] = cache[type] || []
        cache[type].forEach(item => {
            item.id == id && item.callback(...args)
        })
    }
    removeNodes(id){
        let {cache} = this
        Object.keys(cache).map(type => {
            cache[type] = (cache[type] || []).filter(item => item.id.startsWith(id))
        })
        return this
    }
}

Event.KEYS = ['altKey', 'bubbles', 'cancelBubble', 'cancelable', 'charCode',
               'code', 'composed', 'ctrlKey', 'defaultPrevented',
               'detail', 'clientX', 'clientY', 'layerX', 'layerY', 'metaKey', 'movementX',
               'movementY', 'offsetX', 'offsetY', 'pageX', 'pageY', 'eventPhase', 'isComposing',
               'isTrusted', 'key', 'keyCode', 'location', 'metaKey', 'path', 'repeat', 'returnValue',
               'shiftKey', 'sourceCapabilities', 'srcElement', 'target', 'timeStamp', 'type', 'view', 'which']

const CANNOT_BUBBLE_EVENTS = [
    'focus', 'blur'
]
Event.isBubbleEvent = function (type) {
    return !CANNOT_BUBBLE_EVENTS.includes(type)
}
