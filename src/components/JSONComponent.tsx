import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from "react-redux";
import ReactJson from 'react-json-view';

import { RootState } from "../store/rootReducer";

import '../style/JSONComponent.css';

function swap(arr: any[], idx1: number, idx2: number) {
  let tmp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = tmp;
}

function formatJSONObj(rPlayers: PlayerData[], bPlayers: PlayerData[], 
  meta: Metadata, store: optState) {
  let timeObj = rPlayers[0].timeline
  let participantArr : any[] = []
  let retObj = {
    gameCreation: meta.gameCreation,
    gameDuration: meta.gameDuration,
    gameId: meta.gameId,
    gameMode: meta.gameMode,
    gameType: meta.gameType,
    gameVersion: meta.gameVersion,
    mapId: meta.mapId,
    platformId: meta.platformId,
    queueId: meta.queueId,
    seasonId: meta.seasonId,
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
  let timeKeys : { [key: string] : number; } = { };
  if(store.timelineOpt) {
    for(let i = 0; i < Object.keys(store.timelineOpt).length; i++) {
      let idx = Object.keys(timeObj).indexOf(Object.keys(store.timelineOpt[i])[0])-1;
      timeKeys[Object.keys(store.timelineOpt[i])[0]] = idx
    }
  }
  let objKeys = Object.keys(timeObj).slice(1);
  let customKeys = Object.keys(timeKeys);
  let toFix : number[][] = [];
  for (let i = 0; i < (Math.ceil(Object.keys(timeKeys).length / 2)); i++) {
    if (objKeys[i] !== customKeys[i]) {
      toFix.push([objKeys.indexOf(objKeys[i]), objKeys.indexOf(customKeys[i])])
    }
  }
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
    stripped["timeline"] = { }
    let toMap = Object.values(val.timeline);
    for (let i = 0; i < toFix.length; i++) {
      swap(toMap, toFix[i][0]+2, toFix[i][1]+2);
    }
    Object.values(val.timeline).forEach((sub_key, sub_val) => {
      if(sub_val === 0) {
        return
      } else {
        let idx = timeKeys[Object.keys(val.timeline)[sub_val]]
        if (store.timelineOpt && 
          store.timelineOpt[idx][Object.keys(store.timelineOpt[idx])[0]]) {
          if(typeof(sub_key) !== "object") {
            stripped["timeline"][Object.keys(val.timeline)[sub_val]] = sub_key
          } else {
            stripped["timeline"][Object.keys(val.timeline)[sub_val]] = { }
            let retStr = ["0-10", "10-20", "20-30", "30-end"]
            retStr.forEach((sub2_key: string, _sub2_val: any) => {
              if(sub_key[sub2_key] === -1) {
                return
              }
              stripped["timeline"][Object.keys(val.timeline)[sub_val]][sub2_key] 
                = sub_key[sub2_key]
            })
            if (Object.keys(stripped["timeline"][Object.keys(val.timeline)[sub_val]]).length 
              === 0) {
              delete stripped["timeline"][Object.keys(val.timeline)[sub_val]];
            }
          }
        }
      }
    });
    if (Object.keys(stripped["timeline"]).length === 0) {
      delete stripped["timeline"];
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
          src={formatJSONObj(didLoad.red, didLoad.blue, didLoad.meta, opt)} 
          indentWidth={2} 
          collapsed={true}
          style={{"fontSize": "1rem"}}/>
      </div>
    </Alert>
  );
}

export default JSONComponent;