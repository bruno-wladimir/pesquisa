import { useState } from 'react'
import Button from '@mui/material/Button';
import BarraNavegacao from '../../components/barranavegacao'
import CardComponent from '../../components/card';
import React from 'react';
import { Link } from 'react-router-dom';
function PaginaEntradaUser() {
const [count, setCount] = useState(206)

function clique(){

  setCount(count +1);
}

  return (
<>
<div>
<BarraNavegacao/>
</div>
<div className='p-6 flex items-center justify-center '>
<CardComponent/>
</div>
    <div className='p-10'>
      <Link to={'/user-pesquisa'} > 
       <Button variant="contained" onClick={clique} >Quero Concorrer!</Button>
       </Link>
        </div>
    </>
  )
}
export default PaginaEntradaUser;