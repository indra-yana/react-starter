import React from "react";

class Toggle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isToggleON: props.initialToggle ?? false,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(id) {
        let toggle = !this.state.isToggleON;  
        this.setState(state => ({
            isToggleON: toggle,
        }))
        
        this.props.onToggleChanged(toggle);
    }

    render() {
        return (
            <button onClick={(e) => this.handleClick("khsthn34w", e)}>
                {this.state.isToggleON ? 'ON' : 'OFF'}
            </button>
        )
    }
}

export default Toggle;