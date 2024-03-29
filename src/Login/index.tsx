
import { useState } from "react";
import { User, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseConfig";
import "./styles.css";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'tailwindcss/tailwind.css';
import { FormControl } from "@mui/material";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme();
import config from '../config';

const URLAPI = config.apiUrl
export default function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setDisableButton(e.target.value === ''); // Define o estado do botão com base no campo de e-mail
  };
  function logout() {

    signOut(auth).then(() => {
      // Sign-out successful.
      <Navigate to="/" />
      console.log("Signed out successfully")
      localStorage.setItem("on", "0");
    }).catch((error) => {
      // An error happened.
    });


  }
  function handleSignIn(e) {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //const user = userCredential.user;
        console.log("logado");
        const userEmail = userCredential.user.email;
      const uid = userCredential.user.uid;

          if (userEmail !==null){
            localStorage.setItem("email",userEmail)
            
          }
        
        localStorage.setItem("on", "1");
        localStorage.setItem("id_fire", uid)

        getdadosloja();


        setTimeout(() => {
          // Redirecionar para outra página após 10 segundos
          setLoading(false);

          history('/lojista-enviopesquisa');
        }, 3000); // 10000 milissegundos = 10 segundos


      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        if (errorCode == "auth/invalid-credential"){
          alert("Senha inválida");
          setLoading(false);

        }


      });


  }

  async function  getdadosloja(){
    const response = await axios.get(URLAPI + '/loja/get_dados_lojista', {
      params: {

        email: localStorage.getItem("email")

      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Resposta da API:', response.data.loja.vendedores);
    
        localStorage.setItem("vendedores",JSON.stringify(response.data.loja.vendedores))
        localStorage.setItem("logo",response.data.loja.logo)
        // aqui eu pego o id da loja , e salvo no local storage , para toda vez que enviar um link validator eu enviar o link junto  


      })
      .catch(error => {
        console.error('Erro ao enviar para a API:', error);
      });
    }


  
  return (
    
<div> 

{loading ? (
        // Se loading for verdadeiro, exibe o indicador de carregamento
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <CircularProgress />
</div>      ) : (

    <ThemeProvider theme={theme}>
    
      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="max-w-md w-full p-4">
        <img src='logo_black.png' className="max-w-30 max-h-30"/> 

          <div className="text-center">

            <h2 className="text-3xl font-extrabold text-gray-900">Login</h2>

          </div>
          <form className="mt-4">
            <FormControl fullWidth sx={{ my: 2 }}>
              <TextField
                label="E-mail"
                type="email"
                variant="outlined"
                fullWidth
                className="mt-3"
                onChange={handleEmailChange}
              />
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}>
              <TextField
                label="Senha"
                type="password"
                variant="outlined"
                fullWidth
                className="mt-3"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                disabled={disableButton}
                onClick={handleSignIn}
              >
                Entrar
              </Button>
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}>
              <Link to = "/register"> 
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                
              >
                Cadastre - se
              </Button>
              </Link>
            </FormControl>
            <Link to = "/recuperacaosenha"> 
            <a> Esqueci Minha Senha</a>
            </Link>
            {/* <button onClick={logout}>Sair</button> */}
          </form>
        </div>
      </div>
    </ThemeProvider>
)}

</div>
        );
  
}
