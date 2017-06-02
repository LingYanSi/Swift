export default class Link extends Swift.Component {
    href = event => {
        event.preventDefault()

        const {href, replace} = this.props
        Swift.router.history[replace ? 'replace' : 'push'](this.props.href)
    }
    render(){
        const {href, style = '', className=''} = this.props

        return <a href={href} style={style} className={className} onClick={this.href}>
            {this.props.children}
        </a>
    }
}
