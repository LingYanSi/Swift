import {isSwiftElement} from './index'

// 获取diff结果
export default function diff(newTree, oldTree, arrs = []){
    // console.log(newTree, oldTree);
    /**
     * add
     * change
     * delete
     * replace
     * move
     * 元素的相对坐标
     * 再根据组件的根元素，diff的结果进行性处理
     * 如果需要replace 根据坐标找到元素 $ele.parentElement.replaceChild($ele, toElemenet(newNode))
     * type = change 直接修改props就好
    */
    let diffItem
    if (newTree && oldTree && newTree.id === oldTree.id && newTree.type === oldTree.type) {
        // 如果是文本元素
        if (newTree.type == 'text') {
            newTree.value != oldTree.value && (diffItem = {
                type: 'replace',
                id: oldTree.id,
                oldTree,
                newTree,
            })
        } else {
            // 子组件，component hook传递
            if (isSwiftElement(newTree.type) && oldTree.type === newTree.type) {
                newTree.component = oldTree.component
            }
            // console.log(oldTree, newTree);
            let diffrent = compareObj(oldTree.props, newTree.props)
            if (diffrent.length) {
                diffItem = {
                    type: 'change',
                    id: oldTree.id,
                    oldTree,
                    newTree,
                    propsChange: diffrent
                }
            }

            // 自定组件，不用比较children
            if (!isSwiftElement(newTree.type)) {
                // oldTree.children delete
                oldTree.children = oldTree.children.filter(node => {
                    if (node.isArrayItem && !newTree.children.some(i => i.id ===node.id)) {
                        arrs.push({
                            type: 'delete',
                            id: node.id,
                            oldTree: node
                        })
                        return false
                    }
                    return true
                })

                // 对于自定义组件，只有props不一样，才会对子组件进行diff
                newTree.children && newTree.children.map((node, index) => {
                    // console.log(node, oldTree.children[index]);
                    diff(node, oldTree.children[index], arrs)
                })
            }
        }

    } else {
        newTree && oldTree && (diffItem = {
            type: 'replace',
            id: oldTree.id,
            newTree,
            oldTree,
        })

        newTree && !oldTree && (diffItem = {
            type: 'add',
            newTree,
            oldTree,
            id: newTree.id,
        })

        !newTree && oldTree && (diffItem = {
            type: 'delete',
            id: oldTree.id,
            newTree,
            oldTree,
        })
    }

    if (diffItem) {
        let type = diffItem.type
        if ((type == 'delete' || type == 'replace') && diffItem.oldTree.component) {
            diffItem.oldTree.component.__willUnmount = true
        }
        arrs.push(diffItem)
    }
    return arrs
}


// 获取两个对象的差异
function compareObj(prevObj, nextObj){
    // 看一看哪些是需要删除的
    let arr = []
    Object.keys(prevObj).map(key => {
        if (key != 'children' && nextObj[key] !== prevObj[key] && nextObj[key] === undefined) {
            arr.push({
                type: 'delete' ,
                key,
                oldValue: prevObj[key],
            })
        }
    })
    Object.keys(nextObj).map(key => {
        if (key != 'children' && nextObj[key] !== prevObj[key]) {
            arr.push({
                type: prevObj[key] === undefined ? 'add' : 'change',
                key,
                value: nextObj[key],
                oldValue: prevObj[key],
            })
        }
    })
    return arr
}
