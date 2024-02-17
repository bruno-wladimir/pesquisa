import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import BarraNavegacao from '../../components/barranavegacao'
import CardComponent from '../../components/card';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import config from '../../config';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const URLAPI = config.apiUrl
function PaginaEntradaUser() {

  const [count, setCount] = useState(206)
  const [condicao, setCondicao] = useState(true)
  const location = useLocation();

  useEffect(() => {
    const urlAtual = location.pathname.split('/');
    const ultimaParte = urlAtual[urlAtual.length - 1];

    get_dados_lojista(ultimaParte);
    localStorage.setItem("link",ultimaParte)
    

  }, []);



  async function get_dados_lojista(ulr) {

    // Enviando para a API usando Axios
    await axios.get(URLAPI + "/loja/validarlink", {
      params: {

        url: ulr

      }

    })
      .then(response => {

        const dadosDaResposta = response.data;
        console.log(dadosDaResposta.response)     
        setCondicao(true);

      })
      .catch(error => {
        console.error('Erro ao enviar para a API:', error);
          setCondicao(false);
      });

  }




  // if (!condicao) {
  //   return null; // Se a condição não for verdadeira, retorna nulo (oculta o componente)
  // }

  return (
    <>
    <div>
      <BarraNavegacao />
    </div>
    {!condicao ? (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        
Você Já Votou !
      </div>
    ) : (
      <>
        {/* <div className='p-6 flex items-center justify-center flex-col'>
        

        <Card sx={{ maxWidth: 345  }} >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://firebasestorage.googleapis.com/v0/b/pesquisa-ec906.appspot.com/o/PARCEIRO.png?alt=media&token=05ab2fc1-77b8-4ac3-8b21-225783225dce"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Loja Parceira
                </Typography>

              </CardContent>
            </CardActionArea>

          </Card>

        
          </div>
          <div className='p-6 flex items-center justify-center flex-col'>

       
        </div> */}
         <div className='p-6 flex items-center justify-center flex-col'>
         <CardComponent />

         </div>
        <div className='p-10'>
          <Link to={'/user-pesquisa'} >
            <Button variant="contained">Quero Concorrer !</Button>
          </Link>
        </div>
      </>
    )}
  </>
    
  )
}
export default PaginaEntradaUser;