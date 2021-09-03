import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { AppContextProvider } from './store/app-context.js';

ReactDOM.render(
  <AppContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContextProvider>,
  document.getElementById('root')
);
