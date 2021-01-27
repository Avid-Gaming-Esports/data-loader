import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from "react-redux";
import ReactJson from 'react-json-view';

import { RootState } from "../store/rootReducer";

import '../style/JSONComponent.css';

function formatJSONObj(rPlayers: PlayerData[], bPlayers: PlayerData[], 
  store: optState) {
  let participantArr : any[] = []
  let retObj = {
    participants: {
      red: participantArr,
      blue: participantArr
    }
  };
  
  let genKeys : {[key: string] : number} = { };
  if(store.generalOpt) {
    for(let i = 0; i < Object.keys(store.generalOpt).length; i++) {
      genKeys[Object.keys(store.generalOpt[i])[0]] = i
    }
  }
  // let statKeys : {[key: string] : number} = { };
  // if(store.statOpt) {
  //   for(let i = 0; i < Object.keys(store.statOpt).length; i++) {
  //     statKeys[Object.keys(store.statOpt[i])[0]] = i
  //   }
  // }
  let toAddRed = rPlayers.map((val: PlayerData) => {
    let stripped: { [key: string]: any } = {};
    Object.values(val).forEach((sub_key, sub_val) => {
      if(typeof(sub_key) !== "object") {
        if(store.generalOpt) {
          let idx = genKeys[Object.keys(val)[sub_val]]
          if (store.generalOpt[idx][Object.keys(store.generalOpt[idx])[0]]) {
            stripped[Object.keys(store.generalOpt[idx])[0]] = sub_key;
          }
        }
      }
    })
    stripped["stats"] = { }
    Object.values(val.stats).forEach((sub_key, sub_val) => {
      if(sub_val === 0) {
        return
      } else {
        if (store.statOpt && 
          store.statOpt[sub_val-1][Object.keys(val.stats)[sub_val]]) {
            // console.log(Object.keys(val.stats)[sub_val])
            // console.log(sub_key);
            stripped["stats"][Object.keys(val.stats)[sub_val]] = sub_key
        }
      }
    });
    if (Object.keys(stripped["stats"]).length === 0) {
      delete stripped["stats"];
    }
    return stripped
  })
  let toAddBlue = bPlayers.map((val: PlayerData) => {
    let stripped: { [key: string]: any } = {};
    Object.values(val).forEach((sub_key, sub_val) => {
      if(typeof(sub_key) !== "object") {
        if(store.generalOpt) {
          let idx = genKeys[Object.keys(val)[sub_val]]
          if (store.generalOpt[idx][Object.keys(store.generalOpt[idx])[0]]) {
            stripped[Object.keys(store.generalOpt[idx])[0]] = sub_key;
          }
        }
      }
    })
    return stripped
  })

  retObj.participants.blue = toAddBlue;
  retObj.participants.red = toAddRed;
  return retObj;
}

function JSONComponent() {
  const didLoad = useSelector((state: RootState) => state.main);
  const opt = useSelector((state: RootState) => state.opt);
  return (
    <Alert show={true} variant="dark" className="json-alert">
      <Alert.Heading>JSON</Alert.Heading>
      <div className="json-raw-format">
        {/* {formatJSONObj(didLoad.red, didLoad.blue, opt)} */}
        <ReactJson 
          src={formatJSONObj(didLoad.red, didLoad.blue, opt)} 
          indentWidth={2} 
          collapsed={true}
          style={{"fontSize": "1rem"}}/>
      </div>
    </Alert>
  );
}

export default JSONComponent;