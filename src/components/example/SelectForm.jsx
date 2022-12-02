import React from "react";

class SelectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'coconut',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value,
        })
    }

    handleSubmit(e) {
        alert('Input was submitted ' +this.state.value);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favourite flavor:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="mango" >Mango</option>
                        <option value="lime" >Lime</option>
                        <option value="coconut" >Coconut</option>
                        <option value="grape" >Grape</option>
                    </select>
                </label>
                <button type="submit" >Submit</button>
            </form>
        )
    }
}

export default SelectForm;