import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sobre from "./pages_user/Sobre";
import PaginaEntradaUser from "./pages_user/PaginaEntradaUser";
import Index from "./pages_user/Index";
import { useEffect, useState } from "react";
import Pesquisa from "./pages_user/Pesquisa/pesquisa";
import * as React from 'react';


//rotas loja 
import Logista_Dashboard from "./pages_loja/Dashboard";
import Formulario_Config_Logista from "./pages_loja/Configuracao/formulario-config-logista";
import EnvioPesquisa from "./pages_loja/enviar_pesquisa";
import Login from "./Login";
import Register from "./Register";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth} from './services/firebaseConfig';
import { CheckRoute } from "./components/auth";

 function AppRoutes(props) {


   const [authenticated, setAuthenticated] = useState<User| null|String | boolean>(localStorage.getItem("on")); // estou pegando a variavel do storage como ga,biarra , pis a pagina carrega mais rapido , posso tentar depois travar a tela com um load ... 
    function setuserState(){

       const user =  localStorage.getItem("on")
        if (user =="1"){
            setAuthenticated(true);
        }
        else{
            setAuthenticated(false);

        }
    }

    function inicio(){
        auth.onAuthStateChanged(user => {
          if (user){
          console.log("user logauuuu",user)
          localStorage.setItem("on","1");
          setAuthenticated(true);

        }
        else{
          localStorage.setItem("on","0");
          setAuthenticated(false);

        }
      }
      
      )
      }
    inicio();


   useEffect(()=>{

    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //     setAuthenticated(user);
    //   });
  
    //   return () => unsubscribe();
    }, []);

    return (

        <BrowserRouter>
            <Routes>


                <Route path="/" element={<Login />}>  </Route>

                <Route path="/user-inicio" element={<CheckRoute autenticado={authenticated} ><PaginaEntradaUser /></CheckRoute>}/>
                {/* <CheckRoute  admin={authenticated}><PaginaEntradaUser /></CheckRoute> */}
                <Route path="/user-pesquisa" element={<Pesquisa />}>  </Route>
                <Route path="/login" element={<Login />}>  </Route>

                <Route path="/register" element={<Register />}>  </Route>

                {/* Rotas loja */}

                <Route path="/lojista-dash" element={<CheckRoute autenticado={authenticated} ><Logista_Dashboard /></CheckRoute>}/>
                <Route path="/lojista-configuracao" element={<CheckRoute autenticado={authenticated} ><Formulario_Config_Logista /></CheckRoute>}/>
                <Route path="/lojista-enviopesquisa" element={<CheckRoute autenticado={authenticated} ><EnvioPesquisa /></CheckRoute>}/>


            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;