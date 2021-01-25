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

function formatLine(value: PlayerData, store: optState) {
  let statObj : Stats = value.stats;
  let timeObj : Timeline = value.timeline;

  let genKeys : {[key: string] : number} = { };
  if(store.generalOpt) {
    for(let i = 0; i < Object.keys(store.generalOpt).length; i++) {
      genKeys[Object.keys(store.generalOpt[i])[0]] = i
    }
  }
  let statKeys : {[key: string] : number} = { };
  if(store.statOpt) {
    for(let i = 0; i < Object.keys(store.statOpt).length; i++) {
      statKeys[Object.keys(store.statOpt[i])[0]] = i
    }
  }
  let timeKeys : { [key: string] : number; } = { };
  if(store.timelineOpt) {
    for(let i = 0; i < Object.keys(store.timelineOpt).length; i++) {
      let idx = Object.keys(timeObj).indexOf(Object.keys(store.timelineOpt[i])[0])-1;
      timeKeys[Object.keys(store.timelineOpt[i])[0]] = idx
    }
  }
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
        let retStr = Object.keys(key).map((sub_key: string, _sub_val: any) => {
          // console.log(key[sub_key])
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
  return (pre.join('') + 
    statStr.join('') + timeStr.join('')).slice(0, -1);
}

function formatHeader(value: PlayerData, store: optState) {
  let statObj : Stats = value.stats;

  let genKeys : {[key: string] : number} = { };
  if(store.generalOpt) {
    for(let i = 0; i < Object.keys(store.generalOpt).length; i++) {
      genKeys[Object.keys(store.generalOpt[i])[0]] = i
    }
  }
  let pre = Object.keys(value).map((key, val) => {
    if(typeof(key) !== "object" && Object.keys(genKeys).includes(key) 
      && store.generalOpt && store.generalOpt[genKeys[key]][key]) {
      return key.toString() + ",";
    }
    return "";
  })
  let statStr = Object.keys(statObj).map((key, val) => {
    if(val === 0) {
      return "";
    }
    
    if (store.statOpt && store.statOpt[val-1][Object.keys(statObj)[val]]) {
      return key.toString() + ",";
    }
    return "";
  });
  return (pre.join('') + statStr.join('')).slice(0, -1);
}

function CSVComponent(props: CSVProps) {
  const didLoad = useSelector((state: RootState) => state.main);
  const opt = useSelector((state: RootState) => state.opt);
  return (
    <Alert show={true} variant="dark" className="csv-alert">
      <Alert.Heading>{props.headless ? "CSV (Headless)" : "CSV"}</Alert.Heading>
      <div className="csv-raw-format">
        {props.headless ? "" : <span>{didLoad.red ? formatHeader(didLoad.red[0], opt) : "ERROR"} <br /></span>}
        {didLoad.red ? didLoad.red.map((value: PlayerData, idx: number) => 
          <span key={idx}>{formatLine(value, opt)} <br /></span>) : <span></span>}
        {didLoad.blue ? didLoad.blue.map((value: PlayerData, idx: number) => 
          <span key={idx}>{formatLine(value, opt)} <br /></span>) : <span></span>}
      </div>
    </Alert>
  );
}

export default CSVComponent;