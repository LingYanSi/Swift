// 单向数据流 -> 数据通过props传递
// action -> 修改store -> 触发组件更新 👍
//
class Demo extends Component {
    constructor(props, $ele){
        super(props)
        this.state = {
            name: 100,
            age: 1,
            fuck: 0,
            input: '',
            color: 'red',
            arr: [1, 2],
            content: "习近平说:"
        }

        this.handleChange = this.handleChange.bind(this)
    }
    click(){
        this.state.color = '#000'
        this.state.name++
        this.state.arr = [...this.state.arr, 1]
        this.state.content += '傻逼'
    }
    handleChange(event){
        this.state.input = event.currentTarget.value
    }
    render(){
        const {state, props} = this
        // 如果想用import进来的
        // 对节点进行diff
        //
        return createElement('div', {name: 2}, [
            state.name,
            createElement('p', {onClick: ()=>{this.click()}, style: {color: state.color}}, [state.name]),
            createElement('p', {}, state.arr),
            createElement(Test, {content: state.content}),
            createElement('input', {content: '说什么', onKeyUp: this.handleChange, value: state.input}),
            createElement('p', {}, [state.input]),
        ])

        // return <div>
        //     {state.name}
        //     <p onClick={()=>{state.name++}}>{state.name}</p>
        //     <Test content="说什么"></Test>
        //     <input type="text" value={state.input} onKeyUp={this.handleChange}/>
        //     <p>{state.input}</p>
        // </div>
    }
}

class Test extends Component {
    constructor(props){
        super(props)
        this.state = {
            content: "哈哈哈"
        }
        this.click = this.click.bind(this)
    }
    click(){
        this.state.content += 'xx_'
    }
    render(){
        return createElement('div', {
            onClick: this.click
        }, [
            this.state.content,
            this.props.content,
            createElement(Child, {content: this.props.content} )
        ])
    }
}

class Child extends Component {
    constructor(props){
        super(props)
        this.state = {
            src: 'http://wx1.sinaimg.cn/mw690/65dfab2dgy1ffp51oiob5j20qo0qo0yd.jpg'
        }

        this.click = this.click.bind(this)
    }
    componentDidMount(){
        console.log(this.refs.$$)
    }
    click(){
        this.state.src = 'http://wx1.sinaimg.cn/mw1024/64926635ly1ffp8ls9qjej21400qoaey.jpg'
    }
    render(){
        return createElement('h1', {ref: "$$"}, [
            this.props.content ,
            createElement('img', {src: this.state.src , onClick: this.click})
        ])
    }
}

// var dd = render(Demo, {content: 'fuck 习近平', }, document.querySelector('#app'))
