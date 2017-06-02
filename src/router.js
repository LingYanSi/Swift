// 路由
// 下一步计划 路由与浏览器解耦
/**
 * {
 *     '/ss/:id/:xx': {
 *          path: 'fsdf',
 *          title: 'sdfsdfsdf'
 *     }
 * }
 *
 * /a/b
 * /a/b/
 * /a/:(\b)b
 * /a/*\/b
 * /a/b/*
 */


window.addEventListener('popstate', event => {
    // 可以根据event.state来判断，是前进还是后退了
    _history.change(location.href.replace(location.origin, ''), event.state ? event.state.id : 0)
})

let id = 1
// 虚拟history hash browser
let _history = {
    cache: [],
    browserHistory: [],
    path: '',
    currentId: 0,
    // 前进
    push(url, title){
        if (url == this.path) {
            console.error('页面路由一致不处理')
            return this
        }

        this.change(url, this.currentId + 1)
        history.pushState({id: this.currentId}, title, url)
        return this
    },
    // 替换
    replace(url, title){
        // debugger
        if (url == this.path) {
            console.error('页面路由一致不处理')
            return this
        }

        this.change(url, this.currentId)
        history.replaceState({id: this.currentId}, title, url)
        return this
    },
    // 后退
    back(){
        history.back()
        return this
    },
    // 前进
    prev(){

    },
    // 更改
    change(url = location.href.replace(location.origin, ''), id = -1){
        let str = ''

        if (id == -1) {
            str = '首次渲染'
            id = 0

        } else if (id == this.currentId) {
            str = '页面替换'

        } else if (id > this.currentId) {
            str = '前进'
        } else {
            str = '后退'
        }

        Modal.tips(<div style="padding: 10px; background: rgb(160, 139, 200);">id: {id}, currentId: {this.currentId} {str} }</div>)

        // 处理浏览历史
        this.browserHistory.push(url)

        this.currentId = id || 0
        this.path = url
        this.cache.forEach(fn => fn(url, str))

        // let url = this.browserHistory.pop()
        // this.change(url)
    },
    // 监听路由变化
    on(fn){
        this.cache.push(fn)
        return this
    },
    // 取消监听
    off(fn){
        this.cache = this.cache.filter(i => i !== fn)
        return this
    }
}

// 解析url
function urlParse(url){
    var a = document.createElement('a')
    a.href = url

    return {
        pathname: a.pathname,
        query: strToObj(a.search.slice(1)),
        hash: a.hash,
        host: a.hostname
    }
}

// 字符串转obj
function strToObj(url){
    let obj = {}
    url.split('&').forEach(item => {
        let [key, value] = item.split('=').map(decodeURIComponent).map(i => i.trim())
        key && (obj[key] = value)
    })
    return obj
}

// 路由匹配
function match(url = '', obj = {}){
    let keys = Object.keys(obj)
    let urlArr = url.trim().split('/')

    let params = {}
    let router = ''
    let matched = keys.some(item => {
        let itemArr = item.trim().split('/')
        let lastItem = itemArr[itemArr.length - 1]
        // 长度相等，或者路由以*为结尾
        if (itemArr.length === urlArr.length || (lastItem == '*' && (itemArr = itemArr.slice(0, -1)))) {
            params = {}
            router = item
            return itemArr.every((i, index) => {
                if (i.startsWith(':')) {
                    params[i.slice(1)] = urlArr[index]
                    return true
                } else {
                    return i === urlArr[index]
                }
            })
        }
    })

    if (matched) {
        return {
            params,
            url,
            router,
            value: obj[router]
        }
    }
    return null
}

class Routers {
    maps = {}
    _maps = {}
    constructor(history){
        this.history = history
        // 监听url变化
        history.on(this.handleHistoryChange)
    }
    handleHistoryChange = (url, type) => {
        // 解析url
        let {pathname, query} = urlParse(url)
        // 获取路由匹配结果
        let result = match(pathname, this.maps)
        if (result) {
            // 页面渲染
            this.render(result.value, {params: result.params, query})

        } else {
            let result = match(pathname, this._maps)
            if (result) {
                let {value, router, params} = result
                loadScript(value.path).then(success => {
                    let App = this.maps[router] = Fuck[router]
                    this.render(App, {params , query})
                })
            } else {
                console.error('路由不存在');
            }
        }
    }
    render(App, props = {}){
        SwiftDOM.render(<App {...props}></App>, document.querySelector('#todo'))
    }
    inject(maps){
        this._maps = maps
    }
    // 注册路由
    register = (router, Component) => {
        // 这里使用了url -> 真实组件的形式
        // 当然也可以成为 url -> path.js
        // 在处理historyChange的时候可以先加载js，再渲染
        this.maps[router] = Component
        return this
    }
    // 加载指定路由
    load = (url) => {
        this.history.change(url)
        return this
    }
    // 销毁
    destory(){
        history.off(this.handleHistoryChange)
    }
}

export default new Routers(_history)

/**
 * Router['ffff'] = XXX
 * routers = {
 *     'ffff': {
 *          path: '/sdfsdfdsf.js'
 *     }
 * }
 */
