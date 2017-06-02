const {Component, nextTick} = Swift

let id = 0
class Chat extends Component {
    state = {
        list: [{
            type: 'text',
            text: '是打发斯蒂芬',
            isSelf: true,
            id: id++,
        }]
    }
    response(text){
        let res = '我不懂你在说什么'
        if (/你好|hello/.test(text)) {
            res = '你好'
        } else if (/工作/.test(text)) {
            res = '在微拍堂工作'
        } else if (/哈哈|ha/.test(text)) {
            res = '笑个屁'
        } else if (/苟利/.test(text)) {
            res = '苟利国家生死已 岂因福祸避趋之👓'
        } else if (/去哪儿吃/.test(text)) {
            res = '弄堂里'
        } else if (/吃什么/.test(text)) {
            res = '酸辣土豆丝'
        }
        this.add({
            text: res,
            id: id++,
        })
    }
    send = () => {
        let text = this.refs.input.value
        this.refs.input.value = ''
        this.add({
            text,
            isSelf: true,
            id: id++,
        })
        setTimeout(()=>{
            this.response(text)
        }, 300)
    }
    add(message){
        let list = [...this.state.list]
        list.push( message )
        this.state.list = list

        let isEnd = this.refs.body.scrollHeight - this.refs.body.clientHeight == this.refs.body.scrollTop
        this.nextTick(()=>{
            isEnd && (this.refs.body.scrollTop = this.refs.body.scrollHeight)
        })
    }
    handleKeyDown = event => {
        if (event.keyCode == 13) {
            this.send()
        }
    }
    handleFocus = () => {
        // setTimeout(()=>{
        //     document.body.scrollTop = document.body.scrollHeight
        //     Modal.tips(document.body.scrollTop)
        // }, 300)
    }
    render(){
        const H1 = `
            border-bottom: 1px solid #c5b1b1;
            font-size: 24px;
            padding: 10px;
            background: #c1dcce;
            font-weight: 300;
        `
        return <div ref="parent" style={STYLE.parent}>
            <h1 style={STYLE.H1}>与{this.props.query.a}聊天中</h1>
            <div ref="body" className="scroll" style={STYLE.body}>
                {this.state.list.map((item, index) => <div key={item.id}
                                                            style={{
                                                                textAlign: item.isSelf ? 'right': 'left',
                                                                margin: '10px 0'
                                                            }}>
                    <div style="transition: all .5s; transform: translateY(10px); display: inline-block; padding: 10px; border-radius: 10px;"
                        styleEnter={{
                            background: item.isSelf ? 'rgb(14, 97, 97)' : 'rgb(226, 137, 249)',
                            transform: 'none',
                        }}>
                        {item.text}
                    </div>
                </div>)}
            </div>
            <div style="display: flex;">
                <input onKeyDown={this.handleKeyDown} onFocus={this.handleFocus} style="flex: 1;" type="text" ref="input"/>
                <button onClick={this.send}>发送</button>
            </div>
        </div>
    }
}

const STYLE = {
    parent: `background: rgb(166, 193, 218);
            max-width: 500px;
            max-height: 700px;
            height: 100vh;
            width: 100%;
            display: flex;
            flex-direction: column;
            margin: 0 auto;  `,
    H1: `
        border-bottom: 1px solid #c5b1b1;
        font-size: 24px;
        padding: 10px;
        background: #c1dcce;
        font-weight: 300;
    `,
    body: `
        flex: 1;
        color: #fff;
        box-sizing: border-box;
        padding: 10px;
        overflow-y: auto;
        -webkit-overflow-scroll: touch;
    `,
}

Swift.router.register('/chat', Chat)
// SwiftDOM.render(<Chat></Chat>, document.querySelector('#app'))
