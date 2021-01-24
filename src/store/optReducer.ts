import * as actionTypes from "./actionTypes"
import { Constants } from '../components/Constants';

const initialState: optState = {
  preset: Constants.PRESET_ARRAYS["advanced"],
  outputTypes: {
    "JSON": true,
    "CSV": true,
    "CSV-Headless": true
  }
}

const optReducer = (
  state: optState = initialState,
  action: updateOpt
): optState => {
  switch (action.type) {
    case actionTypes.UPDATE_PRESET:
      return {
        ...state,
        preset: action.payload.preset,
      }
    case actionTypes.UPDATE_OUTPUT:
      return {
        ...state,
        outputTypes: action.payload.outputTypes
      }
  }
  return state;
}

export default optReducer;