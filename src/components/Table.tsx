import React from 'react';
import { RiCoinsLine } from "react-icons/ri";
import BootstrapTable from 'react-bootstrap-table-next';
import { useSelector } from "react-redux"
// import Ddragon from 'ddragon';
// import axios from 'axios';

// import top from'../img/Position_Challenger-Top.png';
// import jg from'../img/Position_Challenger-Jungle.png';
// import mid from'../img/Position_Challenger-Mid.png';
// import bot from'../img/Position_Challenger-Bot.png';
// import supp from'../img/Position_Challenger-Support.png';

import { RootState } from "../store/rootReducer";

import '../style/Table.css';

type TableProps = {
  side: string
}

// const lol = require('leagueoflegends-js');
// // const champion = require('champion');
// const datadragon = new lol.DataDragon("11.1.1")
// var json = require('../champions.json');
// const dd = new Ddragon();

const formatWithIcon = () => {
  return(
      <RiCoinsLine />
  );
}

function formatKDA(Player: PlayerData) {
  let kills = Player.stats.kills.toString();
  let deaths = Player.stats.deaths.toString();
  let assists = Player.stats.assists.toString();
  return kills + "/" + deaths + "/" + assists;
}

const blueColumns = [{
  dataField: 'bid',
  text: 'TEAM 2',
  headerClasses: 'blue-header',
  classes: 'blue-cell'
}, {
  dataField: 'bpos',
  text: 'Role',
  headerClasses: 'blue-header center loader-pos',
  classes: 'blue-cell center img-wrapper'
}, {
  dataField: 'bpick',
  text: 'Pick',
  headerClasses: 'blue-header center loader-pick',
  classes: 'blue-cell center'
}, {
  dataField: 'bkda',
  text: 'K/D/A',
  headerClasses: 'blue-header center loader-kda',
  classes: 'blue-cell center'
}, {
  dataField: 'bitems',
  text: 'Items',
  headerClasses: 'blue-header',
  classes: 'blue-cell'
}, {
  dataField: 'bcs',
  text: 'CS',
  headerClasses: 'blue-header center loader-cs',
  classes: 'blue-cell center'
}, {
  dataField: 'bgold',
  text: "",
  headerClasses: 'blue-header center loader-gold',
  classes: 'blue-cell center',
  headerFormatter: formatWithIcon
}, {
  dataField: 'bban',
  text: 'Ban',
  headerClasses: 'blue-header center loader-ban',
  classes: 'blue-cell center'
}];


const redColumns = [{
  dataField: 'rid',
  text: 'TEAM 1',
  headerClasses: 'red-header',
  classes: 'red-cell'
}, {
  dataField: 'rpos',
  text: 'Role',
  headerClasses: 'red-header center loader-pos',
  classes: 'red-cell center img-wrapper'
}, {
  dataField: 'rpick',
  text: 'Pick',
  headerClasses: 'red-header center loader-pick',
  classes: 'red-cell center'
}, {
  dataField: 'rkda',
  text: 'K/D/A',
  headerClasses: 'red-header center loader-kda',
  classes: 'red-cell center'
}, {
  dataField: 'ritems',
  text: 'Items',
  headerClasses: 'red-header',
  classes: 'red-cell'
}, {
  dataField: 'rcs',
  text: 'CS',
  headerClasses: 'red-header center loader-cs',
  classes: 'red-cell center'
}, {
  dataField: 'rgold',
  text: "",
  headerClasses: 'red-header center loader-gold',
  classes: 'red-cell center',
  headerFormatter: formatWithIcon
}, {
  dataField: 'rban',
  text: 'Ban',
  headerClasses: 'red-header center loader-ban',
  classes: 'red-cell center'
}];

function Table({side} : TableProps) {
  // axios.get('https://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US/champion.json').then((res) => {
  //   console.log(res.data.data)
  // })
  // console.log(dd.data.champions());
  // console.log(json);
  const blueData: blueData[] = useSelector((state: RootState) => state.main.blue)
    .map((Player: PlayerData) => {
    return {
      bid: Player.participantId.toString(), 
      bpos: Player.timeline.lane,
      bpick: Player.championId,
      bkda: formatKDA(Player),
      bitems: Player.stats.item0.toString(),
      bcs: (Player.stats.totalMinionsKilled + 
        Player.stats.neutralMinionsKilled).toString(), 
      bgold: Player.stats.goldEarned.toString()
    }
  });
  const redData: redData[] = useSelector((state: RootState) => state.main.red)
    .map((Player: PlayerData) => {
      console.log(Player.championId)
    return {
      rid: Player.participantId.toString(), 
      rpos: Player.timeline.lane,
      rpick: Player.championId,
      rkda: formatKDA(Player),
      ritems: Player.stats.item0.toString(),
      rcs: (Player.stats.totalMinionsKilled + 
        Player.stats.neutralMinionsKilled).toString(), 
      rgold: Player.stats.goldEarned.toString()
    }
  });
  console.log(blueData)
  console.log(redData)
  return (
    side === "red" ? <BootstrapTable keyField='rid' data={ redData } columns={ redColumns } /> : 
    <BootstrapTable keyField='bid' data={ blueData } columns={ blueColumns } />
      
  );
}

export default Table;