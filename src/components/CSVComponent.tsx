import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from "react-redux"

import '../style/CSVComponent.css';

interface CSVProps {
  headless: boolean;
}

function formatLine(value: PlayerData, sub: string[]) {
  let pre = Object.values(value).map((key, val) => {
    if(typeof(key) !== "object") {
      if (sub.includes(Object.keys(value)[val].toString())) {
        return key.toString() + ",";
      }
    }
    return "";
  })
  let statObj : Stats = value.stats;
  let statStr = Object.values(statObj).map((key, val) => {
    if (sub.includes(Object.keys(statObj)[val].toString())) {
      return key.toString() + ",";
    }
    return "";
  });
  return (value.participantId.toString() + "," + pre.join('') + 
    statStr.join('')).slice(0, -1);
}

function formatHeader(value: PlayerData, sub: string[]) {
  let pre = Object.keys(value).map((key, val) => {
    if(typeof(key) !== "object") {
      if (sub.includes(Object.keys(value)[val].toString())) {
        return key.toString() + ",";
      }
    }
    return "";
  })
  let statObj : Stats = value.stats;
  let statStr = Object.keys(statObj).map((key, val) => {
    if (sub.includes(Object.keys(statObj)[val].toString())) {
      // console.log(key, value)
      return key.toString() + ",";
    }
    return "";
  });
  return ("participantId," + pre.join('') + statStr.join('')).slice(0, -1);
}

function CSVComponent(props: CSVProps) {
  const didLoad = useSelector((state: gameState) => state);
  const preset = didLoad.preset;
  console.log(preset);
  return (
    <Alert show={true} variant="dark" className="csv-alert">
      <Alert.Heading>{props.headless ? "CSV (Headless)" : "CSV"}</Alert.Heading>
      <div className="csv-raw-format">
        {props.headless ? "" : <span>{didLoad.red ? formatHeader(didLoad.red[0], (preset ? preset : [])) : "ERROR"} <br /></span>}
        {didLoad.red ? didLoad.red.map((value: PlayerData, idx: number) => 
          <span key={idx}>{formatLine(value, (preset ? preset : []))} <br /></span>) : <span></span>}
        {didLoad.blue ? didLoad.blue.map((value: PlayerData, idx: number) => 
          <span key={idx}>{formatLine(value, (preset ? preset : []))} <br /></span>) : <span></span>}
      </div>
    </Alert>
  );
}

export default CSVComponent;