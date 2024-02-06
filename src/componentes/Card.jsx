import React from 'react';
import '../estilos/Card.scss'

const Card = (props) =>{
  return(
  <div className='card-contenedor'>
    
    <div className='card-img'>
      <img 
      className='card-img'
      src={props.img}
      alt="img"
      />
    </div>
    <p className='card-name'><strong>{props.name}</strong></p>
    <div className='line'></div>
    <p className='card-location'>{props.location}</p>
    <p className='card-specie'>{props.species}</p>
       
  </div>
)}

export {Card}