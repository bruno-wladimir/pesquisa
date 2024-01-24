import  { BrowserRouter, Routes,Route } from "react-router-dom" ;
import Sobre from "./pages_user/Sobre";
import Dash from "./pages_user/Dash";
import Index from "./pages_user/Index";
import React from "react";
import Pesquisa from "./pages_user/Pesquisa/pesquisa";


//rotas loja 
import Index_loja from "./pages_loja/Index";
import Formulario_Config_Logista from "./components/formulario-config-logista";



function AppRoutes() {

    return (

        

        <BrowserRouter>
        <Routes> 
        <Route path="/" element={<Index/>}>  </Route>

         <Route path="/sobre" element={<Sobre/>}>  </Route>
         <Route path="/dash" element={<Dash/>}>  </Route>
         <Route path="/pesquisa" element={<Pesquisa/>}>  </Route>


{/* Rotas loja */}

<Route path="/index_lojista" element={<Index_loja/>}>  </Route>
<Route path="/form-logista" element={<Formulario_Config_Logista/>}>  </Route>



 
        </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;