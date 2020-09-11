import React, { useState, useEffect } from 'react'

function HookMouse() {

  const [ x, setX ] = useState(0);
  const [ y, setY ] = useState(0);

  const logMousePosition = (event) => {
    console.log('mouse event');
    setX(event.clientX);
    setY(event.clientY);
  };

  useEffect(() => {
    console.log('useEffect called!');
    window.addEventListener('mousemove', logMousePosition);
    return () => {
      console.log('Component unmounted!');
      window.removeEventListener('mousemove', logMousePosition);
    };
  }, []);

  return (
    <div style={{ color: 'white' }}>
      X - { x }
      Y - { y }      
    </div>
  )
}

export default HookMouse
