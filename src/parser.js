// 解析template
// 有时候我们不想使用jsx，不想使用babel编译💊
// 那就使用类似vue angular之类的字符串模板吧

`
    <div bb={99} mm="mm">
        <h1>{111}</h1>
        <span>{
            this.state.life.map(function(item){
                return <div></div>
            })
        }</span>
    </div>
`
