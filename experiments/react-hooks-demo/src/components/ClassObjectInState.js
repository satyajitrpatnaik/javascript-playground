import React, { Component } from 'react'

export class ClassObjectInState extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: ''
    };
  }

  render() {
    return (
      <form>
        <input type="text" onChange={e => this.setState({ firstName: e.target.value })}/>
        <input type="text" onChange={e => this.setState({ lastName: e.target.value })}/>
        <h2 style={{ color: "white" }}>Your first name is {this.state.firstName}</h2>
        <h2 style={{ color: "white" }}>Your last name is {this.state.lastName}</h2>
      </form>
    )
  }
}

export default ClassObjectInState;
