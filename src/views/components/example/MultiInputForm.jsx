import React from "react";

class MultiInputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: false,
            numberOfGuests: 2,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        let value = null;
        const target = e.target;
        const name = target.name;

        switch (target.type) {
            case 'checkbox':
                value = target.checked;
                break;
            case 'number':
            case 'text':
                value = target.value;
            default:
                break;
        }

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(e) {
        alert('Input was submitted ' + JSON.stringify(this.state));
        e.preventDefault()
    }

    render() {

        const { isGoing, numberOfGuests } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Is going: 
                    <input name="isGoing" type="checkbox" checked={isGoing} onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Number of guests: 
                    <input name="numberOfGuests" type="number" value={numberOfGuests} onChange={this.handleInputChange} />
                </label>
                <button type="submit" >Submit</button>
            </form>
        )
    }
}

export default MultiInputForm;