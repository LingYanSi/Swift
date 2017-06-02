// 单向数据流 💊
//
class Event {
    cache = []
    off(fn){
        this.cache = this.cache.filter(i => i !== fn)
    }
    on(fn){
        this.cache.push(fn)
    }
    trigger(...args){
        this.cache.forEach(fn => fn(...args))
    }
}

export default class Sdux extends Event {
    // reducer，当dispatch action时，由reducers来进行管道处理
    reducers = []
    constructor(state){
        super()
        this.state = {...state}
    }
    // 获取state
    getState(){
        return this.state
    }
    // 混合reducer
    combine(reducer){
        this.reducers.push(reducer)
    }
    // 处理action
    dispatch = action => {
        let newState = null

        this.reducers.some(fn =>{
            newState = fn(this.state, action)
            return newState
        })

        if (newState) {
            this.state = newState
            this.trigger(newState)
        }
    }
    // 处理中间件
    applyMiddlewares(...mdws){
        let dispatch = this.dispatch
        mdws.reverse().forEach(mdw => {
            // 高阶函数
            dispatch = mdw(this)(dispatch)
        })

        this.dispatch = dispatch

        return this
    }
    // 包装组件，把state当做props注入
    connect(App){
        let that = this
        return class Connect extends Swift.Component {
            componentDidMount(){
                // super.componentDidMount && super.componentDidMount()
                that.on(this.___listen)
            }
            ___listen = () => {
                this.forceUpdate()
            }
            componentWillUnmount(){
                // super.componentWillUnmount && super.componentWillUnmount()
                that.off(this.___listen)
            }
            render(){
                let { props} = this
                let {state} = that

                return <App {...props} {...state} />
            }
        }
    }
}

// 可不可以监听多个store
