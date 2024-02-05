import axios from "axios";

import config from '../config';

const URLAPI = config.apiUrl

 export  const get_dados_lojista_api = async ()=>{


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
        // setNomeLoja(response.data.loja.nome_loja );
        // setCategoria(response.data.loja.categoria );
        // setCidade(response.data.loja.cidade);
        // setTelLoja(response.data.loja.telefone_loja);
        // setVendedores(response.data.loja.vendedores)
        // var  dadosLoja = {
        //   nome_loja,
        //   cidade,
        //   categoria,
        //   telefone_loja,
        //   vendedores,
        //   email: localStorage.getItem("email")
        // } 

        return response
      })
      .catch(error => {
        console.error('Erro ao enviar para a API:', error);
      });


return 
}

 export default get_dados_lojista_api;