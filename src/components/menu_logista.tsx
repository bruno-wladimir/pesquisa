import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import { Avatar, Card, CardContent, Divider, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from '@mui/material';
import { minHeight, } from '@mui/system';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Bar } from 'react-chartjs-2';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
const URLAPI = config.apiUrl
const perguntas_abertas = []  as { pergunta_aberta: string; resposta_aberta: string }[];


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
  const [perguntas_media, setRespostas] = useState<{ pergunta: string; media: number ; tipo: number}[]>([]);
  const [quantidade_respostas, setQtdrespostas] = useState(0);
  const [qtd_aguardando, setqtd_aguardando] = useState(0);
  const [qtd_envio,   setTotalenvio ] = useState(0);

  const customIcons = {
   
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Very Satisfied',
    },
  };
  const customIconsYesOrNot = {
    0: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Very Dissatisfied',
    },
  
    1: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Very Satisfied',
    },
  };


  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  function IconContainerYerOrNot(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIconsYesOrNot[value].icon}</span>;
  }
  
  
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
        const { pergunta_aberta, resposta_aberta: resposta_aberta} = questionario;

        // Verifica se a pergunta já está presente no array
       
        const perguntaIndex = mediaRespostasPorPergunta.findIndex(item => item.pergunta === pergunta);
        const pergunta_abertaIndex = perguntas_abertas.findIndex(item => item.pergunta_aberta === pergunta_aberta);


// if (pergunta_abertaIndex ===-1){
//   perguntas_abertas.push({ pergunta_aberta,resposta_aberta:resposta_aberta  });
//   console.log(perguntas_abertas)

// }
// else{
//   perguntas_abertas[pergunta_abertaIndex].resposta_aberta +=resposta_aberta ;
//   console.log(perguntas_abertas)

// }
        if (pergunta_aberta){
          perguntas_abertas.push({ pergunta_aberta, resposta_aberta :resposta_aberta });

        }
      

        
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

          if (valorResposta =="S" ||valorResposta =="N" ){

            mediaRespostasPorPergunta[perguntaIndex].tipo = 2 ;

            mediaRespostasPorPergunta[perguntaIndex].quantidade++ // quentidade de pessoas que votou 

            if (valorResposta =="S"){
              mediaRespostasPorPergunta[perguntaIndex].total += 1; 

            }
         

            console.log("pergunta sim",mediaRespostasPorPergunta[perguntaIndex])
          } 
     
          else{
            console.log('entrei em perguntas quantitativas ');

          mediaRespostasPorPergunta[perguntaIndex].total += converterRespostaParaValor(valorResposta);
          mediaRespostasPorPergunta[perguntaIndex].quantidade++;
          mediaRespostasPorPergunta[perguntaIndex].tipo = 1;

          }
          //setRespostas(mediaRespostasPorPergunta)
        }
      });
    });


    const perguntasMedia = mediaRespostasPorPergunta.map(item => ({
      
      pergunta: item.pergunta,
     
      // media: (item.total / item.quantidade).toFixed(1)
            // media: (item.tipo ===2)? ( (item.total/item.quantidade)*100 ).toFixed(1).toString(): (item.total/item.quantidade).toFixed(1)
            media: (item.tipo ===2)? ( (item.total/item.quantidade)*100 ): (item.total/item.quantidade),

            tipo: item.tipo
    }));
    setRespostas(perguntasMedia)
    console.log(perguntas_media);

  }
  function converterRespostaParaValor(resposta) {
    switch (resposta) {
      case "R1":
        return 5;
      case "R2":
        return 4;
        case "R3":
          return 3;
          case "R4":
          return 2;
          case "R5":
          return 1;
          case "Sem comentários":
            return 0
      case "S":
        return 1;
        case "N":
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


<div >
</div>
<Card sx={{ textAlign: 'center' }}>
    <CardContent>
<span className="text-lg font-bold text-blue-600">Você possui <span className="text-green-600">{ quantidade_respostas }</span> avaliações  { quantidade_respostas > 0 ? '🎉': '🕒'}</span> <br></br>
<span className="text-lg font-bold text-blue-600"><span className="text-green-600">{ qtd_aguardando }</span> Mensagens Aguardando envio 🕒 </span> <br></br>

<span className="text-lg font-bold text-blue-600"><span className="text-green-600">{ qtd_envio }</span> Mensagens enviadas 📤 </span> <br></br>

<span className="text-lg font-bold text-blue-600">Taxa de Abertura <span className="text-green-600">   { (quantidade_respostas /qtd_envio *100).toFixed(0) }  </span> % 📊</span>
</CardContent>
</Card>
<Typography className='p-4'>
Avaliações: 

</Typography>

      {perguntas_media.map(( feedback: any, index) => (

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
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
                {/* <strong>{ feedback.media ==0 ? `${`Sem Informações`}` : feedback.media >5 ? `${feedback.media} % votou Sim` :  `${feedback.media} de 5` } </strong> */}
                {/* <strong>{ feedback.media ==0 ? `${`Sem Informações`}` : feedback.media >5 ? `${feedback.media} % votou Sim` :  `${feedback.media} de 5` } </strong> */}
               
                {feedback.media !== undefined && feedback.tipo ==1 &&(
  <Rating
    name="customized-icons"
    defaultValue={feedback.media}
    //getLabelText={(value) => customIcons[value].label}
    IconContainerComponent={IconContainer}
    readOnly
    
  />
)}
       {feedback.media !== undefined && feedback.tipo === 2 && (
                <strong>{ feedback.media ==0 ? `${`Sem Informações`}` : feedback.media >5 ? `${feedback.media.toFixed(1)} % votou Sim` :  `${feedback.media} de 5` } </strong>

)}         
              </Typography>
            </React.Fragment>
            
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      
      
    </List>

))}



{perguntas_abertas.length > 0 ? (
  <>
  <div className='p-10'>Sujestões: </div> 

  <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        margin: '0 auto', // Centraliza horizontalmente

        '& ul': { padding: 0 },
      }}
    >
{ perguntas_abertas.map((sectionId: any, index) => (

<li key={`section-${sectionId}`}>
<ul>
  <ListSubheader>Pergunta {index+1 } - {sectionId.pergunta_aberta}</ListSubheader>
  <ListSubheader><strong>  Resposta:{sectionId.resposta_aberta}</strong></ListSubheader>

  
  
</ul>
</li>
))}
</List>
</>
) :(
<div>Não há Sujestões</div>
)}
    </>
  );
};