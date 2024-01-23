import { useState } from 'react'
import Button from '@mui/material/Button';
import BarraNavegacao from '../../components/barranavegacao'
import CardComponent from '../../components/card';
import React from 'react';
import { Link } from 'react-router-dom';
function Dash() {

  const [count, setCount] = useState(206)

function clique(){

  setCount(count +1);
}

  return (
<>
<div>
<BarraNavegacao/>
</div>
<div className='p-4 flex items-center justify-center '>
<CardComponent/>
</div>
    <div className='p-10'>
      <Link to={'/pesquisa'} > 
       <Button variant="contained" onClick={clique} >Iniciar Pesquisa</Button>
       </Link>
        </div>
    </>
  )
}
export default Dash;