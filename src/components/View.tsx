import React from 'react';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { Button, Container } from 'react-bootstrap';
import { useSelector } from "react-redux"

import '../style/View.css';

import Metadata from './Metadata';
import Search from './Search';
import Table from './Table';

import Selector from './Selector';
import JSONComponent from './JSONComponent';
import CSVComponent from './CSVComponent';

import { RootState } from "../store/rootReducer";

import { updateScreen } from '../store/actionCreators';

function renderOutputTypes(target: string, component: JSX.Element, outputArr?: {[key: string] : boolean}) {
  return outputArr ? (outputArr[target] ? component : <div></div>) : <div></div>
}

function View() {
  const dispatch: Dispatch<any> = useDispatch();
  const didLoad = useSelector((state: RootState) => state.main);
  const opt = useSelector((state: RootState) => state.opt);
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
                  raw: didLoad.raw,
                  meta: didLoad.meta,
                  onView: true
                }))}}>
                Generate Data
        </Button>
        </div>)}
        <p className="discloser">Data-Loader isn’t endorsed by Riot Games and doesn’t reflect the 
          views or opinions of Riot Games or anyone officially involved in 
          producing or managing League of Legends. League of Legends and Riot 
          Games are trademarks or registered trademarks of Riot Games, Inc. 
          League of Legends © Riot Games, Inc.</p>
    </Container>
  );
}

export default View;