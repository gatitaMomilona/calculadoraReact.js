import './App.css';
import Boton from "./componentes/Boton";
import Pantalla from './componentes/Pantalla';
import BotonClear from './componentes/BotonClear';
import "./hojas_estilos/historial.css";
import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import { History } from 'lucide-react';

function App() {
  const [input, setInput] = useState("");
  const [historial, setHistorial] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  useEffect(() => {
    const historialGuardado = JSON.parse(localStorage.getItem("historial")) || [];
    setHistorial(historialGuardado);
  }, []);

  const agregarInput = val => {
    setInput(input + val);
  };

  const calcularResultado = () => {
    if (input) {
      const resultado = evaluate(input);
      const nuevaOperacion = `${input} = ${resultado}`;

      const nuevoHistorial = [...historial, nuevaOperacion];
      setHistorial(nuevoHistorial);
      localStorage.setItem("historial", JSON.stringify(nuevoHistorial));

      setInput(resultado.toString());
      setMostrarHistorial(true);
    } else {
      alert("Por favor ingrese algún valor para realizar la operación");
    }
  };

  const limpiarHistorial = () => {
    setHistorial([]);
    localStorage.removeItem("historial");
  };

  const toggleHistorial = () => {
    setMostrarHistorial(!mostrarHistorial);
  };

  return (
    <div className="App">
      <div className="calculadora-container">
        <div className="contenedor-calculadora">
          <Pantalla input={input} />

          <div className="fila">
            <Boton manejarClic={agregarInput}>1</Boton>
            <Boton manejarClic={agregarInput}>2</Boton>
            <Boton manejarClic={agregarInput}>3</Boton>
            <Boton manejarClic={agregarInput}>+</Boton>
          </div>

          <div className="fila">
            <Boton manejarClic={agregarInput}>4</Boton>
            <Boton manejarClic={agregarInput}>5</Boton>
            <Boton manejarClic={agregarInput}>6</Boton>
            <Boton manejarClic={agregarInput}>-</Boton>
          </div>

          <div className="fila">
            <Boton manejarClic={agregarInput}>7</Boton>
            <Boton manejarClic={agregarInput}>8</Boton>
            <Boton manejarClic={agregarInput}>9</Boton>
            <Boton manejarClic={agregarInput}>*</Boton>
          </div>

          <div className="fila">
            <Boton manejarClic={calcularResultado}>=</Boton>
            <Boton manejarClic={agregarInput}>0</Boton>
            <Boton manejarClic={agregarInput}>.</Boton>
            <Boton manejarClic={agregarInput}>/</Boton>
          </div>

          <div className="fila">
            <BotonClear manejarClear={() => setInput("")}>
              Limpiar
            </BotonClear>
            <button 
              className="boton-historial" 
              onClick={toggleHistorial}
            >
              <History className="icono-historial" />
              Historial
            </button>
          </div>
        </div>

        {mostrarHistorial && (
          <div className="historial animate-in slide-in-from-right">
            <h2>Historial de Operaciones</h2>
            {historial.length > 0 ? (
              <ul>
                {historial.map((operacion, index) => (
                  <li key={index}>{operacion}</li>
                ))}
              </ul>
            ) : (
              <p>No hay operaciones en el historial.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;