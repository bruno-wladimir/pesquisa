import  { BrowserRouter, Routes,Route } from "react-router-dom" ;
import Sobre from "./pages_user/Sobre";
import PaginaEntradaUser from "./pages_user/PaginaEntradaUser";
import Index from "./pages_user/Index";
import React from "react";
import Pesquisa from "./pages_user/Pesquisa/pesquisa";


//rotas loja 
import Logista_Dashboard from "./pages_loja/Dashboard";
import Formulario_Config_Logista from "./pages_loja/Configuracao/formulario-config-logista";
import EnvioPesquisa from "./pages_loja/enviar_pesquisa";



function AppRoutes() {

    return (

        

        <BrowserRouter>
        <Routes> 
        <Route path="/" element={<Index/>}>  </Route>
         
         
         <Route path="/user-inicio" element={<PaginaEntradaUser/>}>  </Route>
         <Route path="/user-pesquisa" element={<Pesquisa/>}>  </Route>


{/* Rotas loja */}

<Route path="/lojista-dash" element={<Logista_Dashboard/>}>  </Route>
<Route path="/lojista-configuracao" element={<Formulario_Config_Logista/>}>  </Route>
<Route path="/lojista-enviopesquisa" element={<EnvioPesquisa/>}>  </Route>



 
        </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;