import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import Home from './home';
import App from './app';
import Settings from './routes/settings';


const root = ReactDOM.createRoot(
  document.getElementById("root")
);


root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <App>
          <Home />
        </App>
      } />
      <Route path="/settings" element={
        <App>
          <Settings />
        </App>
      } />
    </Routes>
  </BrowserRouter>
);
