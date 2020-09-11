import React, { useState } from 'react'

function HookArrayState() {

  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, { id: items.length, value: Math.floor(Math.random()*10) + 1}]);
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {
          items.map(item => (
            <li style={{ color: 'white' }} key={item.id}>{item.value}</li>
          ))
        }
      </ul> 
    </div>
  )
}

export default HookArrayState
