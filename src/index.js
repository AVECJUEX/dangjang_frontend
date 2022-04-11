import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./CSS/reset.css";
import "./App.css";
import theme from './theme';
import { UserProvider } from './component/member/UserContext';





ReactDOM.render(
  <UserProvider>
    <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
    </ThemeProvider>
  </UserProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
