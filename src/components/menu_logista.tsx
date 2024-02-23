import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import { Avatar, Card, CardContent, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from '@mui/material';
import { minHeight, } from '@mui/system';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
const URLAPI = config.apiUrl


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
  const [quantidade_respostas, setQtdrespostas] = useState(0);
  const [qtd_aguardando, setqtd_aguardando] = useState(0);
  const [qtd_envio,   setTotalenvio ] = useState(0);


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
        console.log(response)
       // console.log(response.data.aguardando_envio.length)
        setqtd_aguardando(response.data.aguardando_envio.length)
        ///const valoresAgrupados = group(response.data.response);
        setQtdrespostas(response.data.response.length)
        
        setTotalenvio(response.data.qtd_envio)

        
        group(response.data.response)




      })
      .catch(error => {
        console.error('Erro ao enviar para a API:', error);
      });
  }



  function group(array) {
console.log("function group")
    const mediaRespostasPorPergunta = [] as { pergunta: string; total: number; quantidade: number, tipo: number }[];

    console.log(array);


    array.forEach(questionario => {
      // Iterando sobre as respostas de cada questionário
      questionario.respostas.forEach(questionario => {
        const { pergunta, resposta: valorResposta } = questionario;
          
        // Verifica se a pergunta já está presente no array

        const perguntaIndex = mediaRespostasPorPergunta.findIndex(item => item.pergunta === pergunta);

        if (perguntaIndex === -1) {
          // Se não estiver presente, adiciona a pergunta ao array
          console.log("pergunta nao esta no array")
          mediaRespostasPorPergunta.push({ pergunta, total: converterRespostaParaValor(valorResposta), quantidade: 1, tipo:1 });
          let converter = converterRespostaParaValor(valorResposta)
         
         
          // if (valorResposta =="Sim"){

          //   console.log('entou no sim');
          //   mediaRespostasPorPergunta[perguntaIndex].quantidade++
          //   mediaRespostasPorPergunta[perguntaIndex].total += 1*100;
          // } 
          // setRespostas(mediaRespostasPorPergunta)
        } 
        
        else {
          // Se já estiver presente, atualiza os valores
         let converter = converterRespostaParaValor(valorResposta)

          if (valorResposta =="Sim" ||valorResposta =="Não" ){

            mediaRespostasPorPergunta[perguntaIndex].tipo = 2 ;

            mediaRespostasPorPergunta[perguntaIndex].quantidade++ // quentidade de pessoas que votou 

            if (valorResposta =="Sim"){
              mediaRespostasPorPergunta[perguntaIndex].total += 1; 

            }
         

            console.log("pergunta sim",mediaRespostasPorPergunta[perguntaIndex])
          } 
     
          else{
            console.log('entrei em perguntas quantitativas ');

          mediaRespostasPorPergunta[perguntaIndex].total += converterRespostaParaValor(valorResposta);
          mediaRespostasPorPergunta[perguntaIndex].quantidade++;
          }
          //setRespostas(mediaRespostasPorPergunta)
        }
      });
    });


    const perguntasMedia = mediaRespostasPorPergunta.map(item => ({
      
      pergunta: item.pergunta,
     
      // media: (item.total / item.quantidade).toFixed(1)
            media: (item.tipo ===2)? ( (item.total/item.quantidade)*100 ).toFixed(1).toString(): (item.total/item.quantidade).toFixed(1)

    }));
    setRespostas(perguntasMedia)
    console.log(perguntas_media);

  }
  function converterRespostaParaValor(resposta) {
    switch (resposta) {
      case "Excelente":
        return 5;
      case "Bom":
        return 4;
        case "Regular":
          return 3;
          case "Ruim":
          return 2;
          case "Péssimo":
          return 1;
          case "Sem comentários":
            return 0
      case "Sim":
        return 1;
        case "Não":
          return 0;

      default:
        return 0; // Valor padrão para respostas desconhecidas
    }
  }
  // const calculateAverages = (respostas) => {
  //   // Objeto para armazenar respostas agrupadas por pergunta

  //   const groupedQuestions = {};

  //   // Agrupar respostas por pergunta e contar ocorrências de cada resposta
  //   respostas.forEach(resposta => {
  //     console.log(resposta.respostas);
  //     const { pergunta, resposta: respostaTexto } = resposta.respostas;
  //     if (!groupedQuestions[pergunta]) {
  //       groupedQuestions[pergunta] = {
  //         total: 1,
  //         counts: { [respostaTexto]: 1 }
  //       };
  //     } else {
  //       groupedQuestions[pergunta];
  //       if (!groupedQuestions[pergunta]) {
  //         groupedQuestions[pergunta] = 1;
  //       } else {
  //         groupedQuestions[pergunta];
  //       }
  //     }
  //   });
  //   console.log(groupedQuestions)


  // }

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
<div >
</div>
<Card sx={{ textAlign: 'center' }}>
    <CardContent>
<span className="text-lg font-bold text-blue-600">Você possui <span className="text-green-600">{ quantidade_respostas }</span> avaliações  { quantidade_respostas > 0 ? '🎉': '🕒'}</span> <br></br>
<span className="text-lg font-bold text-blue-600"><span className="text-green-600">{ qtd_aguardando }</span> Mensagens Aguardando envio 🕒 </span> <br></br>

<span className="text-lg font-bold text-blue-600"><span className="text-green-600">{ qtd_envio }</span> Mensagens enviadas 📤 </span> <br></br>

<span className="text-lg font-bold text-blue-600">Taxa de Abertura <span className="text-green-600">   { quantidade_respostas /qtd_envio *100}  </span> % 📊</span>
</CardContent>
</Card>
<Typography className='p-4'>
Avaliações: 

</Typography>

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
                sx={{ display: 'inline',color:'#2c5282',fontSize: '1.2rem', textAlign: 'center' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                <strong>{ feedback.media ==0 ? `${`Sem Informações`}` : feedback.media >5 ? `${feedback.media} % votou Sim` :  `${feedback.media} / 5` } </strong>
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