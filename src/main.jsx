import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Le HTML est pré-rendu au build (scripts/prerender.mjs) : on l'hydrate.
hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <App />
  </StrictMode>,
)
