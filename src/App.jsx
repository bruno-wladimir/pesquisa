import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { auth } from './services/firebaseConfig';
import { Link, Navigate, Route } from 'react-router-dom';
import AppRoutes from './routes';




function App() {

  return (
    <>
    <AppRoutes />
   
    
    </>
  )
}

export default App
