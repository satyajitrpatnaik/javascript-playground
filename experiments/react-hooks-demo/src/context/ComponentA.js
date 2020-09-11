import React from 'react';
import { UserContext, GitContext } from './../App';

function ComponentA() {
  return (
    <div style={{ color: 'white' }}>
      <UserContext.Consumer>
        {
          user => (
            <GitContext.Consumer>
              {
                git => {
                  return (
                    <div>Username: {user}, Git: {git}</div>
                  )
                }
              }
            </GitContext.Consumer>
          )
        }
      </UserContext.Consumer>
    </div>
  )
}

export default ComponentA;
