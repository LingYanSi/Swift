class ModalComponent extends Swift.Component {
    componentDidMount(){
        this.addEvent()
    }
    addEvent(){
        let $parent = this.refs.parent
        $parent.addEventListener('click', event => {
            let node = event.target
            while(node !== $parent){
                if (node.classList.contains('modal-close')) {
                    this.props.close()
                    break
                }
                node = node.parentElement
            }
        })
    }
    render(){
        let Child = this.props.children[0]
        let {layer = true} = this.props
        let layerStyle = `
            transition: all .3s; position: fixed; height: 100%; width: 100%; top: 0; left: 0;
            ${!layer ? 'display: none;' : ''}
        `
        return <div ref="parent" className="modal-item"
                classNameEnter="enter"
                classNameLeave="leave"
                transitionTime={3000}>
            <div style={layerStyle}
                className="modal-close layer"></div>
            <div style="position: fixed; top: 50%; left: 50%;"
                className="content">
                {Child.type instanceof Swift.Component ? <Child {...Child.props} close={this.props.close} /> : Child}
            </div>
        </div>
    }
}

class Modal {
    constructor(Child, options = {}){
        let div = this.$root = document.createElement('div')
        document.body.appendChild(div)
        SwiftDOM.render(<ModalComponent close={this.close} {...options}>{Child}</ModalComponent>, div)
    }
    close = () => {
        SwiftDOM.unmount(this.$root)
        setTimeout(()=>{
            document.body.removeChild(this.$root)
        }, 300)
    }
}

function open(Child){
    return new Modal(Child)
}

function tips(Child){
    let modal = new Modal(Child, {layer: false})
    setTimeout(()=>{
        modal.close()
    }, 1000)
    return modal
}

function close(){

}

function closeAll(){

}

let fuck = {
    open,
    close,
    closeAll,
    tips
}

window.Modal = fuck

export {
    open,
    close,
    closeAll,
    tips
}
export default fuck
