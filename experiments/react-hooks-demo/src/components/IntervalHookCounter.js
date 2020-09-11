import React, { useState, useEffect } from 'react'

function IntervalHookCounter() {

  const [ count, setCount] = useState(0);

  const tick = () => {
    setCount(prevCount =>  prevCount + 1);
  }

  useEffect(() => {
    console.log('useEffect');
    const interval = setInterval(tick, 1000);
    return () => {
      console.log('Clean up');
      clearInterval(interval);
    }
  }, [count]);

  return (
    <div style={{ color: 'whitesmoke' }}>
      count: { count }
    </div>
  )
}

export default IntervalHookCounter
