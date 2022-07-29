import logo from './logo.svg';
import './App.css';
import Formulario from './componentes/Formulario';
import TablaDatos from './componentes/TablaDatos';
import {useState} from 'react';
//Evaluacion
function App() {
  //Se Crea un Hook para comunicar entre los componentes de misma jerarquia.
  const [Refresh, setRefresh] = useState(false);
  const refrescar = () =>{
    setRefresh(!Refresh);
  }
  
  return (
    <div className="App">
      <Formulario nuevo={refrescar} />
      <TablaDatos refresh={Refresh} editDel={refrescar}/>
    </div>
  );
}






export default App;
