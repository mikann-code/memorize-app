import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from "./routes";
import { AppProvider } from "./useContext.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
      <React.StrictMode>
        <RouterProvider router={routes} />
      </React.StrictMode>
    </AppProvider>
);

