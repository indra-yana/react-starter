import React, { useState } from 'react';
import '../../App.css'

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };

    this.counter = this.counter.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
  }

  counter() {
    this.setState((state, props) => ({
      count: state.count + parseInt(props.increment)
    }));
  }

  resetCounter() {
    this.setState ({
      count: 0
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.counter}>
          count is: {this.state.count}
        </button> &nbsp;
        <button onClick={this.resetCounter}>
          Reset
        </button>
      </div>
    )
  }
}

// Functional Component
// function Counter(props) {
//   const [
//     count,
//     setCount,
//   ] = useState(0);

//   return (
//     <button onClick={() => setCount((count) => count + 1)}>
//       count is {count}
//     </button>
//   )
// }

export default Counter;
