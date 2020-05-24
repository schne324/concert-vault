import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import './index.css';

const App = ({ concerts }) => (
  <div className="App">
    <header>
      <h1>Concert Vault</h1>
    </header>
    <List concerts={concerts} />
  </div>
);

App.displayName = 'App';
App.propTypes = {
  concerts: PropTypes.array.isRequired
};

export default App;
