import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Backdrop, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, FormLabel, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Rating, Select, Stack, TextField } from '@mui/material';
import { useState } from 'react'
import  { BrowserRouter, Routes,Route, Link } from "react-router-dom" ;
import DeleteIcon from '@mui/icons-material/Delete';
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


export default function Formulario_Config_Logista() {


  const [vendedores, setVendedores] = useState(['Carolina', 'Augusto', 'Beatriz', 'Bruno'])
  const [novoNome, setNovoNome] = useState('');
  const [selecionados, setSelecionados] = useState();

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


  const [openmodal, setOpenconfirm] = React.useState(false);


  const handleSubmit = (event) => { // AQUI MANDA OS DADOS PARA API E SALVA NO DB .
    event.preventDefault();
    // Aqui você pode lidar com os dados do formulário, como enviá-los para um servidor
    console.log('Dados do formulário:', { nome, idade, cidade ,sexo,atendimentovendedor,organizacaoloja});
   handleOpen();
  };

  const handleSubmit2 = (event) => { // AQUI MANDA OS DADOS PARA API E SALVA NO DB .
    event.preventDefault();
    // Aqui você pode lidar com os dados do formulário, como enviá-los para um servidor
 //   console.log('Dados do formulário:', { nome, idade, cidade ,sexo,atendimentovendedor,organizacaoloja});
   handleOpen();

  };

  const handleInputChange = (e) => {
    setNovoNome(e.target.value);
  };


  const salvarnome = () => {
    if (novoNome.trim() !== '') {
      setVendedores(vendedores => [...vendedores, novoNome]);
      setNovoNome('');
      handleClose();
    }
  };

//INICIO LISTA DE VENDEDORES 

const [checked, setChecked] = React.useState([0]);

const handleToggle = (value: number) => () => {


  
  console.log(vendedores[value])
  const currentIndex = checked.indexOf(value);
  const newChecked = [...checked];

  
  
  if (currentIndex === -1) {
    newChecked.push(value);
  } else {
    newChecked.splice(currentIndex, 1);
  }

  setChecked(newChecked);
  
//FIM LISTA DE VENDEDORESS




const  handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
}



function excluir_vendedor(value){

console.log(value)
  const newArray =  vendedores.filter(item => item !== vendedores[value]);
  console.log(newArray)
  setVendedores(newArray)
}

  return (
  <> 
      <form onSubmit={handleSubmit} className='p-10 '>
  

<TextField
  label="Nome Da Loja "
  variant="standard"
  fullWidth
  margin="normal"
  value={nome}
  onChange={(e) => setNome(e.target.value)}
/>  

      <br></br>

   
   
  <Stack direction="row" spacing={2}>

 </Stack>
<div className='p-4'> 
 <Button type="submit" variant="contained" color="primary">
      Enviar
    </Button>
<Link to="/lojista-dash">
  <Button  variant="contained" color="error" >
  Cancelar 
</Button>

</Link>
</div>
  </form>

  <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
             

  <TextField
    label="Nome do vendedor "
    variant="standard"
    fullWidth
    margin="normal"

    value={novoNome}
    onChange={handleInputChange}
  />  
   
   <button onClick={salvarnome} >
        Salvar
      </button>
 

          </Box>
        </Fade>
      </Modal>


{/* INICIO LISTA VENDEDORES  */}
{/* {vendedores.map((nome,index)=>(   */}

<button onClick={handleOpen}>
      Adicionar vendedor
    </button>
   
<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
{vendedores.map((nome,index)=> {
        const labelId = `checkbox-list-label-${index}`;

        return (
    
          <ListItem
            key={nome}
            onClick={()=>excluir_vendedor(index)}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
               
            <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
              <ListItemIcon>
               
              </ListItemIcon>
                    
                
            
              <ListItemText id ={'index'} primary={nome} />
           
            </ListItemButton>
            
          </ListItem>
        );
     
           } ) }
    </List>
    
{/* FIM LISTA VENDEDORES */}


{/* inicio caixa de confirmacao  */}


{/* fim caixa de confirmacao */}
</>

  );
}