import React from "react";
import TemperatureInput from "./TemperatureInput";
import BoilingVerdict from "./BoilingVerdict";

class TemperatureCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: '',
            scale: 'c',
        }

        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.toCelsius = this.toCelsius.bind(this);
        this.toFahrenheit = this.toFahrenheit.bind(this);
        this.tryConvert = this.tryConvert.bind(this);
    }

    handleCelsiusChange(temp) {
        this.setState({
            temperature: temp,
            scale: 'c',
        })
    }

    handleFahrenheitChange(temp) {
        this.setState({
            temperature: temp,
            scale: 'f',
        })
    }

    toCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    }
    
    toFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
    }
    
    tryConvert(temperature, convert) {
        const input = parseFloat(temperature);
        if (Number.isNaN(input)) {
          return '';
        }
    
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        
        return rounded.toString();
    }

    render() {
        const { temperature, scale } = this.state;
        const celsius = scale === 'f' ? this.tryConvert(temperature, this.toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? this.tryConvert(temperature, this.toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
                <br />
                <BoilingVerdict celsius={celsius} />
            </div>
        )
    }
}

export default TemperatureCalculator;