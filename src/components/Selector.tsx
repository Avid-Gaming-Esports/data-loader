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
  const [statExpander, setStatExpander] = useState("+");
  const [timeExpander, setTimeExpander] = useState("+");
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
              handleChangePreset(dispatch, "all");
            }}
          />
          <Form.Check
            type="radio"
            label="None"
            name="formHorizontalRadios"
            id="formHorizontalRadios4"
            className="radio-option"
            onChange={(_e) => { 
              handleChangePreset(dispatch, "none");
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
      </div>
      </Accordion.Collapse>
      </Accordion>
    </Card>
    <Card>
      <Accordion as={Card.Header}>
      <Card className="group-by">
        Player (General)
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
      </div>
      </Accordion.Collapse>
      </Accordion>
    </Card>
    <Card>
      <Accordion as={Card.Header}>
      <Card className="group-by">
        Player (Account)
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
      </div>
      </Accordion.Collapse>
      </Accordion>
    </Card>
    <Card>
      <Accordion as={Card.Header}>
        <Card className="group-by">
          <Form.Check
            type="checkbox"
            label="Player (Stats)"
            name="statMasterOption"
            id="statsMaster"
            checked={isSubsetChecked(store.statOpt)}
            onChange={(_e) => { (isSubsetChecked(store.statOpt)) ?
              toggleSubset(true, store, dispatch, store.statOpt) :
              toggleSubset(false, store, dispatch, store.statOpt);
            }}
          />
          <Accordion.Toggle 
          as={Card} 
          eventKey="4" 
          className="group-by-expander"
          onClick={(_e) => { (statExpander === "+") ?
            setStatExpander("-") : setStatExpander("+");
          }}>
              {statExpander}
          </Accordion.Toggle>
        </Card>
        <Accordion.Collapse eventKey="4" >
        <div>
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
        </div>
        </Accordion.Collapse>
      </Accordion>
    </Card>
    <Card>
      <Accordion as={Card.Header}>
        <Card className="group-by">
          <Form.Check
            type="checkbox"
            label="Player (Timeline)"
            name="timeMasterOption"
            id="timeMaster"
            checked={isSubsetChecked(store.timelineOpt)}
            onChange={(_e) => { (isSubsetChecked(store.timelineOpt)) ?
              toggleSubset(true, store, dispatch, store.timelineOpt) :
              toggleSubset(false, store, dispatch, store.timelineOpt);
            }}
          />
          <Accordion.Toggle 
          as={Card} 
          eventKey="5" 
          className="group-by-expander"
          onClick={(_e) => { (timeExpander === "+") ?  
          setTimeExpander("-") : setTimeExpander("+");
          }}>
              {timeExpander}
          </Accordion.Toggle>
        </Card>
        <Accordion.Collapse eventKey="5" >
        <div>
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