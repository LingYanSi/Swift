import {StructELement, isSwiftElement} from './index'
import Event from './event'
import util from './util'

// 转换dom
// 还需要一个 refs
function transform(node, options){
    let {$parent, $swift} = options
    let isParent$ = !!$parent
    $parent = $parent || document.createDocumentFragment()

    let ele
    if (!(node instanceof StructELement)) {
        let $comment = document.createComment(`swift-road-sign: ${node.id}`)
        $parent.appendChild($comment)
        ele = document.createTextNode(node.value)
        $parent.appendChild(ele)

        $swift._$root.__map[node.id] = ele
    } else {
        // 如果是一个组件的话，就实例化组件
        if ( isSwiftElement(node.type) ) {
            let component = new node.type(node.props)
            component._event = $swift._event
            component._$root = $swift.$root || $swift._$root
            component._road_sign_id = node.id
            component._init()

            // 把元素挂载到树上，方便props变更通知
            node.component = component
            ele = component._$ele

            // 元素上加hook，方便卸载
            ele.__swift__hooks = component

            // 父子组件相互引用
            component._parent = $swift
            // 子组件放入父组件中，方便卸载管理
            $swift._children.push(component)
        } else {
            ele = document.createElement(node.type)
            // ele['data-swift-id'] = node.id
            // ele.setAttribute('data-swift-id', node.id)
            // handle props
            handleProps(node.props, ele, node, $swift)

            node.children.forEach(child => {
                transform(child, {$parent: ele, $swift})
            })
        }
        $parent.appendChild(ele)

        // 根组件上添加一个map，根据node.id引用各个元素，从而去除使用document.querySelector的查找方式
        $swift._$root.__map[node.id] = ele
    }

    return isParent$ ? $parent : $parent.childNodes[0]
}

const MAP = {
    div: ['height', 'width'],
    img: ['src', 'alt', 'height', 'width'],
    a: ['href', 'target', 'download'],
    button: ['type', 'name'],
    input: ['value', 'type', 'accept', 'placeholder', 'autocomplete', 'autofocus', 'checked', 'disabled', 'name'],
    form: ['method', 'action', 'type'],
    option: ['value'],
    select: ['value', 'name'],
    audio: ['src', 'loop', 'controls', 'volume', 'preload', 'played', 'muted', 'autoplay'],
    video: ['src', 'loop', 'controls', 'volume', 'preload', 'played', 'muted', 'autoplay', 'poster'],
    canvas: ['height', 'width'],
}

/**
 * [handleProps 处理props]
 * @param  {Object} props  [description]
 * @param  {DOM} ele    [description]
 * @param  {StructELement} node   [description]
 * @param  {Component} $swift [description]
 * @return {[type]}        [description]
 */
function handleProps(props, ele, node, $swift){
    // ele.setAttribute('data-swift-id', node.id)
    node && (ele.__swift_id = node.id)
    const TAG = ele.tagName.toLowerCase()
    Object.keys(props).forEach(key => {
        const value = props[key]

        // 处理事件监听
        if (key.startsWith('on')) {
            let eventName = key.slice(2).toLowerCase()

            if (Event.isBubbleEvent(eventName)) {
                $swift._event.on(node.id, eventName, value)
            } else {
                ele.addEventListener(eventName, value)
            }
        }

        // 元素索引
        if (key == 'ref') {
            $swift.refs[value] = ele
        }

        // 等待添加 styleEnter styleLeave classNameEnter classNameLeave 函数
        // 那么问题来了，enter好处理，leave呢? 一般来说leave需要放在dom真实卸载之前，但是一旦diff出结果后，就会立马patch
        // patch的任务是增删改dom
        // 如果一个真实dom元素没有了__swift__id那就表示此dom元素已不存在
        // 这样在获取下一个元素的时候就可以处理啦，当然还会存在一个问题，在动画处理完毕前，dom的父节点已经被卸载了
        if (key == 'style') {
            handleStyle(ele, value)
        }

        if (key == 'styleEnter') {
            setTimeout(() => {
                ele.clientHeight
                handleStyle(ele, value)
            })
        }

        if (!node && key == 'styleLeave') {
            handleStyle(ele, value)
        }

        if (key == 'className') {
            ele.setAttribute('class', handleClass(ele, value))
        }

        if (key == 'classNameEnter') {
            setTimeout(() => {
                ele.clientHeight
                ele.className = handleClass(ele, props.className) + ' ' + handleClass(ele, value)
            })
        }

        if (!node && key == 'classNameLeave') {
            ele.className += ' ' + handleClass(ele, value)
        }

        // 处理data-属性
        if (key.startsWith('data-') || /data[A-Z]/.test(key)) {
            ele.setAttribute(key.replace(/[A-Z]/g, '-$&').toLowerCase(), value)
        }

        MAP[TAG] && MAP[TAG].includes(key) && ele.setAttribute(key, value)
    })
}

/**
 * [handleStyle 处理样式]
 * @param  {[type]} ele   [description]
 * @param  {[type]} style [description]
 * @return {[type]}       [description]
 */
function handleStyle(ele, style) {
    let str = ''
    if (util.isObject(style)) {
        str = ';' + Object.keys(style).map(name => {
           return name.replace(/[A-Z]/g, '-$&').toLowerCase() + ':' + style[name]
       }).join(';')
   } else if ( util.isString(style) ) {
       str = style
   } else if ( util.isArray(style) ){

   }

   if (str) {
       ele.style.cssText += str
   }
}

/**
 * [handleClass 处理className]
 * @param  {[type]} ele   [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function handleClass(ele, value){
     if ( util.isArray(value) ) {
        value = value.join(' ')

    } else if ( util.isObject(value) ) {
        value = Object.keys(value).map(key => value[key] ? key : '').join(' ')
    }
    return value
}

export default {
    handleProps,
    transform
}
export {
    handleProps,
    transform
}
