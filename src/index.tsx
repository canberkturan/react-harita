import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { cities } from './components/Map/data';
import Map from './components/Map';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<Map cities={cities} onClick={(event: any) => console.log(event)}/>);

