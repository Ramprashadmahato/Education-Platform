import { BrowserRouter } from 'react-router-dom'; // Correct import
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AuthProvider from './Context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  
  <AuthProvider> 
    <BrowserRouter>
 

    <App />
    </BrowserRouter>
    </AuthProvider>
 
);
