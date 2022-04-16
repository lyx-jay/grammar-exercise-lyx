import React from "react";

import store from "../store/index";
import * as action from '../store/actionCreators';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 以store中的数据作为组件的state源
      counter: store.getState().counter
    }
  }

  componentDidMount() {
    // subscribe return a function, which will unsubscribe the listener
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        counter: store.getState().counter
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
         <h1>About</h1>
         <h2>当前数字：{this.state.counter}</h2>
         <button onClick={e => this.increment()}>+1</button>
         <button onClick={e => this.decrement()}>-1</button>
         <button onClick={e => this.mulNumber()}>5</button>
      </div>
    )
  }

  increment() {
    store.dispatch(action.addAction(1));
  }
  decrement() {
    store.dispatch(action.subAction(-1));
  }
  mulNumber() {
    store.dispatch(action.mulAction(5));
  }
}