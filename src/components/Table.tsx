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

type TableProps = {
  side: string
}

const imageMapper : {[key: string] : any} = {
  "TOP" : top,
  "JUNGLE" : jg,
  "MIDDLE" : mid,
  "BOTTOM": bot,
  "SUPPORT": supp
}

function roleBlueFormatter(_cell: any, row: any) {
  let image = imageMapper[row["bpos"]]
  return (
    <Image src={image} />
  );
}

function roleRedFormatter(_cell: any, row: any) {
  let image = imageMapper[row["rpos"]]
  return (
    <Image src={image} />
  );
}

// function pickBlueFormatter(_cell: any, row: any) {
//   let image = require('../img/champion/' + row["bpick"] + "_0.jpg")
//   console.log(image);
//   return (
//     <Image src={image} />
//   );
// }
// function pickRedFormatter(_cell: any, row: any) {
//   let image = imageMapper[row["rpos"]]
//   return (
//     <Image src={image} />
//   );
// }

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
  return kills + "/" + deaths + "/" + assists;
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
      return [{
        value: 'TOP',
        label: 'TOP'
      }, {
        value: 'JUNGLE',
        label: 'JUNGLE'
      }, {
        value: 'MIDDLE',
        label: 'MIDDLE'
      }, {
        value: 'BOTTOM',
        label: 'BOTTOM'
      }, {
        value: 'SUPPORT',
        label: 'SUPPORT'
      }];
    }
  },
  formatter: roleBlueFormatter,
  editCellClasses: 'blue-cell'
}, {
  dataField: 'bpick',
  text: 'Pick',
  headerClasses: 'blue-header center loader-pick',
  classes: 'blue-cell center',
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
  classes: 'blue-cell',
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
  classes: 'blue-cell center',
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
      return [{
        value: 'TOP',
        label: 'TOP'
      }, {
        value: 'JUNGLE',
        label: 'JUNGLE'
      }, {
        value: 'MIDDLE',
        label: 'MIDDLE'
      }, {
        value: 'BOTTOM',
        label: 'BOTTOM'
      }, {
        value: 'SUPPORT',
        label: 'SUPPORT'
      }];
    }
  },
  formatter: roleRedFormatter,
  editCellClasses: 'red-cell'
}, {
  dataField: 'rpick',
  text: 'Pick',
  headerClasses: 'red-header center loader-pick',
  classes: 'red-cell center',
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
  classes: 'red-cell',
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
  classes: 'red-cell center'
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
        Player.stats.item6].filter((val) => (val !== "")).join(', '),
      bcs: (Player.stats.totalMinionsKilled + 
        Player.stats.neutralMinionsKilled).toString(), 
      bgold: Player.stats.goldEarned.toString(),
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
      Player.stats.item6].filter((val) => (val !== "")).join(', '),
      rcs: (Player.stats.totalMinionsKilled + 
        Player.stats.neutralMinionsKilled).toString(), 
      rgold: Player.stats.goldEarned.toString(),
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