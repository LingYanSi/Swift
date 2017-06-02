import Link from './Link'

let store = new Swift.Sdux({
    list: [1, 2, 3]
})

store.combine(function(state, action){
    if (action.type == 'add') {
        let {list} = state
        list = [...list]
        list.push(action.payload)
        return {...state, list}
    }
})

store.combine(function(state, action){
    if (action.type == 'delete') {
        let {list} = state
        list = list.filter(i => i != action.payload)
        return {...state, list}
    }
})

store.applyMiddlewares(store => next => action => {
    let state = store.getState()
    console.log('注释', state);
    next(action)
    console.log('注释', state);
}, store => next => action => {
    let state = store.getState()
    console.log('注释1', state);
    next(action)
    console.log('注释1', state);
})

let id = 0
class Demo extends Swift.Component {
    add(){
        store.dispatch({
            type: 'add',
            payload: '郭文贵而' + id++
        })
    }
    delete = event => {
        store.dispatch({
            type: 'delete',
            payload: event.currentTarget.textContent
        })
    }
    render(){
        let {list} = this.props

        return <div>
            <button onClick={this.add}>add</button>
            <ul>
                {list.map(i => <li onClick={this.delete}>{i}</li>)}
            </ul>
            <Link href="/chat?a=sss">聊天</Link>
        </div>
    }
}

let Connect = store.connect(Demo)
Swift.router.register('/sdux', Connect)
