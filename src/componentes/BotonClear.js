import React from "react";
import "../hojas_estilos/botonClear.css";

const BotonClear = (props) => {
    return (
        <div className="boton-clear" onClick={props.manejarClear}>
            {props.children}
        </div>
    );
}

export default BotonClear;
