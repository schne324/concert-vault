import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import data from '../data.json';
import './index.css';

render(<App concerts={data} />, document.getElementById('app'));
