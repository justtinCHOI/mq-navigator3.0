import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './CRABasicFiles/reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
// import GlobalStyles from './GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    {/*<GlobalStyles />*/}
    <App />
  </Provider>,
);

reportWebVitals();
