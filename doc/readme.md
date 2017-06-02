# Swift

swift是我开发的一个类React前端框架

- jsx语法
- 不用setState，使用getter setter自动更新，并且在render中使用的key被更新后才重新render，类似弱鸡mobx

```js
import {Component} from 'swift'
import {render} from 'swift-dom'

class Demo extends Component {
    render(){
        return <div>
            Hello World!
        </div>
    }
}

render(<Demo/>, document.querySelector('#app'))
```

## 对于部分场景来说，使用类似react的组件开发，可能会把事情弄得更复杂化，不如直接操作dom来的方便

## 开发笔记

- 为什么list item要有key?
    可以更精确的进行更新，性能更好

- 为什么不使用类vue的局部精确更新？
    因为对于Date.now这样的数据，是否做更新，是一个不同的编号

- diff算法需要注意什么？
    如果遇到type类型不一样的就直接replace
    对于带key的数组，先delete，后比较

- 如何添加路标？
    在createElement的时候添加

- 为什么要使用事件委托？如何处理那些不能委托的事件？事件委托又如何处理proxy event?
    因为性能比较好

- 为什么render方法要尽可能functional?
    最大可能的保持 相同的props与state的到的UI是一样的

- 如何进行组件嵌套？
    通过props进行数据传递，diff前后props是否相同，决定时候更子组件

- 如何通知子组件其props发生了变化？
    触发_componentWillReceiveProps即可

- 是否要把所有的attrs都setAttribute到ele上
    不需要，只设置html规范内的属性

- 为什么要使用document.createDocumentFragment?
    因为没必要每次都把新的dom append到document上，如此会引起页面的reflow repaint影响性能

- jsx的优势在哪里？
    相对于字符串模板，更灵活，比如在jsx内可以方便的使用局部变量

- 如何添加transition支持？
    组件执行完动画后，才会被移除掉，新组件在被移除掉后才执行
    time enter leave

## jsx转化
通过babel-preset-react会把jsx转化成如下内容
```js
<div></div>    
react.createElement('div', {}, [])
```
我们科已通过修改babel=plugin-transform-react-jsx来帮助我们将其转化成期望的形式
```js
swift.createElement('div', {}, [])
```

## 为什么react要和react-dom分离
react的本质是构建一套基于组件的UI框架，使用了virtual dom
构建一套基于ast的组件声明方式，他可以渲染成不同的目标，dom是一种/ios/android也是一种，甚至其他
因此react-dom是把组件渲染，事件绑定系统给独立出来的 patch/dom/event/transform

diff之后，产生的结果，也可以被不同的方式patch
因此需要在patch/transform之外，不要操作dom，因为我们只需要产生基于ast tree的结构即可

## dom不要与组件实例进行绑定
除了根组件，其他组件不与dom进行绑定
因为可能父子组件公用同一个dom，只要提供一个根据tree.id查询dom的方法即可
疑问？: 如何处理在react组件内部，又渲染了一个react组件的情况？添加md5?
当我要卸载一个组件的时候，就拿当前id或者其子组件的id就查找有效的dom，然后将其卸载【因此组件的node-tree必须是树状结构，而不能是数组结构

## 组件在渲染自己的props.children的时候，不要对其进行Array key检查
可以通过在this.props.children上添加属性的方式，进行标记

## 移除data-swift-id属性
在框架层面给元素添加自定义属性是不好的，因此使用隐式属性来替代
给根元素添加一个map，根元素下的所有元素都通过id添加到map上，这样就可以方便获取指定dom了
因为考虑到事件响应等问题，还是需要给元素加上id属性

## 添加动画支持
styleEnter styleLeave classEnter classLeave
重点说一说styleLeave的实现思路，首先需要传入一个transitionTime的属性
diff结果遇到type=delete，在__map中删除引用，那对于组件来说，此dom已被移除，然后执行相关的class与style操作

## 添加nextTick支持
dom操作完成后，回调事件
显示需求还是比较旺盛的：新增元素后，需要滚动滚动条到指定位置

## 实现步骤
render(element, dom)
|
如果是根组件，初始化是一个Event，将来会吧所有子元素的事件委托在这里
|
如果是根组件，生成一个map，如果node对应真实dom: map[node.id] = map
组件的卸载/添加都会经过map
|
observe state，:在render内调用的state更新后，才会触发组件更新
|
执行render获取组件树
|
transform
|
props state更新 触发render获取新组件树
|
diff: node.type相同，就对组件props比对,如果node.type是一个Component，就不对子组件进行比对，先删除不存在的node.id
|
patch

## 函数式框架
Model => addDom => eventBind => dom sth
