
// 处理监听
// 可以使用proxy
export default function observe(obj, getCallback, setCallback){
    let newObj = {}
    Object.keys(obj).forEach(key => {
        let value = obj[key]
        Object.defineProperty(newObj, key, {
            get(){
                getCallback && getCallback(key)
                return value
            },
            set(newValue) {
                let oldValue = value
                value = newValue
                setCallback && setCallback(key, newValue, oldValue)
            }
        })
    })
    return newObj
}
