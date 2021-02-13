export abstract class Constants {
  static readonly PRESET_ARRAYS: {[key: string] : string[]} = {
    "minimal": ["gameCreation", "gameDuration", "gameId", "participantId", "championId", "spell1Id", "spell2Id", "teamId", "lane"],
    "advanced": ["gameCreation", "gameDuration", "gameId", "participantId", "championId", "assists", "champLevel", "damageDealtToObjectives", 
    "damageDealtToTurrets", "damageSelfMitigated", "deaths", "goldEarned", "goldSpent", "item0", 
    "item1", "item2", "item3", "item4", "item5", "item6", "kills", "magicDamageDealt", 
    "neutralMinionsKilled", "physicalDamageDealt", "timeCCingOthers", "totalDamageDealt", "totalHeal", 
    "totalMinionsKilled", "totalTimeCrowdControlDealt", "trueDamageDealt", "turretKills", 
    "visionScore", "wardsKilled", "wardsPlaced", "win", "spell1Id", "spell2Id", "teamId"],
    "all": ["championId", "spell1Id", "spell2Id", "teamId", "win", "item0", "item1", "item2", "item3", "item4", "item5", 
    "item6", "kills", "deaths", "assists", "largestKillingSpree", "largestMultiKill", "killingSprees", 
    "longestTimeSpentLiving", "doubleKills", "tripleKills", "quadraKills", "pentaKills", "unrealKills", 
    "totalDamageDealt", "magicDamageDealt", "physicalDamageDealt", "trueDamageDealt", "largestCriticalStrike", 
    "totalDamageDealtToChampions", "magicDamageDealtToChampions", "physicalDamageDealtToChampions", 
    "trueDamageDealtToChampions", "totalHeal", "totalUnitsHealed", "damageSelfMitigated", "damageDealtToObjectives", 
    "damageDealtToTurrets", "visionScore", "timeCCingOthers", "totalDamageTaken", "magicalDamageTaken", 
    "physicalDamageTaken", "trueDamageTaken", "goldEarned", "goldSpent", "turretKills", "inhibitorKills", 
    "totalMinionsKilled", "neutralMinionsKilled", "neutralMinionsKilledTeamJungle", "neutralMinionsKilledEnemyJungle", 
    "totalTimeCrowdControlDealt", "champLevel", "visionWardsBoughtInGame", "sightWardsBoughtInGame", "wardsPlaced", 
    "wardsKilled", "firstBloodKill", "firstBloodAssist", "firstTowerKill", "firstTowerAssist", "firstInhibitorKill", 
    "firstInhibitorAssist", "combatPlayerScore", "objectivePlayerScore", "totalPlayerScore", "totalScoreRank", 
    "playerScore0", "playerScore1", "playerScore2", "playerScore3", "playerScore4", "playerScore5", "playerScore6", 
    "playerScore7", "playerScore8", "playerScore9", "perk0", "perk0Var1", "perk0Var2", "perk0Var3", "perk1", "perk1Var1", 
    "perk1Var2", "perk1Var3", "perk2", "perk2Var1", "perk2Var2", "perk2Var3", "perk3", "perk3Var1", "perk3Var2", 
    "perk3Var3", "perk4", "perk4Var1", "perk4Var2", "perk4Var3", "perk5", "perk5Var1", "perk5Var2", "perk5Var3", 
    "perkPrimaryStyle", "perkSubStyle", "statPerk0", "statPerk1", "statPerk2", "role", "lane"],
    "none": [],
  };
  static readonly TEAM_MAP: {[key: number] : string} = {
    100: "blue",
    200: "red"
  }
  static readonly TEAM_NAME: {[key: number] : string} = {
    100: "BLU",
    200: "RED"
  }
  static readonly COL_ROLE_MAP: {[key: string] : string} = {
    "TOP": "SOLO",
    "JUNGLE": "NONE",
    "MIDDLE": "SOLO",
    "BOTTOM": "DUO_CARRY",
    "SUPPORT": "DUO_SUPPORT"
  }
  static readonly METADATA_EDIT_MAP: {[key: string] : boolean} = {
    "gameCreation": false, 
    "gameDuration": false, 
    "gameId": false, 
    "gameMode": true, 
    "gameType": true, 
    "gameVersion": false, 
    "mapId": false, 
    "platformId": false, 
    "queueId": false, 
    "seasonId": true
  }
  static readonly ROLE_OPTIONS : any[] = [{
    value: 'TOP',
    label: 'TOP'
  }, {
    value: 'JUNGLE',
    label: 'JUNGLE'
  }, {
    value: 'MIDDLE',
    label: 'MIDDLE'
  }, {
    value: 'BOTTOM',
    label: 'BOTTOM'
  }, {
    value: 'SUPPORT',
    label: 'SUPPORT'
  }]
}