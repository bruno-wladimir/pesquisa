import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import  { BrowserRouter, Routes,Route } from "react-router-dom" ;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

})
