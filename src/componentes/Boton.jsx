import React from "react";
import '../estilos/Boton.scss'

const Boton = (props) => {
  return(
    <div >
      <button 
      className="btn"
      onClick={props.handleClick}> {props.name}</button>
    </div>
    
  )
}

export {Boton}