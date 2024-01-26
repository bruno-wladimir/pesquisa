
import { useState } from 'react'
import BarraNavegacao from '../../components/barranavegacao'
import '../../App.css'
import React from 'react'
import Menu_Logista from '../../components/menu_logista'
import { Button, FormLabel, TextField } from '@mui/material'
import axios from 'axios';


export default function EnvioPesquisa(){

    const [dadosFormulario, setDadosFormulario] = React.useState({
        nome: '',
        telefone: '',
      });
    
      const handleChange = (campo) => (event) => {
        setDadosFormulario({ ...dadosFormulario, [campo]: event.target.value });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica para lidar com os dados do formulário, por exemplo, enviar para um servidor
        console.log('Dados do formulário:', dadosFormulario);

try {
        const response =  axios.post('http://localhost:3000/send', { parametro1: dadosFormulario.nome, parametro2: dadosFormulario.telefone });
        //this.respostaMensagem = response.data.status;
    console.log("menasgem enviada"); 
    
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }


      };
    
    
return(
<>

<BarraNavegacao/>
<div className='p-6' > 

<form onSubmit={handleSubmit}>
      <TextField
        label="Nome"
        variant="outlined"
        fullWidth
        value={dadosFormulario.nome}
        onChange={handleChange('nome')}
        margin="normal"
      />
      <TextField
        label="Telefone"
        variant="outlined"
        fullWidth
        value={dadosFormulario.telefone}
        onChange={handleChange('telefone')}
        margin="normal"
      />


      <Button type="submit">Enviar</Button>
       
       

  </form>

</div>

</>

)


}