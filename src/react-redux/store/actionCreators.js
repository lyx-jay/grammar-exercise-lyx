import * as actionType from './constant.js';

export const addAction = (num) => ({
  type: actionType.ADD_NUMBER,
  num
})
export const subAction = (num) => ({
  type: actionType.SUB_NUMBER,
  num
})
export const mulAction = (num) => ({
  type: actionType.MUL_NUMBER,
  num
})
