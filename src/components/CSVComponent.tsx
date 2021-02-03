import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from "react-redux"

import { RootState } from "../store/rootReducer";

import '../style/CSVComponent.css';

interface CSVProps {
  headless: boolean;
}

function swap(arr: any[], idx1: number, idx2: number) {
  let tmp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = tmp;
}

function formatLine(value: PlayerData, meta: Metadata, store: optState) {
  let accountObj : PlayerAccount["player"] = value.account.player;
  let statObj : Stats = value.stats;
  let timeObj : Timeline = value.timeline;

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
  let accKeys : {[key: string] : number} = { };
  if(store.accountOpt) {
    for(let i = 0; i < Object.keys(store.accountOpt).length; i++) {
      accKeys[Object.keys(store.accountOpt[i])[0]] = i
    }
  }
  let timeKeys : { [key: string] : number; } = { };
  if(store.timelineOpt) {
    for(let i = 0; i < Object.keys(store.timelineOpt).length; i++) {
      let idx = Object.keys(timeObj).indexOf(Object.keys(store.timelineOpt[i])[0])-1;
      timeKeys[Object.keys(store.timelineOpt[i])[0]] = idx
    }
  }
  let gameStr = Object.values(meta).map((key, val) => {
    if (store.gameOpt && 
      store.gameOpt[val][Object.keys(store.gameOpt[val])[0]]) {
      return key.toString() + ",";
    }
    return "";
  })
  let pre = Object.values(value).map((key, val) => {
    if(typeof(key) !== "object") {
      let idx = genKeys[Object.keys(value)[val]]
      if (store.generalOpt && 
        store.generalOpt[idx][Object.keys(store.generalOpt[idx])[0]]) {
        return key.toString() + ",";
      }
    }
    return "";
  })
  let accountStr = Object.values(accountObj).map((key, val) => {
    if (store.accountOpt && 
      Object.values(store.accountOpt[accKeys[Object.keys(accountObj)[val]]])[0]) {
      // Fix line above later
      return key.toString() + ",";
    }
    return "";
  });
  let statStr = Object.values(statObj).map((key, val) => {
    if(val === 0) {
      return "";
    }
    if (store.statOpt && 
      store.statOpt[val-1][Object.keys(statObj)[val]]) {
      // Fix line above later
      return key.toString() + ",";
    }
    return "";
  });
  let objKeys = Object.keys(timeObj).slice(1);
  let customKeys = Object.keys(timeKeys);
  let toFix : number[][] = [];
  for (let i = 0; i < (Math.ceil(Object.keys(timeKeys).length / 2)); i++) {
    if (objKeys[i] !== customKeys[i]) {
      toFix.push([objKeys.indexOf(objKeys[i]), objKeys.indexOf(customKeys[i])])
    }
  }
  let toMap = Object.values(timeObj);
  for (let i = 0; i < toFix.length; i++) {
    swap(toMap, toFix[i][0]+2, toFix[i][1]+2);
  }
  let timeStr = toMap.map((key, val) => {
    if(val === 0) {
      return "";
    }
    let idx = timeKeys[Object.keys(timeObj)[val]]
    if (store.timelineOpt && 
      store.timelineOpt[idx][Object.keys(store.timelineOpt[idx])[0]]) {
      if(typeof(key) !== "object") {
        return key.toString() + ",";
      } else {
        let retStr = ["0-10", "10-20", "20-30", "30-end"]
        .map((sub_key: string, _sub_val: any) => {
          if(key[sub_key] === -1) {
            return ""
          }
          return key[sub_key].toString()
        })
        return retStr.join(',') + ",";
      }
    }
    return "";
  });
  return (gameStr.join('') + pre.join('') + accountStr.join('') +
    statStr.join('') + timeStr.join('')).slice(0, -1);
}

