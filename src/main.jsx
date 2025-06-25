import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './store/AuthProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ChatProvider from './store/ChatProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
    <App />
    </ChatProvider>
    </AuthProvider>
    </BrowserRouter>
    <Toaster />
  </StrictMode>,
)
