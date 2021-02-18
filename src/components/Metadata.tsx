import React, { useState } from 'react';
import { Accordion, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { updateTeamNames } from '../store/actionCreators';

import { RootState } from "../store/rootReducer";

import '../style/Metadata.css';
import { Constants } from './Constants';

function updateTeamName(rTeam: TeamData, bTeam: TeamData, 
  base: gameState, dispatch: Dispatch) {
    const toUpdate : gameState = {
      blue: base.blue,
      red: base.red,
      blueTeam: bTeam,
      redTeam: rTeam,
      meta: base.meta,
      raw: base.raw,
      onView: false
    }
    dispatch(updateTeamNames(toUpdate));
}

function Metadata() {
  const md : Metadata = useSelector((state: RootState) => state.main.meta);
  const base : gameState = useSelector((state: RootState) => state.main);
  const rTeam : TeamData = useSelector((state: RootState) => state.main.redTeam);
  const bTeam : TeamData = useSelector((state: RootState) => state.main.blueTeam);
  const [metaExpander, setMetaExpander] = useState("+");
  const keys = Object.keys(md);
  const dispatch: Dispatch<any> = useDispatch();
  return (
  <Accordion className="metadata">
    <Card>
      <Accordion as={Card.Header}>
        <Card className="group-by">
          Game
          <Accordion.Toggle 
          as={Card} 
          eventKey="0" 
          className="group-by-expander"
          onClick={(_e) => {
              if (metaExpander === "+"){
                setMetaExpander("-");
              } else {
                setMetaExpander("+");
              }
            }}>
              {metaExpander}
          </Accordion.Toggle>
        </Card>
        <Accordion.Collapse eventKey="0" >
        <div>
        <br />
        <Form.Group className="md-group">
          {Object.values(md).map((sub_key, sub_val) => {
            // console.log(sub_key.toString())
            return (
            <div 
            key={"metaID" + sub_val}>
              {Constants.METADATA_EDIT_MAP[keys[sub_val]] ? (
              <div>
            <Form.Label>{keys[sub_val]}</Form.Label>
            <Form.Control
              as="textarea"
              value={sub_key.toString()}
              id={"metaOption" + sub_val.toString()}
              disabled={!Constants.METADATA_EDIT_MAP[keys[sub_val]]}
              onChange={(e) => {
                // TODO
                // console.log(e.target.value);
              }}
            /></div>) : <div><Form.Label>{keys[sub_val]}</Form.Label>
            <Form.Control
              as="textarea"
              value={sub_key.toString()}
              id={"metaOption" + sub_val.toString()}
              disabled={true}
            /></div> }
            </div>)
          })}
          <div>
            <Form.Label>redTeamName</Form.Label>
            <Form.Control
              as="textarea"
              value={rTeam.teamName}
              id={"teamNameRed"}
              onChange={(e) => {
                rTeam.teamName = e.target.value;
                updateTeamName(rTeam, bTeam, base, dispatch);
              }}
            />
          </div>
          <div>
            <Form.Label>blueTeamName</Form.Label>
            <Form.Control
              as="textarea"
              value={bTeam.teamName}
              id={"teamNameRed"}
              onChange={(e) => {
                bTeam.teamName = e.target.value;
                updateTeamName(rTeam, bTeam, base, dispatch);
              }}
            />
          </div>
          </Form.Group>
        </div>
        </Accordion.Collapse>
      </Accordion>
    </Card>
  </Accordion>
  );
}

export default Metadata;