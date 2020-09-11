import React, { Component } from 'react';

class ClassCounter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      name: ''
    }
  }

  componentDidMount() {
    document.title = `Clicked ${this.state.count} times!`;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('Updating document title!');
      document.title = `Clicked ${this.state.count} times!`;
    }
  }
  
  incrementCount = () => {
    this.setState({
      count: this.state.count + 1
    });
  };
  
  render() {
    return (
      <div>
        <input type="text" value={this.state.name}
          onChange={e => { this.setState({ name: e.target.value })}}/>
        <button onClick={this.incrementCount}>Count {this.state.count}</button>
        Clicked { this.state.count } times.
      </div>
    );
  }
}

export default ClassCounter;
