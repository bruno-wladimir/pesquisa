import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, FormLabel, Rating, Stack, TextField } from '@mui/material';
import { useState } from 'react'
import  { BrowserRouter, Routes,Route, Link } from "react-router-dom" ;


export default function Formulario_Config_Logista() {
  const rootRef = React.useRef<HTMLDivElement>(null);


  const [count, setCount] = useState(0)
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cidade, setCidade] = useState('');
  const [sexo, setSexo] = useState('');
  const [atendimentovendedor, setAtendimentoVendedor] = useState(null);
  const [organizacaoloja, setOrganizacaoloja] = useState(null);
  const [values, setValues] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => { // AQUI MANDA OS DADOS PARA API E SALVA NO DB .
    event.preventDefault();
    // Aqui você pode lidar com os dados do formulário, como enviá-los para um servidor
    console.log('Dados do formulário:', { nome, idade, cidade ,sexo,atendimentovendedor,organizacaoloja});
   handleOpen();
  };



  return (
  <> 
      <form onSubmit={handleSubmit} className='p-10 '>
  
  <FormLabel id="demo-controlled-radio-buttons-group"   className='flex  justify-left'>Você se Identifica como ?</FormLabel>

<br></br>
<FormLabel id="demo-controlled-radio-buttons-group"  className='flex  justify-left'>Quantas Estrelas Você dá para o atendimento vendedor? </FormLabel>
<br></br>

<br></br>
    {/* <TextField
      label="Didite aqui alguma sugestão para melhorar nossa loja "
      variant="outlined"
      fullWidth
      margin="normal"
      value={nome}
      onChange={(e) => setNome(e.target.value)}
    /> */}
    <ul></ul>
    <div className='flex  justify-left'>
       <TextField 
        id="outlined-multiline-static"
        label="Didite aqui alguma sugestão para melhorar nossa loja"
        fullWidth
        multiline
        rows={4}
        defaultValue="Default Value"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      </div>
      <br></br>
    {/* <Select
      label="Cidade"
      variant="outlined"
      fullWidth
      margin="dense"
      value={cidade}
      onChange={(e) => setCidade(e.target.value)}
    >
      <MenuItem value="cidade1">Cidade 1</MenuItem>
      <MenuItem value="cidade2">Cidade 2</MenuItem>
      <MenuItem value="cidade3">Cidade 3</MenuItem>
    </Select> */}
  
    <Stack direction="row" spacing={2}>
    <Button type="submit" variant="contained" color="primary">
      Enviar
    </Button>
<Link to="/index_lojista">
  <Button  variant="contained" color="error" >
  Cancelar 
</Button>

</Link>
 </Stack>


  </form>




</>

  );
}