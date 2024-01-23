import { useState } from 'react'
import BarraNavegacao from '../../components/barranavegacao'
import '../../App.css'
import React from 'react'
function Sobre() {
  const [count, setCount] = useState(0)

function clique(a:any){

  console.log( a)
}

  return (
    <>
    <div>
    <BarraNavegacao/>
    </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          </a>
       </div>
       <h1 className='text-red-500'>TESTE </h1>
    </>
  )
}

export default Sobre
