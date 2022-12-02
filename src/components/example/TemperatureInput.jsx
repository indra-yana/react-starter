import React from "react";

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
    
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const { temperature, scale } = this.props;

        return (
            <div>
                <fieldset>
                    <legend>Enter temperature in {scaleNames[scale]}</legend>
                    <input type="number" value={temperature} onChange={this.handleChange}/>
                </fieldset>
            </div>
        )
    }
}

export default TemperatureInput;