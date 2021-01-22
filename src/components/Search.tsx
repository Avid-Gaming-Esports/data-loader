import React, { useState } from 'react';
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { InputGroup, FormControl } from 'react-bootstrap';
import { FiSearch } from "react-icons/fi";
import axios from 'axios';

import { putGameID } from '../store/actionCreators';

import '../style/View.css';

function Search() {
  const dispatch: Dispatch<any> = useDispatch();
  const [matchID, setMatchID] = useState(0);

  let callApi = async () => {
    axios.post("http://localhost:5000/api", {
      gameID: matchID
    }).then((res) => {
      // console.log(res);
      // console.log(typeof(res));
      let pullRed = res.data.participants
        .filter((player: PlayerData) => player.teamId === 100);
      let pullBlue = res.data.participants
        .filter((player: PlayerData) => player.teamId === 200);
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