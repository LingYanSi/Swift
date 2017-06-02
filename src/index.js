import diff from './diff'
import observe from './observe'
import patch from './patch'
import util from './util'
import Event from './event'
import {transform, handleProps} from './transform'
import {unmountDOMFromNode} from './dom'
import router from './router'
import Sdux from './sdux'

// 只有被监听的key发生变化，才会去执行表达式，然后得到result
// 当然也可以把表达式换成函数，function().call({state: obj, props: props})
function run(obj = {}, expr = '', callback = ()=>{}){
    let observeMap = {}
    let newObj = observe(obj, key => {
        observeMap[key] = true
    }, key => {
        observeMap[key] && autoFun()
    })

    function autoFun(){
        let result = new Function('a', `
            with(a){
                return ${expr}
            }
        `)(newObj)
        callback && callback(result)
        return result
    }
    autoFun()

    return newObj
}

// let newObj = run(a, 'name + age', result => console.log('result:', result))
// 组件
class Component {
    constructor(props){
        this.props = props || {}
        Object.freeze(this.props)
    }
    __renderTimeout = null
    _init ($ele) {
        if ($ele) {
            this.$root = this._$root = $ele
            $ele.__swift__hooks = this
        }

        this.state = this.state || {}
        this._state = this.state
        this._children = []
        this.refs = {}
        if (this.$root) {
            this._event = new Event(this.$root)// 是静态的
            this._$root.__map = {}
        }

        let observeMap = {}
        this.state = observe(this.state, key => {
            // 获取
            observeMap[key] = true
        }, key => {
            // 更新
            if (observeMap[key]) {
                clearTimeout(this.__renderTimeout) // 清楚缓存
                this.__renderTimeout = setTimeout(()=> {
                    this._render() // 同步任务执行完毕后，在执行页面更新
                }, 0)
            }
        })

        this._componentWillMount()
        this._render()
        this._componentDidMount()
        return this
    }
    // 将要render
    _componentWillMount(){
        this.componentWillMount && this.componentWillMount()
    }
    // render完毕
    _componentDidMount(){
        this.componentDidMount && this.componentDidMount()
        clearTimeout(this.__renderTimeout)
    }
    // 将要卸载
    _componentWillUnmount(){
        this._children.forEach(c => c._componentWillUnmount())

        this._event && this._event.offFromNode(this._tree)

        if (this._parent) {
            this._parent._children = this._parent._children.filter(c => c !== this)
        }
        this.componentWillUnmount && this.componentWillUnmount()

        // 卸载dom
        // 如果能找到与当前tree id一样的元素就卸载，否则就像下面的子节点查询
        // this.$root ? (this.$root.innerHTML = '') : this._$ele.parentElement.removeChild(this._$ele)
        unmountDOMFromNode(this._tree, this._$root)
        // 卸载事件监听
        // 卸载数据监听

        // console.log(this.props._event.cache['click']);
        // this.props._event && this.props._event.cache['click'].map(item => console.log(item.id))

    }
    // 卸载完毕
    _componentDidUnmount(){
        this._componentDidUnmount && this._componentDidUnmount()
    }
    // props更新
    _componentWillReceiveProps(newProps){
        Object.freeze(newProps)
        this.componentWillReceiveProps && this.componentWillReceiveProps(newProps, this.props)
        this.props = newProps
        this._render()
    }
    // 更新过后
    _componentDidUpdate(){
        this.componentDidUpdate && this.componentDidUpdate()
    }
    forceUpdate(){
        clearTimeout(this.__renderTimeout)
        this._render()
    }
    __nextTicks = []
    nextTick(fn){
        this.__nextTicks.push(fn)
    }
    // 组件渲染
    _render () {
        let oldTree = this._tree
        let $oldEle = this._$ele
        let newTree = this._tree = addRoadSign(this.render.call(this), this.$root ? 1 : -1, this._road_sign_id)

        if (oldTree) {
            // 获取变更，然后把变更更新到元素即可
            // console.log(this._$ele, this._$ele.parentElement);
            patch(diff(newTree, oldTree), (this.$root || this._$root || this._$ele.parentElement), this)
            this._componentDidUpdate()
        } else {
            let $frg = document.createDocumentFragment()
            this._$ele = transform(this._tree, {$swift: this, $parent: $frg}).childNodes[0]

            if (this.$root) {
                this.$root.innerHTML = ''
                this.$root.appendChild($frg)
                return this
            }

            if ($oldEle) {
                $oldEle.parentElement.replaceChild(this._$ele, $oldEle)
            }
        }

        // dom渲染成功后触发
        this.__nextTicks.forEach(fn => fn.call(this))

        return this
    }
}

// struct
class StructELement {
    constructor(Comp, props = {}, _children = []){
        // children可能是个字符串，在这里转数组
        let children = util.isArray(_children) ? _children : [_children]

        // 把children拍平，并且处理this.props.children的情况
        // 自定义组件的children不应该被当做Array处理
        let arr = []
        const __isComponentChildren = children.__isComponentChildren
        children.forEach((item, index) => {
            if (util.isArray(item)) {
                 !item.__isComponentChildren && item.forEach(i => {
                    i.isArrayItem = true
                    i.parentArrayIndex = index
                })
                arr.push(...item)
            } else {
                arr.push(item)
            }
        })
        children = arr
        children.__isComponentChildren = __isComponentChildren

        this.type = Comp
        this.props = Object.assign({}, props, {children})
        this.children = children
    }
}

// 创建元素，返回dom
function createElement(Comp, props = {}, ...children){
    // 如果已是StructELement，就去真正的Component
    Comp = Comp instanceof StructELement ? Comp.type : Comp
    // 对于自定义组件的子元素，在被调用的时候，不能被作为一般的Array对待，不应该去检查prop是否有key
    children.__isComponentChildren = Comp.prototype instanceof Component
    // 如果是
    return new StructELement(Comp, props, children)
}

// 判断是不是swift组件
function isSwiftElement(...components){
    return components.every(c => c && c.prototype instanceof Component)
}

// 添加路标
function addRoadSign(tree, index = 1, prev = '', parent) {
    const id = index > -1 ? (prev + index) : prev

    // 判断是不是文本元素
    if (tree instanceof StructELement) {
        tree.parent = parent
        if (tree.isArrayItem) {
            if (tree.props.key !== undefined) {
                tree.id = prev + `key_${tree.parentArrayIndex}_${tree.props.key}`
            } else {
                tree.id = id
                console.error('list item should have a unique key');
            }
        } else {
            tree.id = id
        }

        !isSwiftElement(tree.type) && tree.children.forEach((child, index) => {
            return addRoadSign(child, index + 1, id + '-', tree)
        })
    } else {
        parent.children.splice(index - 1, 1, {
            type: 'text',
            value: tree,
            id,
            parent,
        })
    }
    return tree
}

function cloneNode(node, props, children){
    return createElement(node, props, children)
}

export default {
    Component,
    isSwiftElement,
    createElement,
    StructELement,
    cloneNode,
    router,
    Sdux,
}

export {
    Component,
    isSwiftElement,
    createElement,
    StructELement,
    cloneNode, 
    router,
    Sdux,
}
