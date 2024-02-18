
import { useState } from "react";
import { User, sendPasswordResetEmail, signOut } from 'firebase/auth';
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
export default function Recuperacaosenha() {
  const history = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);


  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email)
      setMessage('E-mail de recuperação de senha enviado. Verifique sua caixa de entrada.');
    } catch (error) {
      setMessage('Ocorreu um erro ao enviar o e-mail de recuperação de senha. Por favor, verifique o endereço de e-mail e tente novamente.');
    }
  };


  return (

    <div>

      {loading ? (
        // Se loading for verdadeiro, exibe o indicador de carregamento
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>) : (

        <ThemeProvider theme={theme}>
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-4">

              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">Recuperar Senha</h2>

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

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="mt-4"
                    onClick={handleReset}
                  >
                    Enviar E-mail de Recuperação de Senha
                  </Button>
                  <div className="p-4">

                  </div>
                  <p>{message}</p>
                  <Link to="/login">
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      className="mt-4"

                    >
                      Voltar
                    </Button>
                  </Link>
                </FormControl>
              </form>
            </div>

          </div>

        </ThemeProvider>
      )}

    </div>
  );

}
