import * as actionTypes from "./actionTypes"
import { Constants } from '../components/Constants';

const initialState: optState = {
  preset: Constants.PRESET_ARRAYS["minimal"],
  outputTypes: {
    "JSON": true,
    "CSV": true,
    "CSV-Headless": true
  },
  gameOpt: [{"gameCreation": true}, {"gameDuration": true}, {"gameId": true}, {"gameMode": false},
  {"gameType": false}, {"gameVersion": false}, {"mapId": false}, {"platformId": false}, 
  {"queueId": false},{"seasonId": false}],
  teamOpt: [{"towerKills": false}, {"riftHeraldKills": false}, {"firstBlood": false}, {"inhibitorKills": false},
  {"firstBaron": false}, {"firstDragon": false}, {"dragonKills": false}, {"baronKills": false},
  {"firstInhibitor": false}, {"firstTower": false}, {"firstRiftHerald": false}, {"teamId": false},
  {"teamName": true}, {"win": false}],
  generalOpt: [{"participantId": true}, {"teamId": true}, {"championId": true}, {"banChampionId": true},
  {"spell1Id": true}, {"spell2Id": true}],
  accountOpt: [{"platformId": false}, {"accountId": false}, {"summonerName": true}, {"summonerId": false}, 
  {"currentAccountId": false}, {"currentPlatformId": false}, {"matchHistoryUri": false}, {"profileIcon": false}],
  statOpt: [{"win": false}, {"item0": false}, {"item1": false}, {"item2": false}, {"item3": false}, 
  {"item4": false}, {"item5": false}, {"item6": false}, {"kills": false}, {"deaths": false}, 
  {"assists": false}, {"largestKillingSpree": false}, {"largestMultiKill": false}, {"killingSprees": false}, 
  {"longestTimeSpentLiving": false}, {"doubleKills": false}, {"tripleKills": false}, {"quadraKills": false}, 
  {"pentaKills": false}, {"unrealKills": false}, {"totalDamageDealt": false}, {"magicDamageDealt": false}, 
  {"physicalDamageDealt": false}, {"trueDamageDealt": false}, {"largestCriticalStrike": false}, 
  {"totalDamageDealtToChampions": false}, {"magicDamageDealtToChampions": false}, {"physicalDamageDealtToChampions": false}, 
  {"trueDamageDealtToChampions": false}, {"totalHeal": false}, {"totalUnitsHealed": false}, {"damageSelfMitigated": false}, 
  {"damageDealtToObjectives": false}, {"damageDealtToTurrets": false}, {"visionScore": false}, {"timeCCingOthers": false}, 
  {"totalDamageTaken": false}, {"magicalDamageTaken": false}, {"physicalDamageTaken": false}, {"trueDamageTaken": false}, 
  {"goldEarned": false}, {"goldSpent": false}, {"turretKills": false}, {"inhibitorKills": false}, {"totalMinionsKilled": false}, 
  {"neutralMinionsKilled": false}, {"neutralMinionsKilledTeamJungle": false}, {"neutralMinionsKilledEnemyJungle": false}, 
  {"totalTimeCrowdControlDealt": false}, {"champLevel": false}, {"visionWardsBoughtInGame": false}, 
  {"sightWardsBoughtInGame": false}, {"wardsPlaced": false}, {"wardsKilled": false}, {"firstBloodKill": false}, 
  {"firstBloodAssist": false}, {"firstTowerKill": false}, {"firstTowerAssist": false}, {"firstInhibitorKill": false}, 
  {"firstInhibitorAssist": false}, {"combatPlayerScore": false}, {"objectivePlayerScore": false}, {"totalPlayerScore": false}, 
  {"totalScoreRank": false}, {"playerScore0": false}, {"playerScore1": false}, {"playerScore2": false}, {"playerScore3": false}, 
  {"playerScore4": false}, {"playerScore5": false}, {"playerScore6": false}, {"playerScore7": false}, {"playerScore8": false}, 
  {"playerScore9": false}, {"perk0": false}, {"perk0Var1": false}, {"perk0Var2": false}, {"perk0Var3": false}, {"perk1": false}, 
  {"perk1Var1": false}, {"perk1Var2": false}, {"perk1Var3": false}, {"perk2": false}, {"perk2Var1": false}, {"perk2Var2": false}, 
  {"perk2Var3": false}, {"perk3": false}, {"perk3Var1": false}, {"perk3Var2": false}, {"perk3Var3": false}, {"perk4": false}, 
  {"perk4Var1": false}, {"perk4Var2": false}, {"perk4Var3": false}, {"perk5": false}, {"perk5Var1": false}, {"perk5Var2": false}, 
  {"perk5Var3": false}, {"perkPrimaryStyle": false}, {"perkSubStyle": false}, {"statPerk0": false}, {"statPerk1": false}, 
  {"statPerk2": false}],
  timelineOpt: [{"creepsPerMinDeltas": false}, {"xpPerMinDeltas": false}, {"goldPerMinDeltas": false}, {"csDiffPerMinDeltas": false}, 
  {"xpDiffPerMinDeltas": false}, {"damageTakenPerMinDeltas": false}, {"damageTakenDiffPerMinDeltas": false}, {"role": false}, 
  {"lane": true}]
}

const optReducer = (
  state: optState = initialState,
  action: updateOpt
): optState => {
  switch (action.type) {
    case actionTypes.UPDATE_PRESET:
      let newGame = state.gameOpt
      newGame = newGame?.map((key, _value) => {
        if(action.payload.preset) {
          key[Object.keys(key)[0]] = action.payload.preset.includes(Object.keys(key)[0])
        }
        return key
      });
      let newTeam = state.teamOpt
      newTeam = newTeam?.map((key, _value) => {
        if(action.payload.preset) {
          key[Object.keys(key)[0]] = action.payload.preset.includes(Object.keys(key)[0])
        }
        return key
      });
      let newGen = state.generalOpt
      newGen = newGen?.map((key, _value) => {
        if(action.payload.preset) {
          key[Object.keys(key)[0]] = action.payload.preset.includes(Object.keys(key)[0])
        }
        return key
      });
      let newAcc = state.accountOpt
      newAcc = newAcc?.map((key, _value) => {
        if(action.payload.preset) {
          key[Object.keys(key)[0]] = action.payload.preset.includes(Object.keys(key)[0])
        }
        return key
      });
      let newStat = state.statOpt
      newStat = newStat?.map((key, _value) => {
        if(action.payload.preset) {
          key[Object.keys(key)[0]] = action.payload.preset.includes(Object.keys(key)[0])
        }
        return key
      });
      let newTl = state.timelineOpt
      newTl = newTl?.map((key, _value) => {
        if(action.payload.preset) {
          key[Object.keys(key)[0]] = action.payload.preset.includes(Object.keys(key)[0])
        }
        return key
      });
      return {
        ...state,
        preset: action.payload.preset,
        gameOpt: newGame,
        teamOpt: newTeam,
        generalOpt: newGen,
        accountOpt: newAcc,
        statOpt: newStat,
        timelineOpt: newTl
      }
    case actionTypes.UPDATE_OUTPUT:
      return {
        ...state,
        outputTypes: action.payload.outputTypes
      }
    case actionTypes.CHANGE_SELECTOR:
      return {
        ...state,
        statOpt: action.payload.statOpt
      }
  }
  return state;
}

export default optReducer;