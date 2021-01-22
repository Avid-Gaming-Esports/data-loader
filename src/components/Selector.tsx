import React from 'react';
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { Accordion, Card, Form } from 'react-bootstrap';

import { Constants } from './Constants';

import '../style/Selector.css';

import { changePreset, toggleOutput } from '../store/actionCreators';

function handleChangePreset(dispatch: Dispatch<any>, target: string) {
  dispatch(changePreset({
    blue: [],
    red: [],
    raw: "",
    preset: Constants.PRESET_ARRAYS[target],
  }))
}

function handleToggleOutput(store: gameState, dispatch: Dispatch<any>, target: string) {
  let outputDict: {[key: string] : boolean} | undefined = 
  store.outputTypes;
  if(outputDict) {
  outputDict[target] = !outputDict[target]
  }
  dispatch(toggleOutput({
    blue: [],
    red: [],
    raw: "",
    outputTypes: outputDict
  }))
}

function Selector() {
  const dispatch: Dispatch<any> = useDispatch();
  const store = useSelector((state: gameState) => state);
  return (
  <Accordion className="metadata">
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="1">
        Output &amp; Presets +
      </Accordion.Toggle>
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
    </Card>
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="2">
        <Form.Check
          type="checkbox"
          label="Stats +"
          name="outputOption"
          id="outputOption3"
          defaultChecked
          onChange={(_e) => { 
            console.log("Nostats");
          }}
        />
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="2" >
      <div>
        ASDFASDFSAFD
      </div>
      </Accordion.Collapse>
    </Card>
  </Accordion>
  );
}

export default Selector;