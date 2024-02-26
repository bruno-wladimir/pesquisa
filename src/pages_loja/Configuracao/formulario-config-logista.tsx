import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Alert, Backdrop, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, FormControl, FormLabel, Grid, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Rating, Select, Stack, TextField, TextareaAutosize } from '@mui/material';
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import BarraNavegacao from '../../components/barranavegacao';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { PermCameraMic } from '@mui/icons-material';
import axios from 'axios';
import { auth} from "../../services/firebaseConfig";
import config from '../../config';
import 'firebase/storage';
import { getStorage, ref, uploadBytes ,getDownloadURL} from "firebase/storage";

const URLAPI = config.apiUrl
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
const storage = getStorage();


export default function Formulario_Config_Logista() {

  const [isBotaoVisivel, setBotaoVisivel] = useState(false);


  const [arquivo, setArquivo] = useState<string | null>(null);

  useEffect(() => {


    //  const savedArray = localStorage.getItem('vendedores');
    get_dados_lojista();

    setArquivo(localStorage.getItem("logo"))



  }, []);

  const [novoNome, setNovoNome] = useState('');
  const [selecionados, setSelecionados] = useState();

  const rootRef = React.useRef<HTMLDivElement>(null);

  //const [category, setcategory] = useState(['lojaDeRoupas', 'lojaDeCalcados', 'restaurante', 'lojaDeAcessorios']);
  const [category, setcategory] = useState(['Loja Física', 'Loja Online', 'Bares e Pubs', 'Restaurante','Salões de Beleza e Barbearias']);
  const [vendedores, setVendedores] = useState([''])

  const [nome_loja, setNomeLoja] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cidade, setCidade] = useState('');
  const [telefone_loja, setTelLoja] = useState('');
 const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cidades = ["João Monlevade"]; // Seu array de cidades

  const [openmodal, setOpenconfirm] = React.useState(false);


  const handleSubmit = (event) => { // AQUI MANDA OS DADOS PARA API E SALVA NO DB .
const logo = localStorage.getItem("logo")
const email =  localStorage.getItem("email")
console.log( )
    event.preventDefault();
    // Aqui você pode lidar com os dados do formulário, como enviá-los para um servidor
    const dadosLoja = {
      nome_loja,
      cidade,
      categoria,
      telefone_loja,
      vendedores,
      email:email,
      logo:logo
    };
    const dadosLojaJSON = JSON.stringify(dadosLoja);
    enviarFormulario(dadosLojaJSON);
  };
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleSubmit2 = (event) => { // AQUI MANDA OS DADOS PARA API E SALVA NO DB .
    event.preventDefault();
    // Aqui você pode lidar com os dados do formulário, como enviá-los para um servidor
    //   console.log('Dados do formulário:', { nome_loja, idade, cidade ,sexo,atendimentovendedor,organizacaoloja});
    handleOpen();

  };

  const handleInputChange = (e) => {
    setNovoNome(e.target.value);
  };


  const salvarnome = () => {
    if (novoNome.trim() !== '') {

      const novo_array = [...vendedores, novoNome]

      setVendedores(novo_array);//  mostrar imediatamente o valor atualizado na tela 

      localStorage.setItem("vendedores", JSON.stringify(novo_array))
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




    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
  }



  function excluir_vendedor(value) {

    console.log(value)
    const newArray = vendedores.filter(item => item !== vendedores[value]);
    console.log(newArray)
    setVendedores(newArray)
  }


  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setBotaoVisivel(true)
      setIsVisible(true);
     // uploadImage(image)

    }
  };


  async function getImageUrl() {
    // Criando uma referência para a imagem desejada

    const uid_image  = localStorage.getItem( "logo");
    if (uid_image!="undefined"){
setImage(uid_image)
return;
    }
    else{

    const uid_fire  = localStorage.getItem( "id_fire");

    const imageRef = ref(storage, 'images/'+ uid_fire);

    try {
      // Obtendo a URL de download da imagem
    
      const url = await getDownloadURL(imageRef);

      console.log('URL de download da imagem:', url);
      localStorage.setItem("logo",url)
      setImage(url)
    
    } catch (error) {
      console.error('Erro ao buscar a imagem:', error);
      throw error;
    }
  }
  }
  const handleFileChange = (event) => {

    const fileInput = event.target;
    const selectedFile = fileInput.files[0];
    // setArquivo(event.target.files[0]);
    setBotaoVisivel(true)
    setIsVisible(true);

    if (selectedFile && selectedFile.type === 'image/png' || 'image/jpg') {
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          //console.log(result)
          setArquivo(result.toString());
        }
      };

      reader.readAsDataURL(selectedFile);
    } else {
      alert('Por favor, selecione um arquivo PNG válido.');
      fileInput.value = '';
    }
  };


  const handleVisualizarArquivo = () => {
console.log("aquiiiii")
    setIsVisible(false);
  
      ///localStorage.setItem("logo", arquivo?.toString())
      uploadImage(image)
      alert("Salve as informações da Loja para salvar a logo !");
      //window.location.reload()
   
    // if (arquivo) {
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     console.log('Conteúdo do arquivo:', event.target?.result);
    //   };
    //   reader.readAsText(arquivo);
    // } else {
    //   console.log('Nenhum arquivo selecionado.');
    // }
  };
  async function uploadImage(file) {
    // Criando uma referência para o local onde a imagem será armazenada
    var uid = localStorage.getItem("id_fire")
    const storageRef = ref(storage, 'images/'+ uid); ///mudar depois para pegar no storage
  
    try {
      // Fazendo o upload da imagem para o Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Upload bem-sucedido!', snapshot);
      return snapshot;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw error;
    }
  }
  

  //funcoes API

  // Função para enviar dados do formulário
  async function enviarFormulario(informacaoes) {
    console.log(informacaoes)

    // Enviando para a API usando Axios
    const response = await axios.post(URLAPI + '/loja/salvar_dados_logista', informacaoes, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        alert('Dados Atualizados');

        window.location.reload();
      })
      .catch(error => {
        console.error('Erro ao salvar, tebte novamente');
      });

  }
  // Função para pegar dados na api
  async function get_dados_lojista() {
    // Enviando para a API usando Axios
    const response = await axios.get(URLAPI + '/loja/get_dados_lojista', {
      params: {

        email: localStorage.getItem("email")

      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Resposta da API:', response.data.loja);
        //setcategory(response.data.envio.categoria)''
        setNomeLoja(response.data.loja.nome_loja);
        setCategoria(response.data.loja.categoria);
        setCidade(response.data.loja.cidade);
        setTelLoja(response.data.loja.telefone_loja);
        setVendedores(response.data.loja.vendedores)



      })
      .catch(error => {
        console.error('Erro ao enviar para a API:', error);
      });

      getImageUrl();

  }


  return (
    <>
      <BarraNavegacao />
      <div className="flex justify-center items-center h-200 p-4">
      {image && <img src={image} className="max-w-50 max-h-50" alt="Uploaded Image" />}
</div>
   <form onSubmit={handleSubmit} className='p-10 '>


        <FormControl fullWidth sx={{ my: 2 }}>
          <TextField
            label="Nome da Loja"
            variant="outlined"
            value={nome_loja}
            required
            onChange={(e) => setNomeLoja(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            value={localStorage.getItem("email")}
            required
            onChange={(e) => setNomeLoja(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 2 }}>
          <TextField
            label="Telefone Responsável"
            variant="outlined"
            value={telefone_loja}
            required
            onChange={(e) => setTelLoja(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id="cidade-label">Cidade</InputLabel>

        <Select
        label="Cidade"
        labelId="cidade-label"
        value={cidade}
        required
        onChange={(e) => setCidade(e.target.value)}
      >
        {cidades.map((cidade, index) => (
          <MenuItem key={index} value={cidade}>
            {cidade}
          </MenuItem>
        ))}
      </Select>

        </FormControl>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Categoria</InputLabel>

          <Select

            value={categoria}
            label="Age"
            onChange={(e) => setCategoria(e.target.value)}
          >
            {category.map((nome_loja, index) => {

              return (


                <MenuItem value={nome_loja}>

                  {nome_loja}

                </MenuItem>

              )
            })}

          </Select>
    

     

          <br></br>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="file" onChange={handleImageChange} />

            <Button style={{ display: isBotaoVisivel ? 'block' : 'none' }} component="label" onClick={handleVisualizarArquivo} >
              Enviar
            </Button>

          </div>
          <div id="imageContainer" className="w-1/5 h-auto">
            {/* <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleVisualizarArquivo}>Visualizar Arquivo</button>
    </div> */}
            {arquivo && isVisible && (
              <div>
                {/* <img src={arquivo} className="w-500 h-500" alt="Uploaded Image" /> */}
              </div>
            )}
          </div>
          <Stack direction="row" spacing={2}>

          </Stack>
          <div className='p-4'>
            <Button type="submit" variant="contained" color="primary">
              Salvar Informações da Loja
            </Button>
            {/* <Link to="/lojista-dash">
              <Button variant="contained" color="error" >
                Cancelar
              </Button>

            </Link> */}
          </div>
        </FormControl>
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
      {/* {vendedores.map((nome_loja,index)=>(   */}



      {vendedores.map((nome_loja, index) => {
        return (
          <Box
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.black' }}
            aria-label="contacts"
          >

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon onClick={() => excluir_vendedor(index)}>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary={nome_loja} />
              </ListItemButton>
            </ListItem>

          </Box>
        );


      })}
       
<Grid container justifyContent="flex-start">
{/* <Button style={{ marginLeft: '16px' }}  variant="contained" onClick={handleOpen} endIcon={<AddIcon />}>
        Adicionar vendedor
      </Button> */}
      <IconButton onClick={handleOpen}>
        <AddIcon />
        Adicionar vendedor
      </IconButton>
      </Grid>

      {/* FIM LISTA VENDEDORES */}


      {/* inicio caixa de confirmacao  */}


      {/* fim caixa de confirmacao */}


    </>

  );
}