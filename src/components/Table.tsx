import React from 'react';
import { Image } from 'react-bootstrap';
import { RiCoinsLine } from "react-icons/ri";
import BootstrapTable from 'react-bootstrap-table-next';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

import { updateRedPlayers, updateBluePlayers } from '../store/actionCreators';
import { Constants } from './Constants';

import top from'../img/Position_Challenger-Top.png';
import jg from'../img/Position_Challenger-Jungle.png';
import mid from'../img/Position_Challenger-Mid.png';
import bot from'../img/Position_Challenger-Bot.png';
import supp from'../img/Position_Challenger-Support.png';

import { RootState } from "../store/rootReducer";

import '../style/Table.css';

var itemMap = require('../item.json').data;

const champImageDir = importAll(require.context('../img/champion/', false));
const itemImageDir = importAll(require.context('../img/item/', false));

type TableProps = {
  side: string
}

let itemTransform : {[key: string] : number} = { };
for (let itemNugget in itemMap) {
  itemTransform[itemMap[itemNugget]["name"]] = parseInt(itemNugget)
}

const imageMapper : {[key: string] : any} = {
  "TOP" : top,
  "JUNGLE" : jg,
  "MIDDLE" : mid,
  "BOTTOM": bot,
  "SUPPORT": supp
}

function importAll(r: any) {
  let images : any = {};
  r.keys().forEach((item: any, _index: any) => { images[item.replace('./', '')] = r(item); });
  return images;
}

function roleBlueFormatter(_cell: any, row: any) {
  let image = imageMapper[row["bpos"]]
  return (
    (Object.keys(imageMapper).includes(row["bpos"])) ? 
    <Image src={image} alt={row["bpos"]}/> : <span>NONE</span>
  );
}

function roleRedFormatter(_cell: any, row: any) {
  let image = imageMapper[row["rpos"]]
  return (
    (Object.keys(imageMapper).includes(row["rpos"])) ? 
    <Image src={image} alt={row["rpos"]}/> : <span>NONE</span>
  );
}

function champBanFormatter(_cell: any, row: any) {
  let selector = (row["rban"] === undefined) ? row["bban"] : row["rban"]
  const path = selector + "_0.jpg";
  return (
    (Object.keys(champImageDir).includes(path)) ? 
      <img src={champImageDir[path].default} alt={path}/> : 
      <div className="placeholder"> &#8856; </div>
  );
}

function champPickFormatter(_cell: any, row: any) {
  let selector = (row["rpick"] === undefined) ? row["bpick"] : row["rpick"]
  const path = selector + "_0.jpg";
  return (
    (Object.keys(champImageDir).includes(path)) ? 
      <img src={champImageDir[path].default} alt={path}/> : 
      <div className="placeholder"> &#8856; </div>
  );
}

