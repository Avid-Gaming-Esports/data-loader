interface blueData {
  bid: string, 
  bkda: string,
  bitems: string,
  bcs: string, 
  bgold: string
}

interface redData {
  rid: string, 
  rkda: string,
  ritems: string,
  rcs: string, 
  rgold: string
}

type gameState = {
  blue: PlayerData[], 
  red: PlayerData[],
  raw: string,
  onView?: boolean,
}

type optState = {
  preset?: string[],
  outputTypes?: {[key: string] : boolean}
}

type updateAction = {
  type: string
  payload: gameData
}

type updateOpt = {
  type: string
  payload: optState
}

type gameData = {
  type: string,
  red?: PlayerData[],
  blue?: PlayerData[],
  raw?: object,
  onView?: boolean,
}

type optData = {
  type: string,
  preset?: string[],
  outputTypes?: {[key: string] : boolean}
}

type PlayerData = {
  championId: number,
  participantId: number,
  spell1Id: number,
  spell2Id: number,
  stats: Stats,
  timeline: Timeline,
  teamId: number
}

type Stats = {
  assists: number,
  champLevel: number,
  combatPlayerScore: number,
  damageDealtToObjectives: number,
  damageDealtToTurrets: number,
  damageSelfMitigated: number,
  deaths: number,
  doubleKills: number,
  firstBloodAssist: boolean,
  firstBloodKill: boolean,
  firstInhibitorAssist: boolean,
  firstInhibitorKill: boolean,
  firstTowerAssist: boolean,
  firstTowerKill: boolean,
  goldEarned: number,
  goldSpent: number,
  inhibitorKills: number,
  item0: number,
  item1: number,
  item2: number,
  item3: number,
  item4: number,
  item5: number,
  item6: number,
  killingSprees: number,
  kills: number,
  largestCriticalStrike: number,
  largestKillingSpree: number,
  largestMultiKill: number,
  longestTimeSpentLiving: number,
  magicDamageDealt: number,
  magicDamageDealtToChampions: number,
  magicalDamageTaken: number,
  neutralMinionsKilled: number,
  neutralMinionsKilledEnemyJungle: number,
  neutralMinionsKilledTeamJungle: number,
  objectivePlayerScore: number,
  pentaKills: number,
  perk0: number,
  perk0Var1: number,
  perk0Var2: number,
  perk0Var3: number,
  perk1: number,
  perk1Var1: number,
  perk1Var2: number,
  perk1Var3: number,
  perk2: number,
  perk2Var1: number,
  perk2Var2: number,
  perk2Var3: number,
  perk3: number,
  perk3Var1: number,
  perk3Var2: number,
  perk3Var3: number,
  perk4: number,
  perk4Var1: number,
  perk4Var2: number,
  perk4Var3: number,
  perk5: number,
  perk5Var1: number,
  perk5Var2: number,
  perk5Var3: number,
  perkPrimaryStyle: number,
  perkSubStyle: number,
  physicalDamageDealt: number,
  physicalDamageDealtToChampions: number,
  physicalDamageTaken: number,
  playerScore0: number,
  playerScore1: number,
  playerScore2: number,
  playerScore3: number,
  playerScore4: number,
  playerScore5: number,
  playerScore6: number,
  playerScore7: number,
  playerScore8: number,
  playerScore9: number,
  quadraKills: number,
  sightWardsBoughtInGame: number,
  statPerk0: number,
  statPerk1: number,
  statPerk2: number,
  timeCCingOthers: number,
  totalDamageDealt: number,
  totalDamageDealtToChampions: number,
  totalDamageTaken: number,
  totalHeal: number,
  totalMinionsKilled: number,
  totalPlayerScore: number,
  totalScoreRank: number,
  totalTimeCrowdControlDealt: number,
  totalUnitsHealed: number,
  tripleKills: number,
  trueDamageDealt: number,
  trueDamageDealtToChampions: number,
  trueDamageTaken: number,
  turretKills: number,
  unrealKills: number,
  visionScore: number,
  visionWardsBoughtInGame: number,
  wardsKilled: number,
  wardsPlaced: number,
  win: boolean
}

type Timeline = {
  creepsPerMinDeltas: Object,
  csDiffPerMinDeltas: Object,
  damageTakenDiffPerMinDeltas: Object,
  damageTakenPerMinDeltas: Object,
  goldPerMinDeltas: Object,
  lane: string,
  role: string,
  xpDiffPerMinDeltas: Object,
  xpPerMinDeltas: Object
}

type Player = {
  platformId: string,
  accountId: string,
  summonerName: string,
  summonerId: string,
  currentPlatformId: string,
  currentAccountId: string,
  matchHistoryUri: string,
  profileIcon: number
}

type Teams = {
  teamId: number,
  win: string,
  firstBlood: boolean,
  firstTower: boolean,
  firstInhibitor: boolean,
  firstBaron: boolean,
  firstDragon: boolean,
  firstRiftHerald: boolean,
  towerKills: number,
  inhibitorKills: number,
  baronKills: number,
  dragonKills: number,
  vilemawKills: number,
  riftHeraldKills: number,
  dominionVictoryScore: number,
  bans: Object[]
}

type PlayerIdentity = {
  participantId: number,
  player: PlayerAccount
}

type PlayerAccount = {
  profileIcon?: number,
  accountId?: string,
  matchHistoryUri?: string,
  currentAccountId?:string,
  currentPlatformId?:	string,
  summonerName: string,	
  summonerId?: string,
  platformId?: string
}

type DispatchType = (raw: gameData) => gameData