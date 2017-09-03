import * as types from '../actions/action-types'
import { DATA } from './data'

const initialState = {
  airports: DATA,
  distance: {},
  from: [],
  to: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CALCULATE_DISTANCE:
      return Object.assign({}, state, {
        distance: action.data,
      })
    case types.CLEAR_VALUES:
      return Object.assign({}, state, {
        distance: {},
        [action.direction]: [],
      })
    case types.SELECT_LOCATION:
      return Object.assign({}, state, {
        [action.direction]: action.data,
      })
    default:
      return state
  }
};
