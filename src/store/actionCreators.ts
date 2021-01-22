import * as actionTypes from "./actionTypes"

export function putGameID(raw: gameState) {
  return {
    type: actionTypes.UPDATE_INFO,
    payload: raw
  }
}

export function updateScreen(raw: gameState) {
  return {
    type: actionTypes.UPDATE_STATE,
    payload: raw
  }
}

export function changePreset(raw: gameState) {
  return {
    type: actionTypes.UPDATE_PRESET,
    payload: raw
  }
}

export function toggleOutput(raw: gameState) {
  return {
    type: actionTypes.UPDATE_OUTPUT,
    payload: raw
  }
}