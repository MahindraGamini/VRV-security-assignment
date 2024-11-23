import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import { BlogProvider } from './context/BlogContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BlogProvider>
    <App />
    </BlogProvider>
</AuthProvider>


  </React.StrictMode>
);


