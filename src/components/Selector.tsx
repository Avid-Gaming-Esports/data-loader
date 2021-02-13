import React, { useState } from 'react';
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { Accordion, Card, Form } from 'react-bootstrap';

import { Constants } from './Constants';

import { RootState } from "../store/rootReducer";

import '../style/Selector.css';

import { changePreset, changeSelectors, toggleOutput } from '../store/actionCreators';

function handleChangePreset(dispatch: Dispatch<any>, target: string) {
  dispatch(changePreset({
    preset: Constants.PRESET_ARRAYS[target]
  }))
}

function handleChangeSelectors(dispatch: Dispatch<any>, store: optState) {
  dispatch(changeSelectors({
    statOpt: store.statOpt
  }))
}

function handleToggleOutput(store: optState, dispatch: Dispatch<any>, target: string) {
  let outputDict: {[key: string] : boolean} | undefined = 
  store.outputTypes;
  if(outputDict) {
    outputDict[target] = !outputDict[target]
  }
  dispatch(toggleOutput({
    outputTypes: outputDict
  }))
}

function isSubsetChecked(target?: { [key: string]: boolean; }[] | undefined){
  return (target?.map((key, _value) => {
    return key[Object.keys(key)[0]]
  }))?.some((element) => element)
}

function toggleSubset(toggle: boolean, store: optState, dispatch: Dispatch<any>, 
  target?: { [key: string]: boolean; }[] | undefined){
  if (toggle) {
    let updated = target?.map((key, _value) => {
      key[Object.keys(key)[0]] = false
      return key
    })
    target = updated
    handleChangeSelectors(dispatch, store);
    return;
  }
  let updated = target?.map((key, _value) => {
    key[Object.keys(key)[0]] = true
    return key
  })
  target = updated
  handleChangeSelectors(dispatch, store);
}

