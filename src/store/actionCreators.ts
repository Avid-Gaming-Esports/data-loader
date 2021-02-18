import * as actionTypes from "./actionTypes"

export function updateTeamNames(raw: gameState) {
  return {
    type: actionTypes.UPDATE_TEAM_NAME,
    payload: raw
  }
}

export function updateRedPlayers(raw: gameState) {
  return {
    type: actionTypes.UPDATE_RED_PLAYERS,
    payload: raw
  }
}

export function updateBluePlayers(raw: gameState) {
  return {
    type: actionTypes.UPDATE_BLUE_PLAYERS,
    payload: raw
  }
}

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

export function updateHelp(raw?: gameState) {
  return {
    type: actionTypes.UPDATE_HELP,
    payload: raw
  }
}

export function changePreset(raw: optState) {
  return {
    type: actionTypes.UPDATE_PRESET,
    payload: raw
  }
}

export function changeSelectors(raw: optState) {
  return {
    type: actionTypes.CHANGE_SELECTOR,
    payload: raw
  }
}

export function toggleOutput(raw: optState) {
  return {
    type: actionTypes.UPDATE_OUTPUT,
    payload: raw
  }
}