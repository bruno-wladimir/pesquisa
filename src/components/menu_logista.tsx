import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { minHeight } from '@mui/system';
import React, { useEffect, useState } from 'react';


  
const rows = [
    createData("12/01/1991", 'Bruno', 33, 6.0, 5, "Faltou variedade"),
    createData("12/01/1991", 'Bia', 31, 9.0, 4, "nada a reclamar"),
    createData("12/01/1991", 'Raynara', 22, 16.0, 2, "Boa localizacao"),
    createData("12/01/1991", 'Renato', 2, 3.7, 1, "vendedor mau educado, poderia melhorar o atendimento "),
    createData("12/01/1991", 'Jose das couves', 30, 16.0, 3, "Gostei bastante"),

    createData("12/01/1991", 'Bruno', 33, 6.0, 5, "Faltou variedade"),
    createData("12/01/1991", 'Bia', 31, 9.0, 4, "nada a reclamar"),
    createData("12/01/1991", 'Raynara', 22, 16.0, 2, "Boa localizacao"),
    createData("12/01/1991", 'Renato', 2, 3.7, 1, "vendedor mau educado, poderia melhorar o atendimento "),
    createData("12/01/1991", 'Jose das couves', 30, 16.0, 3, "Gostei bastante"),
    // ... mais dados

];

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save'},
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
    return { Nome,Data, Idade, Atendimento_vendedor, Organizacao_loja, observacoes };
  }


export default function Menu_Logista() {

    var somaNotas=0;
    var soma_organizacao =0;
    var [Media, setMedia] = useState(0)
    var [Media_org, setMedia_org] = useState(0)


    useEffect(() => {
        var media=0;
        var media_organizaçào=0;
          {rows.map((item, index) => (
         //   console.log("Media: "+ item.Nome)

            somaNotas += item.Atendimento_vendedor
            

            ))}
            {rows.map((item, index) => (
                //   console.log("Media: "+ item.Nome)
       
                soma_organizacao += item.Organizacao_loja
                   
       
                   ))}
                   media_organizaçào = soma_organizacao / rows.length
          media = somaNotas/rows.length;
    // console.log("Media: "+ media)
    setMedia_org(Number(media_organizaçào.toFixed(2)))
     setMedia(Number(media.toFixed(2)))

    return () => {
        // Código de limpeza, se necessário
        console.log("Componente desmontado.");
      };
    

    }, []);

  return (
<>

<div> 

<Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={3} >
      Média <br></br> atendimento vendedor: { Media}
    </Paper>
      
    <Paper elevation={3} >
      Média <br></br> Organizacão loja: { Media_org}
    </Paper>

    </Box>


<TableContainer component={Paper} style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
           

            <TableCell>Nome</TableCell>
            <TableCell>Data</TableCell>

            <TableCell align="right">Idade</TableCell>
            <TableCell align="right">Atendimento_vendedor</TableCell>
            <TableCell align="right">Organizacao_loja</TableCell>
            <TableCell align="right">observacoes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Nome}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.Nome} </TableCell>
              <TableCell component="th" scope="row">{row.Data} </TableCell>

              <TableCell align="right">{row.Idade}</TableCell>
              <TableCell align="right">{row.Atendimento_vendedor}</TableCell>
              <TableCell align="right">{row.Organizacao_loja}</TableCell>
              <TableCell align="right">{row.observacoes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  



    </div>
    {/* <Link to={ '/form-logista'}> 
        <Box >
                <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
    
      </SpeedDial>
      </div> 
    </Box>
    </Link> */}
    </>
  );
}