import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
const helmetContext = {};
ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter basename='/admin/'>
    <HelmetProvider context={helmetContext}>
    <App />
    </HelmetProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
