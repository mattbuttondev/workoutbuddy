import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import { WorkoutContextProvider } from './context/workoutContext';
import { AuthContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContextProvider>
        <Router>
          <App />
        </Router>
      </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);