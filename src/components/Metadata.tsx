import React, { useState } from 'react';
import { Accordion, Card, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { RootState } from "../store/rootReducer";

import '../style/Metadata.css';
import { Constants } from './Constants';

function Metadata() {
  const md : Metadata = useSelector((state: RootState) => state.main.meta);
  const [metaExpander, setMetaExpander] = useState("+");
  const keys = Object.keys(md);
  return (
  <Accordion className="metadata">
    <Card>
      <Accordion as={Card.Header}>
        <Card className="group-by">
          Metadata
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
          </Form.Group>
        </div>
        </Accordion.Collapse>
      </Accordion>
    </Card>
  </Accordion>
  );
}

export default Metadata;