import * as actionTypes from "./actionTypes";

const pHStats: Stats = {
  assists: 0,
  champLevel: 1,
  combatPlayerScore: 0,
  damageDealtToObjectives: 0,
  damageDealtToTurrets: 0,
  damageSelfMitigated: 0,
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
  item0: "",
  item1: "",
  item2: "",
  item3: "",
  item4: "",
  item5: "",
  item6: "",
  killingSprees: 0,
  kills: 0,
  largestCriticalStrike: 0,
  largestKillingSpree: 0,
  largestMultiKill: 0,
  longestTimeSpentLiving: 0,
  magicDamageDealt: 0,
  magicDamageDealtToChampions: 0,
  magicalDamageTaken: 0,
  neutralMinionsKilled: 0,
  neutralMinionsKilledEnemyJungle: 0,
  neutralMinionsKilledTeamJungle: 0,
  objectivePlayerScore: 0,
  pentaKills: 0,
  perk0: 0,
  perk0Var1: 0,
  perk0Var2: 0,
  perk0Var3: 0,
  perk1: 0,
  perk1Var1: 0,
  perk1Var2: 0,
  perk1Var3: 0,
  perk2: 0,
  perk2Var1: 0,
  perk2Var2: 0,
  perk2Var3: 0,
  perk3: 0,
  perk3Var1: 0,
  perk3Var2: 0,
  perk3Var3: 0,
  perk4: 0,
  perk4Var1: 0,
  perk4Var2: 0,
  perk4Var3: 0,
  perk5: 0,
  perk5Var1: 0,
  perk5Var2: 0,
  perk5Var3: 0,
  perkPrimaryStyle: 0,
  perkSubStyle: 0,
  physicalDamageDealt: 0,
  physicalDamageDealtToChampions: 0,
  physicalDamageTaken: 0,
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
  statPerk0: 0,
  statPerk1: 0,
  statPerk2: 0,
  timeCCingOthers: 0,
  totalDamageDealt: 0,
  totalDamageDealtToChampions: 0,
  totalDamageTaken: 0,
  totalHeal: 0,
  totalMinionsKilled: 0,
  totalPlayerScore: 0,
  totalScoreRank: 0,
  totalTimeCrowdControlDealt: 0,
  totalUnitsHealed: 0,
  tripleKills: 0,
  trueDamageDealt: 0,
  trueDamageDealtToChampions: 0,
  trueDamageTaken: 0,
  turretKills: 0,
  unrealKills: 0,
  visionScore: 0,
  visionWardsBoughtInGame: 0,
  wardsKilled: 0,
  wardsPlaced: 0,
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