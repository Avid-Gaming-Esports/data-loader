import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from "react-redux"

import { RootState } from "../store/rootReducer";

import '../style/JSONComponent.css';

function JSONComponent() {
  const didLoad = useSelector((state: RootState) => state.main);
  return (
    <Alert show={true} variant="dark" className="json-alert">
      <Alert.Heading>JSON</Alert.Heading>
      <div className="json-raw-format">
        {JSON.stringify(didLoad.red)}
        {JSON.stringify(didLoad.blue)}
      </div>
    </Alert>
  );
}

export default JSONComponent;