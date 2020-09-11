import React, { useState } from 'react'

function HookObjectInState() {
  
  const [name, setName] = useState({ firstName: '', lastName: '' });

  return (
    <form>
      <input type="text" onChange={e => setName({ ...name, firstName: e.target.value })}/>
      <input type="text" onChange={e => setName({ ...name, lastName: e.target.value })}/>
      <h2 style={{ color: "white" }}>Your first name is {name.firstName}</h2>
      <h2 style={{ color: "white" }}>Your last name is {name.lastName}</h2>
    </form>
  )
}

export default HookObjectInState;
