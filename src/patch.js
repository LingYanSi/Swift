import {transform, handleProps} from './transform'
import {isSwiftElement} from './index'
import {unmountDOMFromNode, getDOMFromNode, getParentDOMFromNode} from './dom'
import Event from './event'

// 把差异patch上
export default function patch(diffResult = [], $parent, $swift){
    // console.log('diffResult', ...diffResult);
    // 对diff的结果进行处理
    // 可以想象到的是，diff的结果
    // {
    //      id: '1-1-2',
    //      props: {
    //          delete: [],
    //          add: []
    //      }
    // }
    // 如果节点不一样就删除
    diffResult.map(diffrent => {
        const {type, oldTree, newTree, id, propsChange} = diffrent

        switch (type) {
            case 'change': {
                if (oldTree.type == 'text') {
                    let [textNode, commentNode] = getOldNode(oldTree, $parent)
                    textNode.parentElement.replaceChild(document.createTextNode(value), textNode)
                }

                if (propsChange) {
                    if (isSwiftElement(newTree.type)) {
                        let newProps = Object.assign({}, newTree.props, {'road-sign-id': newTree.id })
                        newTree.component._componentWillReceiveProps(newProps)
                    } else {
                        let [$ele] = getOldNode(oldTree, $parent)

                        propsChange.forEach(props => {
                            const {key, type, value, oldValue} = props

                            if (key.startsWith('on')) {
                                let eventName = key.slice(2).toLowerCase()
                                if (oldValue && Event.isBubbleEvent(eventName)) {
                                    $swift._event.off(oldTree.id, eventName, oldValue)
                                }
                            }

                            if (type == 'delete') {
                                if ( key == 'ref') {
                                    delete $swift.refs[oldValue]
                                } else {
                                    $ele.removeAttribute(oldValue)
                                }
                            }

                            if (type == 'add' || type == 'change') {
                                handleProps({[key]: value}, $ele, newTree, $swift)
                            }
                        })
                    }
                }
                break
            }
            case 'delete': {
                deleteNode(oldTree, $parent, $swift)
                break
            }
            case 'add': {
                addNode(newTree, $parent, $swift)
                break
            }
            case 'replace': {
                // 移除元素，拿到被移除元素的nextSibling
                let {nextNode, parentNode} = deleteNode(oldTree, $parent, $swift)
                let newNodes = getNewNode(newTree, $swift)

                // console.log(oldTree, $parent, nextNode, parentNode, newNodes);
                nextNode ? parentNode.insertBefore(newNodes, nextNode) : parentNode.appendChild(newNodes)
                break
            }
        }
    })
}

// 删除节点
function deleteNode(oldTree, $parent, $swift){
    let oldNodes = getOldNode(oldTree, $parent)

    let nextNode = oldNodes[0].nextSibling
    let parentNode = oldNodes[0].parentElement

    oldNodes.reverse().forEach(node =>{
        // 如果是子组件，需要触发组件卸载
        // 组件内还有自身的state需要维护
        if (oldTree.component ) {
            oldTree.component._componentWillUnmount()
        } else {
            $swift._event.offFromNode(oldTree)
            unmountDOMFromNode(oldTree, $parent)
        }
    })

    return {
        nextNode,
        parentNode
    }
}

// 添加节点
function addNode(newTree, $parent, $swift){
    let $ele = getParentDOMFromNode(newTree, $parent)
    let $p = document.createDocumentFragment()
    transform(newTree, {$parent: $p, $swift})

    $ele.appendChild($p)
}

// 获取新节点
function getNewNode(tree, $swift){
    let df = document.createDocumentFragment()
    transform(tree, {$parent: df, $swift})
    return df
}

// 获取老节点
function getOldNode(tree, $parent){
    const {id, type} = tree
    if (type == 'text') {
        let $ele = getParentDOMFromNode(tree, $parent)
        // 获取文本几点
        let commentNode = $ele.previousSibling
        // 需要把有效节点放在前面
        return [$ele, commentNode]
    }

    return [getDOMFromNode(tree, $parent)]
}
