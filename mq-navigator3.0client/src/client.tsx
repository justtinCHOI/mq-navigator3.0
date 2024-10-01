// import React from 'react';
// import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import App from '@layouts/App';
//
// render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.querySelector('#app'),
// );
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@layouts/App';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
