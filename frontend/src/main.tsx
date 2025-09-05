import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css'
import './aurora-brand.css'
import './aurora-palette.css'
import './aurora-design-system.css'  // Sistema de componentes estandarizados
// New standardized Design System
import './styles/aurora-tokens.css'
import './styles/aurora-base.css'
import './styles/aurora-utils.css'
import './styles/aurora-layout.css'
import './styles/aurora-components.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
const helmetContext = {};
ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter 
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
    <HelmetProvider context={helmetContext}>
    <App />
    </HelmetProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
