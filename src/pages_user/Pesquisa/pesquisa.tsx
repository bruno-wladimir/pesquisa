import { useState } from 'react'
import BarraNavegacao from '../../components/barranavegacao'
import '../../App.css'
import React from 'react'
import { BottomNavigation, BottomNavigationAction, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControl, FormControlLabel, FormLabel, MenuItem, Modal, Radio, RadioGroup, Rating, Select, TextField, Typography } from '@mui/material'

import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import { AlignHorizontalCenter } from '@mui/icons-material'

function Pesquisa() {


//INICIO CONTROLE MODAL 

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

// FIM CONTROLE MODAL 

  const [count, setCount] = useState(0)
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cidade, setCidade] = useState('');
  const [sexo, setSexo] = useState('');
  const [atendimentovendedor, setAtendimentoVendedor] = useState(null);
  const [organizacaoloja, setOrganizacaoloja] = useState(null);
  const [values, setValues] = React.useState(0);
  const estrela = (event, novoValor) => {
    setAtendimentoVendedor(novoValor);
  }

  const estrela_loja = (event, novoValor) => {
    setOrganizacaoloja(novoValor);
  }


var value;
function handleChange(a){
console.log("Estou aqui ",a.target.value)
}

    function setValue(newValue: number | null) {
        throw new Error('Function not implemented.')
    }
    const handleSubmit = (event) => { // AQUI MANDA OS DADOS PARA API E SALVA NO DB .
        event.preventDefault();
        // Aqui você pode lidar com os dados do formulário, como enviá-los para um servidor
        console.log('Dados do formulário:', { nome, idade, cidade ,sexo,atendimentovendedor,organizacaoloja});
       handleOpen();
      };
  return (
    <>
    <div>
    <BarraNavegacao/>
    </div>

    <Typography variant="h5" gutterBottom className='p-4'>
<div className='p-6 flex items-center justify-center '>

    {/* inicio card inicio */}

<Card sx={{ maxWidth: 345 }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="logomb.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Loja Parceira
          </Typography>
         
        </CardContent>
      </CardActionArea>
    
    </Card>
    {/* fim card inicio */}
</div>
      </Typography>
    <form onSubmit={handleSubmit} className='p-10 '>
  
    <FormLabel id="demo-controlled-radio-buttons-group"   className='flex  justify-left'>Você se Identifica como ?</FormLabel>

    <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={sexo}
    onChange={(e) => setSexo(e.target.value)}
  >
    <FormControlLabel value="Mulher" control={<Radio />} label="Mulher" />
    <FormControlLabel value="Homem" control={<Radio />} label="Homem" />
    <FormControlLabel value="Indefinido" control={<Radio />} label="Prefiro não Identificar" />

  </RadioGroup>
  <br></br>
  <FormLabel id="demo-controlled-radio-buttons-group"  className='flex  justify-left'>Quantas Estrelas Você dá para o atendimento vendedor? </FormLabel>
<br></br>
<Rating
 size='large'
  name="simple-controlled"
  value={atendimentovendedor}
  onChange={estrela}
/>
<ul></ul>
<br></br>
<FormLabel id="demo-controlled-radio-buttons-group" className='flex  justify-left'>Quantas Estrelas Você dá para a organização da loja? </FormLabel>
<br></br>
<Rating
  size='large'
  name="simple-controlled"
  value={organizacaoloja}
  onChange={estrela_loja}
/>
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
      <Button type="submit" variant="contained" color="primary">
        Enviar
      </Button>
    </form>




{/* <div className='p-5 justify-center'> 
    <FormControl>
  <FormLabel id="demo-controlled-radio-buttons-group">Você se Identifica como ?</FormLabel>
  <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={value}
    onChange={handleChange}
  >
    <FormControlLabel value="female" control={<Radio />} label="Mulher" />
    <FormControlLabel value="male" control={<Radio />} label="Homem" />
  </RadioGroup>


  <Typography component="legend">Controlled</Typography>
<Rating
  name="simple-controlled"
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
/>
<Typography component="legend">Read only</Typography>


</FormControl>    

   {/* MODAL  */}
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
     Sucesso !
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
 Você já esta participando. 
    </Typography>
  </Box>
</Modal>

    </>
  )
}

export default Pesquisa
