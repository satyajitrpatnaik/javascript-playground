import React, { useReducer } from 'react';
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
import ComponentA from './useReducer-and-useContext/ComponentA';
import ComponentB from './useReducer-and-useContext/ComponentB';
import ComponentC from './useReducer-and-useContext/ComponentC';
import HookComponentA from './context/HookComponentA';
import CounterComponent from './useReducerDemo/CounterComponent';
import CounterComponentTwo from './useReducerDemo/CounterComponentTwo';
import CounterThree from './useReducerDemo/CounterThree';

export const UserContext = React.createContext();
export const GitContext = React.createContext();

const initialState = {
  count: 0
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      };
    case 'RESET':
      return {
        ...state,
        count: initialState.count
      }
    default:
      return state;
  }
};

export const CounterContext = React.createContext();

function App() {

  const [ countState, dispatch ] = useReducer(reducer, initialState);
  
  return (
    <CounterContext.Provider value={{ countState: countState, dispatch: dispatch }}>
      <div className="App" style={{ color: 'white' }}>
        <div> App.js - Count: {countState.count}</div>
        <ComponentA />
        <ComponentB />
        <ComponentC />
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
        {/* <UserContext.Provider value={'satyajitrpatnaik'}>
          <GitContext.Provider value={'github'} > */}
            {/* <ComponentA /> */}
            {/* <HookComponentA />
          </GitContext.Provider>
        </UserContext.Provider> */}
        {/* <CounterComponent />
        <CounterComponentTwo /> */}
        {/* <CounterThree /> */}
      </div>
    </CounterContext.Provider>
  );
}

export default App;