function formatHeader(value: PlayerData, meta: Metadata, store: optState) {
  let accountObj : PlayerAccount["player"] = value.account.player;
  let statObj : Stats = value.stats;
  let timeObj : Timeline = value.timeline;

  let genKeys : {[key: string] : number} = { };
  if(store.generalOpt) {
    for(let i = 0; i < Object.keys(store.generalOpt).length; i++) {
      genKeys[Object.keys(store.generalOpt[i])[0]] = i
    }
  }
  let accKeys : {[key: string] : number} = { };
  if(store.accountOpt) {
    for(let i = 0; i < Object.keys(store.accountOpt).length; i++) {
      accKeys[Object.keys(store.accountOpt[i])[0]] = i
    }
  }
  let timeKeys : { [key: string] : number; } = { };
  if(store.timelineOpt) {
    for(let i = 0; i < Object.keys(store.timelineOpt).length; i++) {
      let idx = Object.keys(timeObj).indexOf(Object.keys(store.timelineOpt[i])[0])-1;
      timeKeys[Object.keys(store.timelineOpt[i])[0]] = idx
    }
  }
  let gameStr = Object.keys(meta).map((key, val) => {
    if (store.gameOpt && 
      store.gameOpt[val][key]) {
      return key.toString() + ",";
    }
    return "";
  })
  let pre = Object.keys(value).map((key, val) => {
    if(typeof(key) !== "object" && Object.keys(genKeys).includes(key) 
      && store.generalOpt && store.generalOpt[genKeys[key]][key]) {
      return key.toString() + ",";
    }
    return "";
  })
  let accountStr = Object.keys(accountObj).map((key, val) => {
    if (store.accountOpt && 
      Object.values(store.accountOpt[accKeys[Object.keys(accountObj)[val]]])[0]) {
      // Fix line above later
      return key.toString() + ",";
    }
    return "";
  });
  let statStr = Object.keys(statObj).map((key, val) => {
    if(val === 0) {
      return "";
    }
    
    if (store.statOpt && store.statOpt[val-1][Object.keys(statObj)[val]]) {
      return key.toString() + ",";
    }
    return "";
  });
  let objKeys = Object.keys(timeObj).slice(1);
  let customKeys = Object.keys(timeKeys);
  let toFix : number[][] = [];
  for (let i = 0; i < (Math.ceil(Object.keys(timeKeys).length / 2)); i++) {
    if (objKeys[i] !== customKeys[i]) {
      toFix.push([objKeys.indexOf(objKeys[i]), objKeys.indexOf(customKeys[i])])
    }
  }
  let toMap = Object.values(timeObj);
  let toKey = Object.keys(timeObj);
  for (let i = 0; i < toFix.length; i++) {
    swap(toMap, toFix[i][0]+2, toFix[i][1]+2);
    swap(toKey, toFix[i][0]+2, toFix[i][1]+2);
  }
  let timeStr = toMap.map((key, val) => {
    if(val === 0) {
      return "";
    }
    let idx = timeKeys[Object.keys(timeObj)[val]]
    if (store.timelineOpt && 
      store.timelineOpt[idx][Object.keys(store.timelineOpt[idx])[0]]) {
      if(typeof(key) !== "object") {
        return toKey[val] + ",";
      } else {
        let retStr = ["0-10", "10-20", "20-30", "30-end"]
        .map((sub_key: string, _sub_val: any) => {
          return toKey[val] + sub_key
        })
        return retStr.join(',') + ",";
      }
    }
    return "";
  });
  return (gameStr.join('') + pre.join('') + accountStr.join('') + 
  statStr.join('') + timeStr.join('')).slice(0, -1);
}

function CSVComponent(props: CSVProps) {
  const didLoad = useSelector((state: RootState) => state.main);
  const opt = useSelector((state: RootState) => state.opt);
  return (
    <Alert show={true} variant="dark" className="csv-alert">
      <Alert.Heading>{props.headless ? "CSV (Headless)" : "CSV"}</Alert.Heading>
      <div className="csv-raw-format">
        {props.headless ? "" : <span>{didLoad.red ? formatHeader(didLoad.red[0], didLoad.meta, opt) : "ERROR"} <br /></span>}
        {didLoad.red ? didLoad.red.map((value: PlayerData, idx: number) => 
          <span key={idx}>{formatLine(value, didLoad.meta, opt)} <br /></span>) : <span></span>}
        {didLoad.blue ? didLoad.blue.map((value: PlayerData, idx: number) => 
          <span key={idx}>{formatLine(value, didLoad.meta, opt)} <br /></span>) : <span></span>}
      </div>
    </Alert>
  );
}

export default CSVComponent;