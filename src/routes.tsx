import  { BrowserRouter, Routes,Route } from "react-router-dom" ;
import Sobre from "./pages/Sobre";
import Dash from "./pages/Dash";
import Index from "../src/pages/Index";
import React from "react";
import Pesquisa from "./pages/Pesquisa/pesquisa";

function AppRoutes() {

    return (

        

        <BrowserRouter>
        <Routes> 
        <Route path="/" element={<Index/>}>  </Route>

         <Route path="/sobre" element={<Sobre/>}>  </Route>
         <Route path="/dash" element={<Dash/>}>  </Route>
         <Route path="/pesquisa" element={<Pesquisa/>}>  </Route>

 
        </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;