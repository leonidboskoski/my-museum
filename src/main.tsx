import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import Scene from "./Components/Scene.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='/my-museum'>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/experience" element={<Scene/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
