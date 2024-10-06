import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createContext,useState } from 'react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};
export const Context = createContext();

const AppWrapper = ()=>{

  const [isDarkMode, setIsDarkMode] = useState(false);
  return(
      <Context.Provider value={{
         isDarkMode,
         setIsDarkMode
      }}>
 

  <App />

      </Context.Provider>
  )
} 

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppWrapper/>
);

