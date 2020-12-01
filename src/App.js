import React, { useState } from 'react';
import './index.css';
import Header from  './components/Header';
import Formulario from './components/Formulario';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';
import styled from '@emotion/styled';

const Contenedor = styled.div`
     max-width:600px;
     margin:0 auto;
`;
const ContenedorFormulario = styled.div`
    background-color:#FFF;
    padding:3rem;
`;


function App() {
  const [resumen, setResumen] = useState({
    cotizacion: 0,
    datos:{
      marca:'',
      year: '',
      plan: ''
    }
  }); 
  const [load, setLoad] = useState(false);
  //extraer datos
  const {datos, cotizacion} =resumen;

  return (
    <Contenedor>
      <Header title="Cotizador de seguros"/>
      <ContenedorFormulario>
        <Formulario setResumen={setResumen} setLoad={setLoad}/>
         { load ? <Spinner /> : null }
        {!load ? <Resumen datos={datos}/> : null}
        { !load ? <Resultado cotizacion={cotizacion}/> : null}
      </ContenedorFormulario>
    </Contenedor>
  );
}

export default App;
