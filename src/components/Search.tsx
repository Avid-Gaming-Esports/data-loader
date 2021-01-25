import React, { useState } from 'react';
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { InputGroup, FormControl } from 'react-bootstrap';
import { FiSearch } from "react-icons/fi";
import axios from 'axios';

import { putGameID } from '../store/actionCreators';

import { Constants } from './Constants';

import '../style/View.css';

var champMap = require('../champion.json');
var ssMap = require('../summoner-spells.json');

function Search() {
  const dispatch: Dispatch<any> = useDispatch();
  const [matchID, setMatchID] = useState(0);

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

  let callApi = async () => {
    axios.post("http://localhost:5000/api", {
      gameID: matchID
    }).then((res) => {
      // console.log(res.data);
      res.data.participants = res.data.participants.map((key : any) => {
        key.teamId = Constants.TEAM_MAP[key.teamId]
        if(champKeys.includes(key.championId)) {
          key.championId = champTransform[key.championId.toString()]
        } else {
          console.log(key.championId)
          key.championId = "unknown"
        }
        key.spell1Id = ssTransform[key.spell1Id];
        key.spell2Id = ssTransform[key.spell2Id];
        return key
      })
      // console.log(typeof(res));
      let pullRed = res.data.participants
        .filter((player: PlayerData) => player.teamId === "red");
      let pullBlue = res.data.participants
        .filter((player: PlayerData) => player.teamId === "blue");
      const toUpdate : gameState = {
        blue: pullBlue,
        red: pullRed,
        raw: JSON.stringify(res.data),
        onView: false
      }
      dispatch(putGameID(toUpdate));
    });
  };

  return (
      <InputGroup className="mb-3 sb-1">
        <InputGroup.Prepend
          onClick={() => callApi()}>
          <InputGroup.Text className="lb-1"><FiSearch size={"1.2rem"}/></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          className="match-id"
          placeholder="MatchID"
          aria-label="match-id"
          aria-describedby="basic-addon1"
          type="number"
          onChange={(event) => setMatchID(parseInt(event.target.value))}
        />
      </InputGroup>
  );
}

export default Search;