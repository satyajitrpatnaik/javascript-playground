import React, { useContext } from 'react'
import { UserContext, GitContext } from './../App';

function HookComponentA() {

  const user = useContext(UserContext);
  const git = useContext(GitContext);
  return (
    <div style={{ color: 'white' }}>
      { user }, { git }
    </div>
  )
}

export default HookComponentA
