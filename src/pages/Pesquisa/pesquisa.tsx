import { useState } from 'react'
import BarraNavegacao from '../../components/barranavegacao'
import '../../App.css'
import React from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Rating, Select, TextField, Typography } from '@mui/material'
function Pesquisa() {
  const [count, setCount] = useState(0)
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cidade, setCidade] = useState('');
  const [sexo, setSexo] = useState('');
  const [atendimentovendedor, setAtendimentoVendedor] = useState(null);
  const [organizacaoloja, setOrganizacaoloja] = useState(null);


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
    const handleSubmit = (event) => {
        event.preventDefault();
        // Aqui você pode lidar com os dados do formulário, como enviá-los para um servidor
        console.log('Dados do formulário:', { nome, idade, cidade ,sexo,atendimentovendedor,organizacaoloja});
      };
  return (
    <>
    <div>
    <BarraNavegacao/>
    </div>

    <Typography variant="h5" gutterBottom className='p-4'>
Vamos Começar :)
      </Typography>
    <form onSubmit={handleSubmit} className='p-10'>

    <FormLabel id="demo-controlled-radio-buttons-group">Você se Identifica como ?</FormLabel>

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
  <FormLabel id="demo-controlled-radio-buttons-group">Quantas Estrelas Você dá para o atendimento vendedor? </FormLabel>
<br></br>
<Rating
  name="simple-controlled"
  value={atendimentovendedor}
  onChange={estrela}
/>
<br></br>
<FormLabel id="demo-controlled-radio-buttons-group">Quantas Estrelas Você dá para a organização da loja? </FormLabel>
<br></br>
<Rating
  name="simple-controlled"
  value={organizacaoloja}
  onChange={estrela_loja}
/>
      <TextField
        label="Nome"
        variant="outlined"
        fullWidth
        margin="normal"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <TextField
        label="Idade"
        variant="outlined"
        fullWidth
        margin="normal"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />
      <Select
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
      </Select>
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
</div> */}


    </>
  )
}

export default Pesquisa
