import React from "react";

class TextAreaForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Please write an essay about your favorite DOM element.',
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
        alert('Input was submitted' + this.state.value);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Essay:
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <button type="submit" value="Submit">Submit</button>
            </form>
        )
    }
}

export default TextAreaForm;