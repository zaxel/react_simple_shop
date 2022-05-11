import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
import HistoryStore from './store/HistoryStore';
import CartStore from './store/CartStore';
import ToolTipStore from './store/ToolTipStore';

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider value={{
      user: new UserStore(),
      device: new DeviceStore(),
      history: new HistoryStore(),
      cart: new CartStore(),
      toolTip: new ToolTipStore(),
    }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
