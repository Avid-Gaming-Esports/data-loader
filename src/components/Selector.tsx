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

function Selector() {
  const dispatch: Dispatch<any> = useDispatch();
  const store = useSelector((state: RootState) => state.opt);
  const [outputExpander, setOutputExpander] = useState("+");
  const [statExpander, setStatExpander] = useState("+");
  return (
  <Accordion className="metadata">
    <Card>
      <Accordion as={Card.Header}>
      <Card className="group-by">
        Output &amp; Presets
        <Accordion.Toggle 
        as={Card} 
        eventKey="1" 
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
      <Accordion.Collapse eventKey="1">
      <div>
      <Form.Group className="radios">
          <b>Preset: </b>
          <Form.Check
            type="radio"
            label="Minimal"
            name="formHorizontalRadios"
            id="formHorizontalRadios1"
            className="radio-option"
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
            defaultChecked
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
          <Form.Check
            type="checkbox"
            label="Stats"
            name="statMasterOption"
            id="statsMaster"
            checked={(store.statOpt?.map((key, _value) => {
              return key[Object.keys(key)[0]]
            }))?.some((element) => element)}
            onChange={(_e) => { 
              if (Constants.PRESET_ARRAYS["stats"].filter(value => 
                store.preset?.includes(value)
              ).length > 0) {
                let newPreset : string[] | undefined = store.preset?.filter(value => 
                  !Constants.PRESET_ARRAYS["stats"].includes(value)
                )
                // handleChangeSelectors(dispatch, newPreset);
              } else {
                let newPreset : string[] | undefined = Constants.PRESET_ARRAYS["stats"].filter(value => 
                  !store.preset?.includes(value)
                )
                if (store.preset) {
                  newPreset = store.preset.concat(newPreset);
                }
                // handleChangeSelectors(dispatch, newPreset);
              }
            }}
          />
          <Accordion.Toggle 
          as={Card} 
          eventKey="2" 
          className="group-by-expander"
          onClick={(_e) => {
            if (statExpander === "+"){
              setStatExpander("-");
            } else {
              setStatExpander("+");
            }
          }}>
              {statExpander}
          </Accordion.Toggle>
        </Card>
        <Accordion.Collapse eventKey="2" >
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
                    console.log(index)
                    index[Object.keys(index)[0]] = !index[Object.keys(index)[0]]
                    console.log(index)
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