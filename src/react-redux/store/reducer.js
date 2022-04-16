import * as actionType from './constant.js';

const initialState = {
  counter: 0
}

// reducer函数默认一定要返回state，不然会返回一个undefined，那么store.getState()拿到的就是undefined
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.ADD_NUMBER:
      return {...state, counter: state.counter + action.num}
    case actionType.SUB_NUMBER:
      return {...state, counter: state.counter + action.num}
    case actionType.MUL_NUMBER:
      return {...state, counter: state.counter * action.num}
    default:
      return state;
  }
}
