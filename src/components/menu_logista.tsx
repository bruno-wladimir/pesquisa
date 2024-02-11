import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from '@mui/material';
import { minHeight, } from '@mui/system';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
const URLAPI = config.apiUrl




const rows = [
  createData("12/01/1991", 'Bruno', 33, 6.0, 5, "Faltou variedade"),
  createData("12/01/1991", 'Bia', 31, 9.0, 4, "nada a reclamar"),
  createData("12/01/1991", 'Raynara', 22, 16.0, 2, "Boa localizacao"),
  createData("12/01/1991", 'Renato', 2, 3.7, 1, "vendedor mau educado, poderia melhorar o atendimento "),
  createData("12/01/1991", 'Jose das couves', 30, 16.0, 3, "Gostei bastante"),

  createData("12/01/1991", 'Bruno', 33, 6.0, 5, "Faltou variedade"),
  createData("12/01/1991", 'Bia', 31, 9.0, 4, "nada a reclamar"),
  createData("12/01/1991", 'Raynara', 22, 16.0, 2, "Boa localizacao"),
  createData("12/01/1991", 'Renato', 2, 3.7, 1, "vendedor mau educado, poderia melhorar o atendimento "),
  createData("12/01/1991", 'Jose das couves', 30, 16.0, 3, "Gostei bastante"),
  // ... mais dados

];

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

function createData(
  Data: string,
  Nome: string,
  Idade: number,
  Atendimento_vendedor: number,

  Organizacao_loja: number,
  observacoes: string,
) {
  return { Nome, Data, Idade, Atendimento_vendedor, Organizacao_loja, observacoes };
}


export default function Menu_Logista() {

  // const [perguntas_media,setRespostas] = useState<{ pergunta: string; total: number; quantidade: number; }[]>([]);
  const [perguntasRespostasAgrupadas, setPerguntasRespostasAgrupadas] = useState({});
  const [perguntas_media, setRespostas] = useState<{ pergunta: string; media: string }[]>([]);


  useEffect(() => {


    get_respostas();



  }, []);


  async function get_respostas() {



    let somaValores = 0;
    let numRespostas = 0;
    const respostasAgrupadas = {};

    const response = await axios.get(URLAPI + '/loja/get_respostas', {
      params: {

        email: localStorage.getItem("email")

      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {

        //calculateAverages(response.data.response)
        console.log(response.data.response)

        ///const valoresAgrupados = group(response.data.response);
        group(response.data.response)




      })
      .catch(error => {
        console.error('Erro ao enviar para a API:', error);
      });
  }



  function group(array) {

    const mediaRespostasPorPergunta = [] as { pergunta: string; total: number; quantidade: number }[];

    console.log(array);


    array.forEach(questionario => {
      // Iterando sobre as respostas de cada questionário
      questionario.respostas.forEach(questionario => {
        const { pergunta, resposta: valorResposta } = questionario;

        // Verifica se a pergunta já está presente no array

        const perguntaIndex = mediaRespostasPorPergunta.findIndex(item => item.pergunta === pergunta);

        if (perguntaIndex === -1) {
          // Se não estiver presente, adiciona a pergunta ao array

          mediaRespostasPorPergunta.push({ pergunta, total: converterRespostaParaValor(valorResposta), quantidade: 1 });

          // setRespostas(mediaRespostasPorPergunta)
        } else {
          // Se já estiver presente, atualiza os valores
          // let converter = converterRespostaParaValor(valorResposta)
          if (valorResposta =="Sim"){

            console.log('entou no sim');
            mediaRespostasPorPergunta[perguntaIndex].quantidade++
            mediaRespostasPorPergunta[perguntaIndex].total += 1*100;
          } 
          else{

          mediaRespostasPorPergunta[perguntaIndex].total += converterRespostaParaValor(valorResposta);
          mediaRespostasPorPergunta[perguntaIndex].quantidade++;
          }
          //setRespostas(mediaRespostasPorPergunta)
        }
      });
    });


    const perguntasMedia = mediaRespostasPorPergunta.map(item => ({
      pergunta: item.pergunta,
      media: (item.total / item.quantidade).toFixed(1)
    }));
    setRespostas(perguntasMedia)
    console.log(perguntas_media);

  }
  function converterRespostaParaValor(resposta) {
    switch (resposta) {
      case "Excelente":
        return 5;
      case "Bom":
        return 2.5;
        case "Regular":
          return 1.5;
          case "Ruim":
          return 0;
      case "sim":
        return 1;
      default:
        return 0; // Valor padrão para respostas desconhecidas
    }
  }
  const calculateAverages = (respostas) => {
    // Objeto para armazenar respostas agrupadas por pergunta

    const groupedQuestions = {};

    // Agrupar respostas por pergunta e contar ocorrências de cada resposta
    respostas.forEach(resposta => {
      console.log(resposta.respostas);
      const { pergunta, resposta: respostaTexto } = resposta.respostas;
      if (!groupedQuestions[pergunta]) {
        groupedQuestions[pergunta] = {
          total: 1,
          counts: { [respostaTexto]: 1 }
        };
      } else {
        groupedQuestions[pergunta];
        if (!groupedQuestions[pergunta]) {
          groupedQuestions[pergunta] = 1;
        } else {
          groupedQuestions[pergunta];
        }
      }
    });
    console.log(groupedQuestions)


  }

  return (
    <>
      {/* <div>

        {perguntas_media.map((feedback: any, index) => (
          <div key={index}>
            <h3>{ index +1} -  {feedback.pergunta}</h3>
            <ul>
              <li key={index}>
                <strong>{ feedback.media ==0 ? `${`Sem Informações`}` : feedback.media >5 ? `${feedback.media}%` :  `${feedback.media} de 5` } </strong>
              </li>

            </ul>
          </div>
        ))}


      </div> */}

      {perguntas_media.map((feedback: any, index) => (

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
          <QuestionAnswerIcon></QuestionAnswerIcon>
        </ListItemAvatar>
        <ListItemText
          primary= {feedback.pergunta}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                <strong>{ feedback.media ==0 ? `${`Sem Informações`}` : feedback.media >5 ? `${feedback.media}% de 100%` :  `${feedback.media} de 5` } </strong>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      
      
    </List>

))}









    </>
  );
}