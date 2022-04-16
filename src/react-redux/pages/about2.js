import React from "react";

import * as action from '../store/actionCreators';
import connect from '../utils/connect';

function About2(props) {
  return (
    <div>
      <h1>About</h1>
      <h2>当前数字：{props.counter}</h2>
      <button onClick={props.increment}>+1</button>
      <button onClick={props.decrement}>-1</button>
      <button onClick={props.mulNumber}>5</button>
    </div>
  )
}

const mapStateToProps = state => ({
  counter: state.counter
})

const mapDispatchToProps = dispatch => ({
  increment() {
    dispatch(action.addAction(1));
  },
  decrement() {
    dispatch(action.subAction(-1));
  },
  mulNumber() {
    dispatch(action.mulAction(5));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(About2);