
import { useState } from 'react'
import BarraNavegacao from '../../components/barranavegacao'
import '../../App.css'
import React from 'react'
import Menu_Logista from '../../components/menu_logista'

export default function Dashboard(){


return(
<>

<BarraNavegacao/>
<div className='p-6' > 
<Menu_Logista/>
</div>


</>

)


}
