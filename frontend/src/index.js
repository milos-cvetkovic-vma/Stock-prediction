import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PredictionContextProvider } from './context/predictionContex';
import { AuthContextProvider } from './context/authContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PredictionContextProvider>
        <App />
      </PredictionContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


