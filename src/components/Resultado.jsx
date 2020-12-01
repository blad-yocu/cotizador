import React from 'react';
import styled from '@emotion/styled';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import PropTypes from 'prop-types';

const Mensaje = styled.p`
  background-color: rgb(127,224,237);
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;

`;

const ResultadoCot = styled.div`
 text-align:center;
 padding: .5rem;
 border: 1px solid #26c6DA;
 background-color:rgb(127,224,237);
 margin-top: 1rem;
 position:relative;
`;

const TextoCot = styled.p`
 color: #00838F;
 padding: 1rem;
 text-transform: uppercase;
 margin: 0;
`;

const Resultado = ({cotizacion}) => {

    return (cotizacion) === 0 ? <Mensaje>Elige marca, año y tipo</Mensaje> 
    :
    <ResultadoCot>
        <TransitionGroup component="span" className="resultado" />
        <CSSTransition classNames="resultado" key={cotizacion} timeout={{enter: 500, exit:500}}>
        <TextoCot> La cotización es: $ <span>{cotizacion}</span></TextoCot>
        </CSSTransition>
        
    </ResultadoCot> 
}
 
Resultado.propTypes = {
    cotizacion: PropTypes.number.isRequired
}
export default Resultado;