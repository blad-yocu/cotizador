import React, { useState } from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper';
import PropTypes from 'prop-types';

const Campo = styled.div`
display:flex;
margin-bottom: 1rem;
align-items: center;
`;
const Label= styled.label`
flex:0 0 100px;
`;
const Select = styled.select`
 display: block;
 width: 100%;
 padding: 1rem;
 border:1px solid #e1e1e1;
 -webkit-appearance:none;
`;
const InputRadio = styled.input`
 margin: 0 1rem;
`;
const Boton = styled.button`
  background-color:#00838F;
  font-size:16px;
  width:100%;
  padding:1rem;
  color:#fff;
  text-transform:uppercase;
  font-weight:bold;
  border:none;
  transition: background-color .3s ease;
  margin-top: 2rem;

  &:hover{
       background-color: #26C6DA;
       cursor: pointer;
  }
`;
const Error = styled.div`
 background-color: red;
 color: white;
 padding: 1rem;
 width: 100%;
 text-align:center;
 margin-bottom:2rem;
`;
const Formulario = ({setResumen, setLoad}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan:''
    });
    const [error, setError] = useState(false);
    //extaer valores
    const {marca, year, plan } = datos;
    //leer datos
    const obtenerInfo = e =>{
        setDatos({
            ...datos,
            [e.target.name] : e.target.value,
        });
    }

    const handleSeguro = e =>{
        e.preventDefault();
          if(marca.trim() === '' || year.trim() === '' || plan.trim() === '')
          {
             setError(true);
             return
          }
          setError(false);
          let result = 2000;
          // diferencia de años
          const diferencia = obtenerDiferenciaYear(year);
          //por cada año restar 3%
          result -= ((diferencia*3) * result) / 100;
          
          //ame 15, asia 5, euro 30 %
          result = calcularMarca(marca) * result;

          //basico 20 %, Completo 50%
          const incremento = obtenerPlan(plan);

          result = parseFloat(incremento * result).toFixed(2);

          setLoad(true);

          setTimeout(() => {
              //quitar spinner
            setLoad(false);
            setResumen({
                cotizacion: Number(result),
                datos
              });
          }, 3000);
          

    }

    return ( 
        <form onSubmit={handleSeguro}>
            {error ? <Error>Todos los campos son Obligatorios</Error> : null }
            <Campo>
                <Label htmlFor="">Marca</Label>
                <Select name="marca" value={marca} onChange={obtenerInfo}>
                    <option value="">Seleccione una</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label htmlFor="">Año</Label>
                <Select name="year" value={year} onChange={obtenerInfo}>
                    <option value="">Seleccione una</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label htmlFor="">Plan</Label>
                <InputRadio type="radio" name="plan" value="basico" checked={plan === "basico"} onChange={obtenerInfo}/>Básico
                <InputRadio type="radio" name="plan" value="completo" checked={plan === "completo"} onChange={obtenerInfo}/>Completo

            </Campo>
            <Boton type="submit" >Cotizar</Boton>
        </form>
     );
}

Formulario.propTypes = {
    setResumen: PropTypes.func.isRequired,
    setLoad: PropTypes.func.isRequired
}
 
export default Formulario;