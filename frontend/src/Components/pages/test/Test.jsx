import React, { useReducer } from 'react';
import './test.css';

// Instead of hardcoding actions, we can have an ACTIONS obj
const ACTION = {
  INCREMENT : 'increment',
  DECREMENT : 'decrememnt'
}

//has access to initial state and action passes data to dispatch()
function reducerFunc(state, action) {
  switch(action.type) {
    case ACTION.INCREMENT:
      return{
        count: state.count + 1
      }

    case ACTION.DECREMENT:
      return{
        count: state.count - 1
      }

    default:
      return state;
  }
}
function Test() {
  //define useReducer 
  const [state, dispatch] = useReducer(reducerFunc, {count: 0});

  const increment = () => {
    dispatch({ type: ACTION.INCREMENT});
  }

  const decrement = () => {
    dispatch( { type: ACTION.DECREMENT})
  }

  return (
    <div className='hand-fan'>
        <h1>Test</h1>
        <div className='test2'>
          <p>Current number is: {state.count}</p>
          <button onClick={increment}>+</button>
          <button onClick={decrement}>-</button>
        </div>
    </div>
  )
}

export default Test