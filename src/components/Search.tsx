import React, { useState } from 'react';
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, FormControl } from 'react-bootstrap';
import { FiAlertCircle, FiSearch } from "react-icons/fi";
import axios from 'axios';

import { putGameID, updateHelp } from '../store/actionCreators';

import { Constants } from './Constants';

import '../style/View.css';

import { RootState } from '../store/rootReducer';
// import Metadata from './Metadata';

var champMap = require('../champion.json');
var ssMap = require('../summoner-spells.json');
var itemMap = require('../item.json').data;
var queueMap = require('../queues.json');
var mapsMap = require('../maps.json');

var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

momentDurationFormatSetup(moment);

function Search() {
  const main = useSelector((state: RootState) => state.main);
  const dispatch: Dispatch<any> = useDispatch();
  const [matchID, setMatchID] = useState(0);

  const handleShow = () => dispatch(updateHelp({
    ...main,
    help: true
  }));

  let champTransform : {[key: number] : any} = { };
  for (let idNugget in champMap.data) {
    champTransform[champMap.data[idNugget].key] = idNugget;
  }
  let champKeys = Object.keys(champTransform).map((val) => {
    return parseInt(val)
  })
  let ssTransform : {[key: number] : any} = { };
  for (let idNugget in ssMap) {
    ssTransform[ssMap[idNugget].id] = ssMap[idNugget].name
  }
  let itemKeys = Object.keys(itemMap);
  let queueTransform : {[key: number] : any} = { };
  for (let queueNugget in queueMap) {
    if (queueMap[queueNugget].queueId === 0) {
      queueTransform[queueMap[queueNugget].queueId] = "Custom games"
    } else {
      queueTransform[queueMap[queueNugget].queueId] = queueMap[queueNugget].description
    }
  }
  let mapTransform : {[key: number] : any} = { };
  for (let mapNugget in mapsMap) {
    mapTransform[mapsMap[mapNugget].mapId] = mapsMap[mapNugget].mapName + " " + mapsMap[mapNugget].notes
  }

  let callApi = async () => {
    axios.post("https://avid-alpha.wl.r.appspot.com/api", {
      gameID: matchID
    }).then((res) => {
      res.data.participants = res.data.participants.map((key : any) => {
        key.teamId = Constants.TEAM_MAP[key.teamId]
        if(champKeys.includes(key.championId)) {
          key.championId = champTransform[key.championId.toString()]
        } else {
          console.log(key.championId)
          key.championId = "unknown"
        }
        for (let i = 0; i < 7; i++) {
          let itemString = key.stats["item"+i.toString()].toString()
          key.stats["item"+i.toString()] = (itemKeys.includes(itemString)) ? 
            itemMap[itemString].name : "";
        } 
        key.spell1Id = ssTransform[key.spell1Id];
        key.spell2Id = ssTransform[key.spell2Id];

        let reqTimeline : string[] = ["creepsPerMinDeltas", "xpPerMinDeltas", 
        "goldPerMinDeltas", "csDiffPerMinDeltas", "xpDiffPerMinDeltas",
        "damageTakenPerMinDeltas", "damageTakenDiffPerMinDeltas"];
        for (let selector in reqTimeline) {
          let givenData = key.timeline[reqTimeline[selector]]
          let keyWork = (givenData === undefined) ? ["0-10", "10-20", "20-30", "30-end"] : 
            ["0-10", "10-20", "20-30", "30-end"].filter((val) => !Object.keys(givenData).includes(val))
          if (givenData === undefined) {
            key.timeline[reqTimeline[selector]] = { }
          }
          for (let toAdd in keyWork) {
            key.timeline[reqTimeline[selector]][keyWork[toAdd]] = -1
          }
        }
        return key
      })
      res.data.participants.forEach((entry: any) => {
        entry.account = { }
      })
      let pullRed = res.data.participants
        .filter((player: PlayerData) => player.teamId === "red");
      let pullBlue = res.data.participants
        .filter((player: PlayerData) => player.teamId === "blue");

      let redIds = pullRed.map((player: PlayerData) => {
        return player.participantId;
      });

      res.data.participantIdentities.forEach((entry: any) => {
        if (redIds.includes(entry.participantId)) {
          if(entry.player === undefined) {
            pullRed[entry.participantId-(redIds.length+1)].account = {
              participantId: entry.participantId,
              player: {
                profileIcon: 3712,
                accountId: "UNKNOWN",
                matchHistoryUri: "UNKNOWN",
                currentAccountId: "UNKNOWN", 
                currentPlatformId: "UNKNOWN",
                summonerName: "Player " + entry.participantId.toString(),
                summonerId: "UNKNOWN",
                platformId: "UNKNOWN"
              }
            }
          } else {
            pullRed[entry.participantId-(redIds.length+1)].account = entry
          }
        } else {
          if(entry.player === undefined) {
            pullBlue[entry.participantId-1].account = {
              participantId: entry.participantId,
              player: {
                profileIcon: 3712,
                accountId: "UNKNOWN",
                matchHistoryUri: "UNKNOWN",
                currentAccountId: "UNKNOWN", 
                currentPlatformId: "UNKNOWN",
                summonerName: "Player " + entry.participantId.toString(),
                summonerId: "UNKNOWN",
                platformId: "UNKNOWN"
              }
            }
          } else {
            pullBlue[entry.participantId-1].account = entry
          }
        }
      })
      
      let md : Metadata = { 
        gameCreation: moment(res.data.gameCreation).format(),
        gameDuration: moment.duration(res.data.gameDuration, "seconds").format("h:mm:ss"),
        gameId: res.data.gameId,
        gameMode: res.data.gameMode,
        gameType: res.data.gameType,
        gameVersion: res.data.gameVersion,
        mapId: mapTransform[res.data.mapId],
        platformId: res.data.platformId,
        queueId: queueTransform[res.data.queueId],
        seasonId: res.data.seasonId,
      }
      
      let redTeam = res.data.teams.filter((teamObj: any) => teamObj.teamId === 200)[0];
      let blueTeam = res.data.teams.filter((teamObj: any) => teamObj.teamId === 100)[0];

      redTeam.bans.forEach((ban: any, idx: number) => {
        pullRed[idx].banChampionId = champTransform[ban.championId]
      })
      blueTeam.bans.forEach((ban: any, idx: number) => {
        pullBlue[idx].banChampionId = champTransform[ban.championId]
      })

      let strippedTeams = res.data.teams.map((entry: any) => {
        let entryTeam : TeamData = {
          towerKills: entry.towerKills,
          riftHeraldKills:	entry.riftHeraldKills,
          firstBlood:	entry.firstBlood,
          inhibitorKills:	entry.inhibitorKills,
          firstBaron:	entry.firstBaron,
          firstDragon: entry.firstDragon,
          dragonKills: entry.dragonKills,
          baronKills: entry.baronKills,
          firstInhibitor: entry.firstInhibitor,
          firstTower: entry.firstTower,
          firstRiftHerald: entry.firstRiftHerald,
          teamId: Constants.TEAM_MAP[entry.teamId],
          teamName: Constants.TEAM_NAME[entry.teamId],
          win: (entry.win === "Win")
        }
        return entryTeam
      })

      let redTeamData = strippedTeams.filter((teamObj: TeamData) => teamObj.teamId === "red")[0];
      let blueTeamData = strippedTeams.filter((teamObj: TeamData) => teamObj.teamId === "blue")[0];

      const toUpdate : gameState = {
        blue: pullBlue,
        red: pullRed,
        meta: md,
        redTeam: redTeamData,
        blueTeam: blueTeamData,
        raw: JSON.stringify(res.data),
        onView: false
      }

      dispatch(putGameID(toUpdate));
    });
  };

  return (
    <div>
      <InputGroup className="mb-3 sb-1">
        <InputGroup.Prepend
          onClick={() => callApi()}>
          <InputGroup.Text className="lb-1"><FiSearch size={"1.2rem"}/></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          className="game-id"
          placeholder="GameID"
          aria-label="game-id"
          aria-describedby="basic-addon1"
          type="number"
          onKeyPress={(event: React.KeyboardEvent) => {
            if(event.key === "Enter") {
              callApi()
            }
          }}
          onChange={(event) => {
            setMatchID(parseInt(event.target.value));
          }}
        />
        <InputGroup.Append
          onClick={handleShow}>
          <InputGroup.Text className="lb-1 rounded-right"><FiAlertCircle size={"1.2rem"}/>
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}

export default Search;