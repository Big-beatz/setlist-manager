import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
import UserContextProvider from "./context/UserContext";
import AuthContextProvider from "./context/AuthContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <React.StrictMode>
          <AuthContextProvider>
              <UserContextProvider>
                  <App />
              </UserContextProvider>
          </AuthContextProvider>
      </React.StrictMode>
    </Router>
);

reportWebVitals();
