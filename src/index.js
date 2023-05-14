/** Modules */
import React from 'react';
import ReactDOM from 'react-dom/client';
/** Components */
import App from './App';
import AppRouter from './App_react-router';
/** Styles */
import './index.css';

/** DOM */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App></App>
    {/* <AppRouter /> */}
  </React.StrictMode>
);