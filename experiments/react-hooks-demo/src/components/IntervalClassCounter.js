import React, { Component } from 'react'

export class IntervalClassCounter extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       count: 0
    }
  }

  interval;

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  tick = () => {
    this.setState({
      count: this.state.count + 1
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
    return (
      <div style={{ color: 'whitesmoke' }}>
        Count: { this.state.count }
      </div>
    )
  }
}

export default IntervalClassCounter
