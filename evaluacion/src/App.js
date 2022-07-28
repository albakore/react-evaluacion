import logo from './logo.svg';
import './App.css';
import Formulario from './componentes/Formulario';
import TablaDatos from './componentes/TablaDatos';
import {useState} from 'react';
function App() {
  const [Usuario, setUsuario] = useState({})
  return (
    <div className="App">
      <Formulario nuevoUsuario={setUsuario}/>
      <TablaDatos />
    </div>
  );
}

export default App;