function itemFormatter(_cell: any, row: any) {
  let selector = (row["ritems"] === undefined) ? row["bitems"] : row["ritems"];
  let convertedData = selector.split(",");
  convertedData = convertedData.map((val: string) => {
    if(val === "") {
      return -1
    }
    if (Object.keys(itemTransform).includes(val)) {
      return itemTransform[val]
    } else {
      return -2
    }
  })
  return (
  <div className="item-holder">
    {convertedData.map((val: number, idx: any) => {
      if (val === -1) {
        return (<div className="placeholder" key={idx}> &#8856; </div>)
      }
      if (val === -2) {
        return (<div className="placeholder" key={idx}> &#63; </div>)
      }
      const path = val + ".png";
      return <img src={itemImageDir[path].default} alt={path} key={idx}/>
    })}
  </div>)
}

const formatWithIcon = () => {
  return(
      <RiCoinsLine />
  );
}

const toEdit = cellEditFactory({
  mode: 'click',
  blurToSave: true,
});

const onBlueChange = (_type: any, newState: any, 
    base: gameState, dispatch: Dispatch) => {
  switch(newState.cellEdit.dataField) {
    case "bpos":
      base.blue[parseInt(newState.cellEdit.rowId)-1].timeline.lane = 
        newState.cellEdit.newValue;
      base.blue[parseInt(newState.cellEdit.rowId)-1].timeline.role = 
        Constants.COL_ROLE_MAP[newState.cellEdit.newValue];
      break;
    case "bname":
      base.blue[parseInt(newState.cellEdit.rowId)-1].account.player.summonerName = 
        newState.cellEdit.newValue;
      break;
  }
  const toUpdate : gameState = {
    blue: base.blue,
    red: base.red,
    blueTeam: base.blueTeam,
    redTeam: base.redTeam,
    meta: base.meta,
    raw: base.raw,
    onView: false
  }
  dispatch(updateBluePlayers(toUpdate));
};

const onRedChange = (_type: any, newState: any,
  base: gameState, dispatch: Dispatch) => {
  switch(newState.cellEdit.dataField) {
    case "rpos":
      base.red[parseInt(newState.cellEdit.rowId)-(base.red.length+1)].timeline.lane =
        newState.cellEdit.newValue;
      base.red[parseInt(newState.cellEdit.rowId)-(base.red.length+1)].timeline.role =
        Constants.COL_ROLE_MAP[newState.cellEdit.newValue];
      break;
    case "rname":
      base.red[parseInt(newState.cellEdit.rowId)-(base.red.length+1)].account.player.summonerName =
        newState.cellEdit.newValue;
      break;
  }
  const toUpdate: gameState = {
    blue: base.blue,
    red: base.red,
    blueTeam: base.blueTeam,
    redTeam: base.redTeam,
    meta: base.meta,
    raw: base.raw,
    onView: false
  }
  dispatch(updateRedPlayers(toUpdate));
};

function formatKDA(Player: PlayerData) {
  let kills = Player.stats.kills.toString();
  let deaths = Player.stats.deaths.toString();
  let assists = Player.stats.assists.toString();
  return kills + " / " + deaths + " / " + assists;
}

let blueColumns = [{
  dataField: 'bname',
  text: 'TEAM 2',
  headerClasses: 'blue-header',
  classes: 'blue-cell edit'
}, {
  dataField: 'bpos',
  text: 'Role',
  headerClasses: 'blue-header center loader-pos',
  classes: 'blue-cell center img-wrapper edit',
  editor: {
    type: Type.SELECT,
    getOptions: (_setOptions : any, _vals: blueData) => {
      return Constants.ROLE_OPTIONS;
    }
  },
  formatter: roleBlueFormatter,
  editCellClasses: 'blue-cell'
}, {
  dataField: 'bpick',
  text: 'Pick',
  headerClasses: 'blue-header center loader-pick',
  classes: 'blue-cell center champ',
  formatter: champPickFormatter,
  editable: false
}, {
  dataField: 'bkda',
  text: 'K/D/A',
  headerClasses: 'blue-header center loader-kda',
  classes: 'blue-cell center',
  editable: false
}, {
  dataField: 'bitems',
  text: 'Items',
  headerClasses: 'blue-header',
  classes: 'blue-cell center item',
  formatter: itemFormatter,
  editable: false
}, {
  dataField: 'bcs',
  text: 'CS',
  headerClasses: 'blue-header center loader-cs',
  classes: 'blue-cell center',
  editable: false
}, {
  dataField: 'bgold',
  text: "",
  headerClasses: 'blue-header center loader-gold',
  classes: 'blue-cell center',
  headerFormatter: formatWithIcon,
  editable: false
}, {
  dataField: 'bban',
  text: 'Ban',
  headerClasses: 'blue-header center loader-ban',
  classes: 'blue-cell center champ',
  formatter: champBanFormatter,
  editable: false
}];

let redColumns = [{
  dataField: 'rname',
  text: 'TEAM 1',
  headerClasses: 'red-header',
  classes: 'red-cell edit',
  editable: true
}, {
  dataField: 'rpos',
  text: 'Role',
  headerClasses: 'red-header center loader-pos',
  classes: 'red-cell center img-wrapper edit',
  editor: {
    type: Type.SELECT,
    getOptions: (_setOptions : any, _vals: redData) => {
      return Constants.ROLE_OPTIONS;
    }
  },
  formatter: roleRedFormatter,
  editCellClasses: 'red-cell'
}, {
  dataField: 'rpick',
  text: 'Pick',
  headerClasses: 'red-header center loader-pick',
  classes: 'red-cell center champ',
  formatter: champPickFormatter,
  editable: false
}, {
  dataField: 'rkda',
  text: 'K/D/A',
  headerClasses: 'red-header center loader-kda',
  classes: 'red-cell center',
  editable: false
}, {
  dataField: 'ritems',
  text: 'Items',
  headerClasses: 'red-header',
  classes: 'red-cell center item',
  formatter: itemFormatter,
  editable: false
}, {
  dataField: 'rcs',
  text: 'CS',
  headerClasses: 'red-header center loader-cs',
  classes: 'red-cell center',
  editable: false
}, {
  dataField: 'rgold',
  text: "",
  headerClasses: 'red-header center loader-gold',
  classes: 'red-cell center',
  editable: false,
  headerFormatter: formatWithIcon
}, {
  dataField: 'rban',
  text: 'Ban',
  headerClasses: 'red-header center loader-ban',
  editable: false,
  formatter: champBanFormatter,
  classes: 'red-cell center champ'
}];

function Table({side} : TableProps) {
  const dispatch: Dispatch<any> = useDispatch();
  let raw = useSelector((state: RootState) => state.main);
  redColumns[0]["text"] = raw.redTeam.teamName;
  blueColumns[0]["text"] = raw.blueTeam.teamName;
  const blueData: blueData[] = useSelector((state: RootState) => state.main.blue)
    .map((Player: PlayerData) => {
    return {
      bid: Player.participantId.toString(), 
      bname: Player.account.player.summonerName,
      bpos: Player.timeline.lane,
      bpick: Player.championId,
      bkda: formatKDA(Player),
      bitems: [Player.stats.item0, Player.stats.item1, Player.stats.item2, 
        Player.stats.item3, Player.stats.item4, Player.stats.item5, 
        Player.stats.item6].join(','),
      bcs: (Player.stats.totalMinionsKilled + 
        Player.stats.neutralMinionsKilled).toString(), 
      bgold: Player.stats.goldEarned.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      bban: Player.banChampionId
    }
  });
  const redData: redData[] = useSelector((state: RootState) => state.main.red)
    .map((Player: PlayerData) => {
    return {
      rid: Player.participantId.toString(), 
      rname: Player.account.player.summonerName,
      rpos: Player.timeline.lane,
      rpick: Player.championId,
      rkda: formatKDA(Player),
      ritems: [Player.stats.item0, Player.stats.item1, Player.stats.item2, 
      Player.stats.item3, Player.stats.item4, Player.stats.item5, 
      Player.stats.item6].join(','),
      rcs: (Player.stats.totalMinionsKilled + 
        Player.stats.neutralMinionsKilled).toString(), 
      rgold: Player.stats.goldEarned.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      rban: Player.banChampionId
    }
  });
  return (
    side === "red" ? 
      <BootstrapTable 
        keyField='rid' 
        data={ redData } 
        columns={ redColumns } 
        cellEdit={ toEdit }
        remote={ {
          cellEdit: true
        } }
        onTableChange={(type: any, newState: any) => {
          onRedChange(type, newState, raw, dispatch)
        }}/> : 
      <BootstrapTable 
        keyField='bid' 
        data={ blueData } 
        columns={ blueColumns } 
        cellEdit={ toEdit }
        remote={ {
          cellEdit: true
        } }
        onTableChange={(type: any, newState: any) => {
          onBlueChange(type, newState, raw, dispatch)
        }}/>
      
  );
}

export default Table;