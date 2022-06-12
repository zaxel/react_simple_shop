import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './index.css';
import App from './App';
import RootStore from './store/RootStore';

export const Context = createContext(null);
const rootStore = new RootStore();

ReactDOM.render(
  <Context.Provider value={rootStore}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
