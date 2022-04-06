import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
import NavigateStore from './store/NavigateStore';

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider value={{
      user: new UserStore(),
      device: new DeviceStore(),
      navigation: new NavigateStore(),
    }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
