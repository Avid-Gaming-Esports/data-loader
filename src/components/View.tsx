import React from 'react';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { Button, Container, Modal, Image } from 'react-bootstrap';
import { useSelector } from "react-redux"

import '../style/View.css';

import Metadata from './Metadata';
import Search from './Search';
import Table from './Table';

import Selector from './Selector';
import JSONComponent from './JSONComponent';
import CSVComponent from './CSVComponent';

import { RootState } from "../store/rootReducer";

import { updateScreen, updateHelp } from '../store/actionCreators';

import info1 from'../img/raw1.png';
import info2 from'../img/raw2.png';
import info3 from'../img/raw3.png';
import info4 from'../img/raw4.png';
import info5 from'../img/raw5.png';

function renderOutputTypes(target: string, component: JSX.Element, outputArr?: {[key: string] : boolean}) {
  return outputArr ? (outputArr[target] ? component : <div></div>) : <div></div>
}

function View() {
  const dispatch: Dispatch<any> = useDispatch();
  const didLoad = useSelector((state: RootState) => state.main);
  const opt = useSelector((state: RootState) => state.opt);
  const handleShow = () => dispatch(updateHelp({
    ...didLoad,
    help: true
  }));
  const handleClose = () => dispatch(updateHelp({
    ...didLoad,
    help: false
  }));
  return (
    <Container>
        {didLoad.onView ? 
        (<div className="main-view">
          <Selector />
          {renderOutputTypes("JSON", 
            <JSONComponent />, opt.outputTypes)}
          {renderOutputTypes("CSV", 
            <CSVComponent headless={false} />, opt.outputTypes)}
          {renderOutputTypes("CSV-Headless", 
            <CSVComponent headless={true} />, opt.outputTypes)}
          <Button variant="secondary" 
                  onClick={(_e) => { dispatch(updateScreen({
                    blue: didLoad.blue,
                    red: didLoad.red,
                    blueTeam: didLoad.blueTeam,
                    redTeam: didLoad.redTeam,
                    raw: didLoad.raw,
                    meta: didLoad.meta,
                    onView: false
                  }))}}>
                  Go Back
          </Button>
        </div>) : 
        (<div className="main-view">
        <Search />
        <Metadata />
        <Table side="red" />
        <Table side="blue" />
        <Button variant="primary" 
                disabled={didLoad.raw === JSON.stringify("")}
                onClick={(_e) => { dispatch(updateScreen({
                  blue: didLoad.blue,
                  red: didLoad.red,
                  blueTeam: didLoad.blueTeam,
                  redTeam: didLoad.redTeam,
                  raw: didLoad.raw,
                  meta: didLoad.meta,
                  onView: true
                }))}}>
                Generate Data
        </Button>
        </div>)}
        <p className="help" onClick={handleShow}>Help</p>
        <p className="discloser">Data-Loader isn’t endorsed by Riot Games and doesn’t reflect the 
          views or opinions of Riot Games or anyone officially involved in 
          producing or managing League of Legends. League of Legends and Riot 
          Games are trademarks or registered trademarks of Riot Games, Inc. 
          League of Legends © Riot Games, Inc.</p>
        
      <Modal show={didLoad.help} onHide={handleClose}
        dialogClassName="modal-60w">
        <Modal.Header closeButton>
          Loading Match
        </Modal.Header>
        <Modal.Body> 
            <p>To load a game, you need to input the game's GameID into the search bar at the top of the site.
              The GameID of a match can be pulled from the ingame client or Riot's match 
              history website, but both require the player to have been in the match. </p>
          <div className="modal-section">
            <p><b>Client</b></p>
            <Image src={info1} alt={"info1"} width={"80%"} style={{"margin" : "auto"}}/>
            <br />
          </div>
          <div className="modal-section">
          <p><b>Website</b></p>
          <Image src={info2} alt={"info1"} width={"80%"} style={{"margin" : "auto"}}/>
          </div>
        </Modal.Body>
        <Modal.Header>
          Editing Match
        </Modal.Header>
        <Modal.Body> 
          <p>Use this tool to fix and add information that is relevant to you. For example,
            for scrim data (Custom Games) you can add summoner and team names. You can also fix champion roles. </p>
          <div className="modal-section">
            <div style={{"display" : "flex", "justifyContent": "space-around"}}><p><b>Before</b></p><p><b>After</b></p></div>
            <div style={{"display" : "flex", "justifyContent": "space-around"}}>
            <Image src={info3} alt={"info3"} width={"50%"} style={{"margin" : "auto"}}/>
            <Image src={info4} alt={"info4"} width={"50%"} style={{"margin" : "auto"}}/>
            </div>
            <br />
          </div>
          <div className="modal-section">
          <p><b>CSV Output (Fixed)</b></p>
            <Image src={info5} alt={"info5"} width={"90%"} style={{"margin" : "auto"}}/>
          </div>
        </Modal.Body>
        <Modal.Footer style={{"justifyContent" : "center"}}>
          <Button variant="secondary" 
                  onClick={handleClose}>
                  Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default View;