function Selector() {
  const dispatch: Dispatch<any> = useDispatch();
  const store = useSelector((state: RootState) => state.opt);
  const [outputExpander, setOutputExpander] = useState("+");
  const [gameExpander, setGameExpander] = useState("+");
  const [generalExpander, setGeneralExpander] = useState("+");
  return (
  <Accordion className="metadata">
    <Card>
      <Accordion as={Card.Header}>
      <Card className="group-by">
        Output &amp; Presets
        <Accordion.Toggle 
        as={Card} 
        eventKey="0" 
        className="group-by-expander"
        onClick={(_e) => {
            if (outputExpander === "+"){
              setOutputExpander("-");
            } else {
              setOutputExpander("+");
            }
          }}>
            {outputExpander}
        </Accordion.Toggle>
      </Card>
      <Accordion.Collapse eventKey="0">
      <div>
      <Form.Group className="radios">
          <b>Preset: </b>
          <Form.Check
            type="radio"
            label="Minimal"
            name="formHorizontalRadios"
            id="formHorizontalRadios1"
            className="radio-option"
            defaultChecked
            onChange={(_e) => { 
              handleChangePreset(dispatch, "minimal");
            }}
          />
          <Form.Check
            type="radio"
            label="Advanced"
            name="formHorizontalRadios"
            id="formHorizontalRadios2"
            className="radio-option"
            onChange={(_e) => { 
              handleChangePreset(dispatch, "advanced");
            }}
          />
          <Form.Check
            type="radio"
            label="All"
            name="formHorizontalRadios"
            id="formHorizontalRadios3"
            className="radio-option"
            onChange={(_e) => {
              toggleSubset(false, store, dispatch, store.gameOpt);
              toggleSubset(false, store, dispatch, store.teamOpt);
              toggleSubset(false, store, dispatch, store.generalOpt);
              toggleSubset(false, store, dispatch, store.accountOpt);
              toggleSubset(false, store, dispatch, store.statOpt);
              toggleSubset(false, store, dispatch, store.timelineOpt);
            }}
          />
          <Form.Check
            type="radio"
            label="None"
            name="formHorizontalRadios"
            id="formHorizontalRadios4"
            className="radio-option"
            onChange={(_e) => { 
              toggleSubset(true, store, dispatch, store.gameOpt);
              toggleSubset(true, store, dispatch, store.teamOpt);
              toggleSubset(true, store, dispatch, store.generalOpt);
              toggleSubset(true, store, dispatch, store.accountOpt);
              toggleSubset(true, store, dispatch, store.statOpt);
              toggleSubset(true, store, dispatch, store.timelineOpt);
            }}
          />
      </Form.Group>
      <Form.Group className="radios">
          <b>Output: </b>
          <Form.Check
            type="checkbox"
            label="JSON"
            name="outputOption"
            id="outputOption1"
            className="radio-option"
            defaultChecked
            onChange={(_e) => { 
              handleToggleOutput(store, dispatch, "JSON");
            }}
          />
          <Form.Check
            type="checkbox"
            label="CSV"
            name="outputOption"
            id="outputOption2"
            className="radio-option"
            defaultChecked
            onChange={(_e) => { 
              handleToggleOutput(store, dispatch, "CSV");
            }}
          />
          <Form.Check
            type="checkbox"
            label="CSV (Headless)"
            name="outputOption"
            id="outputOption3"
            className="radio-option"
            defaultChecked
            onChange={(_e) => { 
              handleToggleOutput(store, dispatch, "CSV-Headless");
            }}
          />
      </Form.Group>
      </div>
      </Accordion.Collapse>
      </Accordion>
    </Card>
    <Card>
      <Accordion as={Card.Header}>
      <Card className="group-by">
        Game
        <Accordion.Toggle 
        as={Card} 
        eventKey="2" 
        className="group-by-expander"
        onClick={(_e) => {
            if (gameExpander === "+"){
              setGameExpander("-");
            } else {
              setGameExpander("+");
            }
          }}>
            {gameExpander}
        </Accordion.Toggle>
      </Card>
      <Accordion.Collapse eventKey="2">
      <div>
      <br />
      <b>Metadata</b>
      <Form.Group className="radios">
        {store.gameOpt?.map((key, val) => {
          return (
            <Form.Check
              type="checkbox"
              label={Object.keys(key)[0]}
              name="gameOption"
              id={"gameOption" + val.toString()}
              key={val}
              className="radio-option"
              checked={key[Object.keys(key)[0]]}
              onChange={(_e) => {
                let index;
                if(store.gameOpt) {
                  index = store.gameOpt[val];
                  index[Object.keys(index)[0]] = !index[Object.keys(index)[0]]
                }
                handleChangeSelectors(dispatch, store);
              }}
            />)
          })}
      </Form.Group>
      <b>Teams</b>
      <Form.Group className="radios">
        {store.teamOpt?.map((key, val) => {
          return (
            <Form.Check
              type="checkbox"
              label={Object.keys(key)[0]}
              name="teamOption"
              id={"teamOption" + val.toString()}
              key={val}
              className="radio-option"
              checked={key[Object.keys(key)[0]]}
              onChange={(_e) => {
                let index;
                if(store.teamOpt) {
                  index = store.teamOpt[val];
                  index[Object.keys(index)[0]] = !index[Object.keys(index)[0]]
                }
                handleChangeSelectors(dispatch, store);
              }}
            />)
          })}
      </Form.Group>
      </div>
      </Accordion.Collapse>
      </Accordion>
    </Card>
    <Card>
      <Accordion as={Card.Header}>
      <Card className="group-by">
        Player
        <Accordion.Toggle 
        as={Card} 
        eventKey="3" 
        className="group-by-expander"
        onClick={(_e) => {
            if (generalExpander === "+"){
              setGeneralExpander("-");
            } else {
              setGeneralExpander("+");
            }
          }}>
            {generalExpander}
        </Accordion.Toggle>
      </Card>
      <Accordion.Collapse eventKey="3">
      <div>
        <br />
        <Form.Check
          type="checkbox"
          label="General"
          name="generalMasterOption"
          id="generalMaster"
          className="sub-heading"
          checked={isSubsetChecked(store.generalOpt)}
          onChange={(_e) => { (isSubsetChecked(store.generalOpt)) ?
            toggleSubset(true, store, dispatch, store.generalOpt) :
            toggleSubset(false, store, dispatch, store.generalOpt);
          }}
        />
      <Form.Group className="radios">
        {store.generalOpt?.map((key, val) => {
          return (
            <Form.Check
              type="checkbox"
              label={Object.keys(key)[0]}
              name="genOption"
              id={"genOption" + val.toString()}
              key={val}
              className="radio-option"
              checked={key[Object.keys(key)[0]]}
              onChange={(_e) => {
                let index;
                if(store.generalOpt) {
                  index = store.generalOpt[val];
                  index[Object.keys(index)[0]] = !index[Object.keys(index)[0]]
                }
                handleChangeSelectors(dispatch, store);
              }}
            />)
          })}
      </Form.Group>
          <Form.Check
            type="checkbox"
            label="Account"
            name="accountMasterOption"
            id="accountMaster"
            className="sub-heading"
            checked={isSubsetChecked(store.accountOpt)}
            onChange={(_e) => { (isSubsetChecked(store.accountOpt)) ?
              toggleSubset(true, store, dispatch, store.accountOpt) :
              toggleSubset(false, store, dispatch, store.accountOpt);
            }}
          />
      <Form.Group className="radios">
        {store.accountOpt?.map((key, val) => {
          return (
            <Form.Check
              type="checkbox"
              label={Object.keys(key)[0]}
              name="accOption"
              id={"accOption" + val.toString()}
              key={val}
              className="radio-option"
              checked={key[Object.keys(key)[0]]}
              onChange={(_e) => {
                let index;
                if(store.accountOpt) {
                  index = store.accountOpt[val];
                  index[Object.keys(index)[0]] = !index[Object.keys(index)[0]]
                }
                handleChangeSelectors(dispatch, store);
              }}
            />)
          })}
      </Form.Group>
          <Form.Check
            type="checkbox"
            label="Stats"
            name="statMasterOption"
            id="statsMaster"
            className="sub-heading"
            checked={isSubsetChecked(store.statOpt)}
            onChange={(_e) => { (isSubsetChecked(store.statOpt)) ?
              toggleSubset(true, store, dispatch, store.statOpt) :
              toggleSubset(false, store, dispatch, store.statOpt);
            }}
          />
        <Form.Group className="radios">
          {store.statOpt?.map((key, val) => {
            return (
              <Form.Check
                type="checkbox"
                label={Object.keys(key)[0]}
                name="statsOption"
                id={"statsOption" + val.toString()}
                key={val}
                className="radio-option"
                checked={key[Object.keys(key)[0]]}
                onChange={(_e) => {
                  let index;
                  if(store.statOpt) {
                    index = store.statOpt[val];
                    index[Object.keys(index)[0]] = !index[Object.keys(index)[0]]
                  }
                  handleChangeSelectors(dispatch, store);
                }}
              />)
          })}
          </Form.Group>
          <Form.Check
            type="checkbox"
            label="Timeline"
            name="timeMasterOption"
            id="timeMaster"
            className="sub-heading"
            checked={isSubsetChecked(store.timelineOpt)}
            onChange={(_e) => { (isSubsetChecked(store.timelineOpt)) ?
              toggleSubset(true, store, dispatch, store.timelineOpt) :
              toggleSubset(false, store, dispatch, store.timelineOpt);
            }}
          />
        <Form.Group className="radios">
          {store.timelineOpt?.map((key, val) => {
            return (
              <Form.Check
                type="checkbox"
                label={Object.keys(key)[0]}
                name="timeOption"
                id={"timeOption" + val.toString()}
                key={val}
                className="radio-option"
                checked={key[Object.keys(key)[0]]}
                onChange={(_e) => {
                  let index;
                  if(store.timelineOpt) {
                    index = store.timelineOpt[val];
                    index[Object.keys(index)[0]] = !index[Object.keys(index)[0]]
                  }
                  handleChangeSelectors(dispatch, store);
                }}
              />)
          })}
          </Form.Group>
      </div>
      </Accordion.Collapse>
      </Accordion>
    </Card>
  </Accordion>
  );
}

export default Selector;