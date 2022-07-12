import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';
import './assets/scss/style.scss';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';
import AppCancel from './AppCancel';
import AppSuccess from './AppSuccess';

const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render( 
  <BrowserRouter history={history} >
    <HashRouter basename="/"> 
    <Routes>
      <Route path="*" element={<App/>}  />
      <Route path="cancel" element={<AppCancel/>}  />
      <Route path="success" element={<AppSuccess/>}  />
    </Routes>
    </HashRouter>
  </BrowserRouter>
);

// ReactDOM.render(
//   <Router history={history}>
//     <App />
//   </Router>,
//   document.getElementById('root')
// );



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
