import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';

import  {auth}  from "../services/firebaseConfig";
import "./styles.css";
import * as React from 'react';
import { ThemeProvider } from "styled-components";
import { Button, FormControl, TextField, createTheme } from "@mui/material";
import axios from 'axios';

import config from '../config';

const URLAPI = config.apiUrl

export default function Register() {
  const history = useNavigate();

  const theme = createTheme();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState(false);

async function handleSignOut (e){
  e.preventDefault()
  await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      // Signed in
   const user = userCredential.user;

   createLoja(user.email);

  alert("Usuario Criado com Sucesso")

  history('/login');

  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
      alert("Erro ao criar usuario")

  });

}


async function createLoja(email){
  var email_send = {
    email:email

   }
   await axios.post(URLAPI + '/loja/criarloja', email_send)
    .then(response => {
    alert('Resposta da API:' + "Loja Configurada!");

    })
    .catch(error => {
      console.error('Erro ao enviar para a API:', error);
    });
  
}
const handleChange = (event) => {
  const { value } = event.target;
  setPassword(value);
  setError(value.length < 6); // Define o erro como verdadeiro se a senha tiver menos de 6 caracteres
};


  return (
    <> 
  

      <ThemeProvider theme={theme}>

      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="max-w-md w-full p-4">
          
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Cadastro</h2>
           
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
              onChange={handleChange}

              // onChange={(e) => setPassword(e.target.value)}
              inputProps={{
                minLength: 6,
              }}
              error={error}
              helperText={error ? 'A senha deve ter pelo menos 6 caracteres' : ''}
            />
            
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}> 

            <Button 
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
              onClick={handleSignOut}
            >
              Cadastrar
            </Button>
            </FormControl>

        
          </form>
        </div>
      </div>
    </ThemeProvider>
      {/* <form>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleSignOut} className="button">
          Cadastrar <img src="arrow.svg" alt="->" />
        </button>

        <div className="footer">
          <p>Você já tem uma conta?</p>
          <Link to="/">Acesse sua conta aqui</Link>
        </div>
      </form> */}
   </>
  );
}