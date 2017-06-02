import {handleProps} from './transform'
import util from './util'

// 渲染
function render(Component, $ele){
    unmount($ele)
    return new Component.type(Component.props)._init($ele)
}

function unmount($ele){
    if ($ele.__swift__hooks) {
        $ele.__swift__hooks._componentWillUnmount()
    }
}

function unmountDOMFromNode(node, $parent){
    let map = $parent.__map
    while (node) {
        // let $ele = $parent.querySelector(`[data-swift-id="${node.id}"]`)
        let $ele = map[node.id]
        if ($ele) {
            // 反则只是卸载event与dom
            let {props} = node

            if (!node.component && props && (props.styleLeave || props.classLeave || props.classNameLeave) && props.transitionTime) {
                node.__swift_id = false
                handleProps(util.pickKeys(props, ['styleLeave', 'classLeave', 'classNameLeave']), $ele)
                setTimeout(()=>{
                    $ele.parentElement.removeChild($ele)
                }, props.transitionTime || 0)
            } else {
                $ele.parentElement.removeChild($ele)
            }

            delete map[node.id]

            break
        } else {
            node = node.children && node.children[0]
        }
    }
}

function getDOMFromNode(node, $parent){
    let map = $parent.__map
    while (node) {
        // let $ele = $parent.querySelector(`[data-swift-id="${node.id}"]`)
        let $ele = map[node.id]
        if ($ele) {
            return $ele
        } else {
            node = node.children && node.children[0]
        }
    }
}

function getParentDOMFromNode(node, $parent){
    let map = $parent.__map
    while (node) {
        // let $ele = $parent.querySelector(`[data-swift-id="${node.id}"]`)
        let $ele = map[node.id]
        if ($ele) {
            return $ele
        } else {
            node = node.parent && node.parent
        }
    }
}

export default {
    render,
    unmount,
    unmountDOMFromNode,
    getDOMFromNode,
    getParentDOMFromNode,
}

export {
    render,
    unmount,
    unmountDOMFromNode,
    getDOMFromNode,
    getParentDOMFromNode,
}
