
import { useEffect, useState } from 'react'
import BarraNavegacao from '../../components/barranavegacao'
import '../../App.css'
import React from 'react'
import Menu_Logista from '../../components/menu_logista'
import { Button, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios';

import config from '../../config';

const URLAPI = config.apiUrl


export default function EnvioPesquisa() {


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
      email: localStorage.getItem("email")
    }
    //const dadosLojaJSON = JSON.stringify(dadosLoja);

    // console.log('Dados do formulário:', dadosLojaJSON);
    enviarLink(dadosLoja)

  }

  function clear() {
    setCliente('');
    setTelCliente('');
    setVendedor('');

  }
  async function enviarLink(msg) {

    await axios.post(URLAPI + '/loja/send', msg)
      .then(response => {
        alert(response.data.message)
        clear();

      })
      .catch(error => {
        alert(error)

      });

  }

  return (
    <>

      <BarraNavegacao />
      <div className='p-6' >

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
              variant="outlined"
              value={telefone_cliente}
              onChange={(e) => setTelCliente(e.target.value)}
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


      </div>

    </>

  )


}