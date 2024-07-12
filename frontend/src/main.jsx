import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bulma/css/bulma.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "fontawesome/index.js";
import "./index.css";
import "bootstrap/dist/js/bootstrap.min.js"

import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
