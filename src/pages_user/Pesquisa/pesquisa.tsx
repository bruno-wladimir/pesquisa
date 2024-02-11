import { useEffect, useState } from 'react'
import BarraNavegacao from '../../components/barranavegacao'
import '../../App.css'
import React from 'react'
import { BottomNavigation, BottomNavigationAction, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControl, FormControlLabel, FormLabel, MenuItem, Modal, Radio, RadioGroup, Rating, Select, TextField, Typography } from '@mui/material'

import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import { AlignHorizontalCenter } from '@mui/icons-material'
import axios from 'axios';
import config from '../../config';

const URLAPI = config.apiUrl

function Pesquisa() {

  useEffect(() => {

    get_dados_lojista();

  }, []);


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
  // const [perguntas, setPerguntas] = useState<DadosAPI[]>([]);


  const [selecoes, setSelecoes] = useState<string[]>([]);

  const [dados, setDados] = useState({

    categoria: String,
    perguntas: String[''],

  });



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
  function handleChange(a) {
    console.log("Estou aqui ", a.target.value)
  }

  function setValue(newValue: number | null) {
    throw new Error('Function not implemented.')
  }
  const handleSubmit = async (event) => { // AQUI MANDA OS DADOS PARA API E SALVA NO DB .
    event.preventDefault();
    // Aqui você pode lidar com os dados do formulário, como enviá-los para um servidor
    // console.log('Dados do formulário:', { nome, idade, cidade ,sexo,atendimentovendedor,organizacaoloja});
    try {
      const dadosParaEnviar = {
        respostas: dados.perguntas.map((pergunta, index) => ({
          pergunta: pergunta.pergunta,
          resposta: selecoes[index] || '', // Use o array de seleções
        })),
        link: localStorage.getItem("link")
      };
      console.log(dadosParaEnviar)

      const resposta = await axios.post(URLAPI + '/user/salvar_resposta', dadosParaEnviar);

      // Lide com a resposta da API, se necessário
      console.log('Resposta da API:', resposta.data);

      if (resposta.data.message == "Resposta Salva") {
        alert("Pesquisa Enviada !")
      }

      if (resposta.data.message == "link ja usado") {
        alert("Link Já Utilizado")
      }
      else {


      }

    } catch (erro) {
      console.error('Erro ao enviar dados para a API:', erro);
    }

    //handleOpen();


  };

  // pegar perguntas no db 

  async function get_dados_lojista() {

    // Enviando para a API usando Axios
    const response = await axios.get(URLAPI + "/user/get_perguntas", {
      params: {

        link: localStorage.getItem("link")

      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {

        const dadosDaResposta = response;

        console.log(dadosDaResposta.data.resposta[0].perguntas);

        setDados(dadosDaResposta.data.resposta[0])

      })
      .catch(error => {
        console.error('Erro ao enviar para a API:', error);
      });

  }

  const handleSelecaoChange = (index: number, valor: string) => {
    setSelecoes((prevSelecoes) => {
      const novasSelecoes = [...prevSelecoes];
      novasSelecoes[index] = valor;
      return novasSelecoes;
    });
  };


  return (
    <>
      <div>
        <BarraNavegacao />
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


          {/* <div>
      <h2>Perguntas da API</h2>
      {perguntas.map((item, index) => (
        <div key={index}>
          <h3>Categoria: {item.categoria}</h3>
          <ul>
            {item.perguntas.map((pergunta, perguntaIndex) => (
              <li key={perguntaIndex}>
                {pergunta.pergunta} - Opções: {pergunta.opcoes.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div> */}



        </div>
      </Typography>
      {/* 
      <div>
        <h2>Perguntas e Opções</h2>
        <ul>
          {dados && dados.perguntas && dados.perguntas.map((pergunta, index) => (
            <li key={index}>
              <strong>{pergunta.pergunta}</strong>
              {pergunta.opcoes.length > 0 ? (
                <ul>
                  {pergunta.opcoes.map((opcao, opcaoIndex) => (
                    <li key={opcaoIndex}>{opcao}</li>
                  ))}
                </ul>
              ) : (
                <p>Sem opções disponíveis.</p>
              )}
            </li>
          ))}
        </ul>
      </div> */}


      <form onSubmit={handleSubmit} className='p-10 '>

        {dados && dados.perguntas && dados.perguntas.map((pergunta, index) => (
          <div key={index}>
            <FormLabel id="demo-controlled-radio-buttons-group" className='flex justify-left'>
              {pergunta.pergunta}
            </FormLabel>

            {pergunta.opcoes.length > 0 ? (
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name={`controlled-radio-buttons-group-${index}`} // Use um nome de grupo único para cada pergunta
                value={selecoes[index] || ''} // Certifique-se de que a variável 'sexo' está definida no estado do componente
                onChange={(e) => handleSelecaoChange(index, e.target.value)}

              >
                {pergunta.opcoes.map((opcao, opcaoIndex) => (
                  <FormControlLabel
                    key={opcaoIndex}
                    value={opcao}
                    control={<Radio />}
                    label={opcao}
                  />
                ))}
              </RadioGroup>
            ) : (
              <TextField

                fullWidth
                margin="normal"
                value={nome}
                onChange={(e) => setNome(e.target.value)}

              />
            )}
          </div>
        ))}

        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>

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
