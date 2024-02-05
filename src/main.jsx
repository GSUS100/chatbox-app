import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AuthContextProvider } from './context/AuthContext';

// Create a root constant for React 18's new root API
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<AuthContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </AuthContextProvider>
);
