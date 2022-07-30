import { React, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { createBrowserHistory } from "history";




import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';
import './assets/scss/style.scss';

//custome Route
import AppRoute from './utils/AppRoute';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';
import AppCancel from './AppCancel';
import AppSuccess from './AppSuccess';

//const history = createBrowserHistory();
//history={history}


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render( 
<HashRouter>
    <Routes>
      <Route path="*" element={<App />} LayoutDefault={<LayoutDefault />}  />
      <Route path="cancel" element={<AppCancel/> } LayoutDefault={<LayoutDefault /> } />
      <Route path="success" element={<AppSuccess/>} LayoutDefault={<LayoutDefault /> }/>
    </Routes>
  </HashRouter>
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
