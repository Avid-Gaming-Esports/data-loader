import * as actionTypes from "./actionTypes";

const pHStats: Stats = {
  assists: 0,
  champLevel: 1,
  combatPlayerScore: 0,
  damageDealtToObjectives: 35123,
  damageDealtToTurrets: 7944,
  damageSelfMitigated: 18570,
  deaths: 0,
  doubleKills: 0,
  firstBloodAssist: false,
  firstBloodKill: false,
  firstInhibitorAssist: false,
  firstInhibitorKill: false,
  firstTowerAssist: false,
  firstTowerKill: false,
  goldEarned: 0,
  goldSpent: 0,
  inhibitorKills: 0,
  item0: 3031,
  item1: 3072,
  item2: 6672,
  item3: 3085,
  item4: 3006,
  item5: 0,
  item6: 3363,
  killingSprees: 4,
  kills: 0,
  largestCriticalStrike: 1567,
  largestKillingSpree: 4,
  largestMultiKill: 2,
  longestTimeSpentLiving: 652,
  magicDamageDealt: 6008,
  magicDamageDealtToChampions: 3510,
  magicalDamageTaken: 5574,
  neutralMinionsKilled: 0,
  neutralMinionsKilledEnemyJungle: 0,
  neutralMinionsKilledTeamJungle: 0,
  objectivePlayerScore: 0,
  pentaKills: 0,
  perk0: 8010,
  perk0Var1: 375,
  perk0Var2: 0,
  perk0Var3: 0,
  perk1: 9101,
  perk1Var1: 4817,
  perk1Var2: 5919,
  perk1Var3: 0,
  perk2: 9103,
  perk2Var1: 18,
  perk2Var2: 20,
  perk2Var3: 0,
  perk3: 8017,
  perk3Var1: 1591,
  perk3Var2: 0,
  perk3Var3: 0,
  perk4: 8135,
  perk4Var1: 1228,
  perk4Var2: 5,
  perk4Var3: 0,
  perk5: 8139,
  perk5Var1: 950,
  perk5Var2: 0,
  perk5Var3: 0,
  perkPrimaryStyle: 8000,
  perkSubStyle: 8100,
  physicalDamageDealt: 157772,
  physicalDamageDealtToChampions: 25820,
  physicalDamageTaken: 9080,
  playerScore0: 0,
  playerScore1: 0,
  playerScore2: 0,
  playerScore3: 0,
  playerScore4: 0,
  playerScore5: 0,
  playerScore6: 0,
  playerScore7: 0,
  playerScore8: 0,
  playerScore9: 0,
  quadraKills: 0,
  sightWardsBoughtInGame: 0,
  statPerk0: 5005,
  statPerk1: 5008,
  statPerk2: 5002,
  timeCCingOthers: 16,
  totalDamageDealt: 180150,
  totalDamageDealtToChampions: 33885,
  totalDamageTaken: 15809,
  totalHeal: 4038,
  totalMinionsKilled: 0,
  totalPlayerScore: 0,
  totalScoreRank: 0,
  totalTimeCrowdControlDealt: 140,
  totalUnitsHealed: 2,
  tripleKills: 0,
  trueDamageDealt: 16370,
  trueDamageDealtToChampions: 4554,
  trueDamageTaken: 1154,
  turretKills: 3,
  unrealKills: 0,
  visionScore: 24,
  visionWardsBoughtInGame: 1,
  wardsKilled: 8,
  wardsPlaced: 6,
  win: false
}

const pHTimeline: Timeline = {
  creepsPerMinDeltas: {},
  csDiffPerMinDeltas: {},
  damageTakenDiffPerMinDeltas: {},
  damageTakenPerMinDeltas: {},
  goldPerMinDeltas: {},
  lane: "NONE",
  role: "NONE",
  xpDiffPerMinDeltas: {},
  xpPerMinDeltas: {}
}

const initialState: gameState = {
  blue: [{
    championId: "Aatrox",
    participantId: 1,
    spell1Id: "Flash",
    spell2Id: "Ignite",
    stats: pHStats,
    timeline: pHTimeline,
    teamId: "red"
  },{
    championId: "Aatrox",
    participantId: 2,
    spell1Id: "Flash",
    spell2Id: "Ignite",
    stats: pHStats,
    timeline: pHTimeline,
    teamId: "red"
  },{
    championId: "Aatrox",
    participantId: 3,
    spell1Id: "Flash",
    spell2Id: "Ignite",
    stats: pHStats,
    timeline: pHTimeline,
    teamId: "red"
  },{
    championId: "Aatrox",
    participantId: 4,
    spell1Id: "Flash",
    spell2Id: "Ignite",
    stats: pHStats,
    timeline: pHTimeline,
    teamId: "red"
  },{
    championId: "Aatrox",
    participantId: 5,
    spell1Id: "Flash",
    spell2Id: "Ignite",
    stats: pHStats,
    timeline: pHTimeline,
    teamId: "red"
  }],
  red: [{
    championId: "Aatrox",
    participantId: 6,
    spell1Id: "Flash",
    spell2Id: "Ignite",
    stats: pHStats,
    timeline: pHTimeline,
    teamId: "blue"
  },{
    championId: "Aatrox",
    participantId: 7,
    spell1Id: "Flash",
    spell2Id: "Ignite",
    stats: pHStats,
    timeline: pHTimeline,
    teamId: "blue"
  },{
    championId: "Aatrox",
    participantId: 8,
    spell1Id: "Flash",
    spell2Id: "Ignite",
    stats: pHStats,
    timeline: pHTimeline,
    teamId: "blue"
  },{
    championId: "Aatrox",
    participantId: 9,
    spell1Id: "Flash",
    spell2Id: "Ignite",
    stats: pHStats,
    timeline: pHTimeline,
    teamId: "blue"
  },{
    championId: "Aatrox",
    participantId: 10,
    spell1Id: "Flash",
    spell2Id: "Ignite",
    stats: pHStats,
    timeline: pHTimeline,
    teamId: "blue"
  }],
  raw: JSON.stringify(""),
  onView: false
}

const reducer = (
  state: gameState = initialState,
  action: updateAction
): gameState => {
  switch (action.type) {
    case actionTypes.UPDATE_INFO:
      // console.log(action.payload)
      if (action.payload.blue && action.payload.red) {
        return {
          ...state,
          blue: action.payload.blue, 
          red: action.payload.red,
          raw: JSON.stringify(action.payload.raw),
        }
      } else {
        return {
          ...state,
          raw: JSON.stringify(action.payload.raw),
        }
      }
    case actionTypes.UPDATE_STATE:
      console.log(action.payload)
      return {
        ...state,
        onView: action.payload.onView,
      }
    // case actionTypes.UPDATE_PRESET:
    //   return {
    //     ...state,
    //     preset: action.payload.preset,
    //   }
    // case actionTypes.UPDATE_OUTPUT:
    //   return {
    //     ...state,
    //     outputTypes: action.payload.outputTypes
    //   }
  }
  return state;
}

export default reducer;