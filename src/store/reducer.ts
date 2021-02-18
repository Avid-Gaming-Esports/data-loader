import * as actionTypes from "./actionTypes";
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

momentDurationFormatSetup(moment);

let playerInitial : PlayerData[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  .map((val: number) => {
  let player: PlayerData = {
    account: {
      participantId: val,
      player: {
        profileIcon: 0,
        accountId: "",
        matchHistoryUri: "",
        currentAccountId: "", 
        currentPlatformId: "",
        summonerName: "",
        summonerId: "",
        platformId: ""
      }
    },
    championId: "",
    banChampionId: "",
    participantId: val,
    spell1Id: "Flash",
    spell2Id: "Ignite",
    stats: {
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
    },
    timeline: {
      creepsPerMinDeltas: {},
      csDiffPerMinDeltas: {},
      damageTakenDiffPerMinDeltas: {},
      damageTakenPerMinDeltas: {},
      goldPerMinDeltas: {},
      lane: "NONE",
      role: "NONE",
      xpDiffPerMinDeltas: {},
      xpPerMinDeltas: {}
    },
    teamId: (val < 6 ? "blue" : "red")
  }
  return player;
})

const initialState: gameState = {
  blue: playerInitial.slice(0, 5),
  red: playerInitial.slice(5, 10),
  meta: {
    gameCreation: moment(1612310986).format('MM-DD-YYYY HH:mm:ss'),
    gameDuration: moment.duration(0, "seconds").format("h:mm:ss"),
    gameId: 0,
    gameMode: "",
    gameType: "",
    gameVersion: "",
    mapId: 0,
    platformId: "1",
    queueId: 0,
    seasonId: 0
  },
  redTeam: {
    baronKills: 1,
    dragonKills: 2,
    firstBaron: true,
    firstBlood: true,
    firstDragon: false,
    firstInhibitor: true,
    firstRiftHerald: true,
    firstTower: true,
    inhibitorKills: 2,
    riftHeraldKills: 2,
    teamId: "red",
    teamName: "RED",
    towerKills: 10,
    win: true
  },
  blueTeam: {
    baronKills: 1,
    dragonKills: 2,
    firstBaron: true,
    firstBlood: true,
    firstDragon: false,
    firstInhibitor: true,
    firstRiftHerald: true,
    firstTower: true,
    inhibitorKills: 2,
    riftHeraldKills: 2,
    teamId: "blue",
    teamName: "BLU",
    towerKills: 10,
    win: true
  },
  raw: JSON.stringify(""),
  onView: false,
  help: false
}

const reducer = (
  state: gameState = initialState,
  action: updateAction
): gameState => {
  switch (action.type) {
    case actionTypes.UPDATE_INFO:
      if (action.payload.blue && action.payload.red && action.payload.meta &&
        action.payload.blueTeam && action.payload.redTeam) {
        return {
          ...state,
          blue: action.payload.blue, 
          red: action.payload.red,
          blueTeam: action.payload.blueTeam,
          redTeam: action.payload.redTeam,
          meta: action.payload.meta,
          raw: JSON.stringify(action.payload.raw),
        }
      }
      break;
    case actionTypes.UPDATE_TEAM_NAME:
      if (action.payload.blueTeam && action.payload.redTeam) {
        return {
          ...state,
          blueTeam: action.payload.blueTeam,
          redTeam: action.payload.redTeam
        }
      }
      break;
    case actionTypes.UPDATE_RED_PLAYERS:
      if (action.payload.red) {
        return {
          ...state,
          red: action.payload.red
        }
      }
      break;
    case actionTypes.UPDATE_BLUE_PLAYERS:
      if (action.payload.blue) {
        return {
          ...state,
          blue: action.payload.blue
        }
      }
      break;
    case actionTypes.UPDATE_STATE:
      return {
        ...state,
        onView: action.payload.onView,
      }
    case actionTypes.UPDATE_HELP:
      return {
        ...state,
        help: action.payload.help,
      }
  }
  return state;
}

export default reducer;