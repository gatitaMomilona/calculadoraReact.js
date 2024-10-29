import React from "react";
import "../hojas_estilos/boton.css";

function Boton(props) {  // Nombre en PascalCase

    const esOperador = valor => {
        return isNaN(valor) && (valor !== ".") && (valor !== "=");
    };

    return (
        <button
            className={`boton-contenedor ${esOperador(props.children) ? "operador" : ""}`}
            onClick={() => props.manejarClic(props.children)}
        >
            {props.children}
        </button>
    );
}

export default Boton;
