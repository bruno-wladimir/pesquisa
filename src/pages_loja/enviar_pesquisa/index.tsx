
import { useEffect, useState } from 'react'
import BarraNavegacao from '../../components/barranavegacao'
import '../../App.css'
import React from 'react'
import Menu_Logista from '../../components/menu_logista'
import { Box, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios';
import { CircularProgress } from '@mui/material';

import config from '../../config';

const URLAPI = config.apiUrl


export default function EnvioPesquisa() {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const [nome_cliente, setCliente] = useState('')
  const [telefone_cliente, setTelCliente] = useState('');
  const [vendedor, setVendedor] = useState('');
  const [vendedores, setVendedores] = useState([]);

  const [loja, setIdLoja] = useState(localStorage.getItem("id"))


  const [dadosFormulario, setDadosFormulario] = React.useState({
    nome: '',
    telefone: '',
    vendedor: '',

  });

  useEffect(() => {

    const savedArray = localStorage.getItem('vendedores');
    setImage(localStorage.getItem("logo"))
    if (savedArray) {
      try {
        setVendedores(JSON.parse(savedArray));
      }
      catch {

      }
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para lidar com os dados do formulário, por exemplo, enviar para um servidor
    // Aqui você pode lidar com os dados do formulário, como enviá-los para um servidor
    const dadosLoja = {
      nome_cliente,
      telefone_cliente,
      vendedor,
      loja,
      email: localStorage.getItem("email"),
      urlimage: localStorage.getItem("urlimage")
    }
    //const dadosLojaJSON = JSON.stringify(dadosLoja);

    // console.log('Dados do formulário:', dadosLojaJSON);
    enviarLink(dadosLoja)

  }
  const validartelefone = (event) => {
    
    const { value } = event.target;
    // Remove qualquer caractere não numérico
    const cleanedValue = value.replace(/\D/g, '');
    // Se o número de caracteres for maior que 11, não permite mais caracteres
    if (cleanedValue.length > 11) return;
    // Formatar número de telefone
    const formattedValue = formatPhoneNumber(cleanedValue);
    // Atualizar o estado com o número formatado
    // Validar o número de telefone
    setTelCliente(formattedValue);

    console.log(formattedValue)

    if (isValidPhoneNumber(formattedValue)) {
      setError('');


    } else {
      setError('Número de telefone inválido');
    }



  };

  // Função para formatar o número de telefone
  const formatPhoneNumber = (setTelCliente) => {
    const match = setTelCliente.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return setTelCliente;
  };

  // Função para validar o número de telefone
  const isValidPhoneNumber = (setTelCliente) => {
    return /^\(\d{2}\)\s?\d{5}-\d{4}$/.test(setTelCliente);
  };

  function clear() {
    setCliente('');
    setTelCliente('');
    setVendedor('');

  }
  async function enviarLink(msg) {
    setLoading(true);

    await axios.post(URLAPI + '/loja/send', msg)
      .then(response => {
        clear();
        alert(response.data.message)
        setLoading(false);

      })
      .catch(error => {
        alert(error)

      });

  }

  return (
    <>
      <BarraNavegacao />
      
      <div className='p-6' >
      <div className="flex justify-center items-center h-200 p-4">
      {image && <img src={image} className="max-w-50 max-h-50" alt="Uploaded Image" />}
</div>


      {loading ? (
        // Se loading for verdadeiro, exibe o indicador de carregamento
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <CircularProgress />
</div>      ) : (

        <form onSubmit={handleSubmit} className='p-4 '>

          <FormControl fullWidth sx={{ my: 2 }}>
            <TextField
              label="Nome Cliente"
              variant="outlined"
              value={nome_cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 2 }}>
            <TextField
              label="Telefone "
              error={!!error}
              variant="outlined"
              helperText={error}

              value={telefone_cliente}
              onChange={(e) => validartelefone(e)}
            />
          </FormControl>


          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel>Vendedor</InputLabel>

            <Select

              value={vendedor}
              label="Age"
              onChange={(e) => setVendedor(e.target.value)}
            >
              {vendedores.map((vendedor, index) => {


                return (


                  <MenuItem value={vendedor}>

                    {vendedor}

                  </MenuItem>

                )
              })}

            </Select>


          </FormControl>
          <Button type="submit">Enviar</Button>

        </form>

)}
      </div>

    </>

  )


}