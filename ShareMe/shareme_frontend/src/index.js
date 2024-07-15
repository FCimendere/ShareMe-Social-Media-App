import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <App />
    </GoogleOAuthProvider>
  </Router>
)