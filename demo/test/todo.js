const {Component} = Swift
import './chat'
import './sdux'

import Link from './Link'
import Modal from './Modal'

class ToDo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [{
                content: '222',
                id: 0
            }],
            currentList: [{
                content: '222',
                id: 0
            }],
            id: 0,
            currentFilter: 'all'
        }
    }
    filter(type) {
        let {state} = this

        state.currentFilter = type = type || state.currentFilter
        state.currentList = state.list.filter(item => {
            switch (type) {
                case 'all':
                    {
                        return true
                    }
                case 'active':
                    {
                        return !item.complete
                    }
                case 'complete':
                    {
                        return item.complete
                    }
            }
        })
    }
    add(content) {
        if (!content) return

        this.state.list.push({
            content,
            complete: false,
            id: ++this.state.id
        })
        this.filter()
    }
    del(id) {
        this.state.list = this.state.list.filter(item => item.id != id)
        this.filter()
    }
    complete(id){
        console.log('id', id);
        this.state.list.forEach(item => {
            item.id == id && (item.complete = !item.complete)
        })
        this.filter()
    }
    handleAdd = event => {
        if (event.keyCode == 13) {
            this.handleAddBtn(event)
        }
    }
    handleAddBtn = event => {
        event.stopPropagation()
        let value = this.refs.input.value
        this.refs.input.value = ''
        this.add(value)
        Swift.nextTick(()=>{
            // console.log('dom添加成功', document.querySelectorAll('li'))
            // document.body.scrollTop = document.body.scrollHeight
        })
    }
    handleDel = event => {
        this.del(event.target.dataset['id'])
        Swift.nextTick(()=>{
            console.log('dom删除成功')
        })
    }
    handleFilter = event => {
        let type = event.currentTarget.dataset['type']

        this.filter(type)
    }
    handleComplete = event => {
        this.complete(event.target.dataset['id'])
        console.log('complete', this.state.currentList);
    }
    handleBlur(){
        console.log('是交了');
    }
    // 是的从渲染角度上来讲，render应该尽可能做到functional，相同的输入 相同的输出
    render() {
        const { currentList } = this.state

        return <div style="height: 100vh; width: 100vw; background: linear-gradient(0, rgb(137, 221, 186) 0%, rgb(108, 41, 131) 100%);">
            <h1 style="height: 30vh; line-height: 30vh; text-align: center; font-size: 5vw; color: #fff;">Todo List</h1>
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="padding: 10px;">
                    <input type="text"
                        ref="input"
                        onKeyDown={this.handleAdd}
                        onBlur={this.handleBlur}
                        style="height: 3em; margin-right: 10px;"
                    />
                    <button onClick={this.handleAddBtn}>add</button>
                </div>
                <ul>
                    {
                        currentList.length ?
                            currentList.map((item, index) => {
                                return <ToDoItem {...item}
                                        index={index + 1}
                                        key={item.id}
                                        onComplete={this.handleComplete}
                                        onDel={this.handleDel}  >
                                    <ItemChild text={index}></ItemChild>
                                </ToDoItem>
                            })
                        : '暂无数据'
                    }
                </ul>
                {
                    ['all', 'active', 'complete'].map(item => {
                        return <button data-type={item}
                            onClick={this.handleFilter}
                            key={item}
                            className={{active: item == this.state.currentFilter}}>
                            {item}
                        </button>
                    })
                }
                <p>{new Date().toString()}</p>
                <Link href="/chat?a=纤纤擢素手">聊天页面</Link>
                <Link href="/sdux?a=11">sdux</Link>
                <Link href="/?a=11" replace={true}>sdux</Link>
                <button onClick={
                    ()=>{Modal.open(<div style="padding: 10px; background: #fff;"><h1>你说怎么呢</h1></div>)}
                }>Modal</button>
            </div>
        </div>
    }
}

class ItemChild extends Component {
    render(){
        const str = `${this.props.text}${this.props.index}`
        return <button>{str}{this.props.children}</button>
    }
}

class ToDoItem extends Component {
    state = {
        edit: false,
        newValue: ''
    }
    edit = () => {
        this.state.edit = !this.state.edit
    }
    save = () => {
        this.state.newValue = this.refs.input.value
        this.edit()
    }
    delete = event => {
        let height = this.refs.li.clientHeight
        this.refs.li.style.cssText += `;height: ${height}px`
        this.refs.li.clientHeight
        this.refs.li.style.cssText += `;height: ${0}px`
        // alert(111)
        setTimeout(()=>{
            this.props.onDel(event)
        }, 500)
    }
    render() {
        const {index, complete, content, onDel, onComplete, id, children} = this.props
        const {edit, newValue} = this.state

        const NewChild = children[0]
        const p = Object.assign({}, children[0].props, {})

        return  !edit ? <li className={{complete}}
                    style={{marginBottom: '10px', transition: 'all .5s', overflow: 'hidden'}}
                    styleEnter={{background: 'rgb(143, 237, 187)'}}
                    // styleLeave={{}}
                    transitionTime={500}
                    ref="li">
                <button data-id={id} onClick={onComplete} className="complete-btn"></button>
                <span>{index}{newValue || content}</span>
                <button data-id={id} onClick={this.delete}>{'del' + index}</button>
                <NewChild text="😁哈哈" index={index}>
                    组件
                    <span>习近平</span>
                </NewChild>
                <button onClick={this.edit}>修改</button>
            </li> : <div>
                <input type="text" ref="input"/>
                <button onClick={this.save}>save</button>
            </div>
    }
}

Swift.router.register('/', ToDo)
// var dd = SwiftDOM.render(<ToDo content='fuck 习近平'></ToDo> , document.querySelector('#todo'))

Swift.router.load()
