import React from 'react';
import './App.css';
import ClassCounter from './components/ClassCounter';
import HookCounter from './components/HookCounter';
import HookCounterTwo from './components/HookCounterTwo';
import ClassCounterTwo from './components/ClassCounterTwo';
import HookObjectInState from './components/HookObjectInState';
import ClassObjectInState from './components/ClassObjectInState';
import HookArrayState from './components/HookArrayState';
import ClassMouse from './components/ClassMouse';
import HookMouse from './components/HookMouse';
import MouseContainer from './components/MouseContainer';
import IntervalClassCounter from './components/IntervalClassCounter';
import IntervalHookCounter from './components/IntervalHookCounter';
import DataFetching from './components/DataFetching';
import ComponentA from './context/ComponentA';
import HookComponentA from './context/HookComponentA';
import CounterComponent from './useReducerDemo/CounterComponent';

export const UserContext = React.createContext();
export const GitContext = React.createContext();

function App() {
  return (
    <div className="App">
      {/* <ClassCounter /> */}
      {/* <HookCounter /> */}
      {/* <HookCounterTwo /> */}
      {/* <ClassCounterTwo /> */}
      {/* <HookObjectInState /> */}
      {/* <ClassObjectInState /> */}
      {/* <HookArrayState /> */}
      {/* <ClassMouse /> */}
      {/* <HookMouse /> */}
      {/* <MouseContainer /> */}
      {/* <IntervalClassCounter /> */}
      {/* <IntervalHookCounter /> */}
      {/* <DataFetching /> */}
      <UserContext.Provider value={'satyajitrpatnaik'}>
        <GitContext.Provider value={'github'} >
          {/* <ComponentA /> */}
          <HookComponentA />
        </GitContext.Provider>
      </UserContext.Provider>
      <CounterComponent />
    </div>
  );
}

export default App;
