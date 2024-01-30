
import { useState } from "react";
import {  User, signInWithEmailAndPassword ,signOut  } from 'firebase/auth';
import { Link, Navigate,useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseConfig";
import "./styles.css";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'tailwindcss/tailwind.css';
import { FormControl } from "@mui/material";

const theme = createTheme();

export default function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  React.useEffect(() => {


   
  }, []);

function logout(){
             
    signOut(auth).then(() => {
    // Sign-out successful.
        <Navigate to="/"/>
        console.log("Signed out successfully")
        localStorage.setItem("on","0");

    }).catch((error) => {
    // An error happened.
    });


}
 function handleSignIn (e) {
  console.log(email,password)
  e.preventDefault();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      //const user = userCredential.user;
      console.log("logado");
      history('/lojista-enviopesquisa');
    localStorage.setItem("on","1");
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
      alert("erro"+ errorMessage);

  });


}

  return (
<ThemeProvider theme={theme}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-4">
          
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
              onChange={(e) => setEmail(e.target.value)}
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
              onClick={handleSignIn}
            >
              Entrar
            </Button>
            </FormControl>

            <a href="#">Esqueceu sua senha?</a><br></br>
            <button onClick={logout}>Sair</button>
          </form>
        </div>
      </div>
    </ThemeProvider>


    // <div className="container">
    //   <button onClick={logout}>Sair</button>
    //   <header className="header">
    //     <img src="arrow.svg" alt="Workflow" className="logoImg" />
    //     <span>Por favor, digite suas informações de login</span>
    //   </header>
    
    //   <form>
    //     <div className="inputContainer">
    //       <label htmlFor="email">E-mail</label>
    //       <input
    //         type="text"
    //         name="email"
    //         id="email"
    //         placeholder="johndoe@gmail.com"
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>

    //     <div className="inputContainer">
    //       <label htmlFor="password">Senha</label>
    //       <input
    //         type="password"
    //         name="password"
    //         id="password"
    //         placeholder="********************"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>

    //     <a href="#">Esqueceu sua senha?</a>

    //     <button className="button" onClick={handleSignIn}>
    //       Entrar <img src="arrow.svg" alt="->" />
    //     </button>

    //     <div className="footer">
    //       <p>Você não tem uma conta?</p>
    //       <Link to="/register">Crie a sua conta aqui</Link>
          
    //     </div>
    //   </form>
    // </div>
  );
}
