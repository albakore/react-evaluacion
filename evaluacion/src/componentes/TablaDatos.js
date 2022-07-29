import React, { useState, useEffect } from "react";
import { Table,Button,Input } from "reactstrap";

export default function TablaDatos({refresh,editDel}) {
  //Hook que almacena la respuesta del fetch para luego mostrar la lista de usuarios
  const [Usuarios, setUsuarios] = useState([]);
  
  //La propiedad refresh me permite escuchar la accion del boton en el componente formulario y volver a hacer fetch
 useEffect(()=>{
  listaUsuarios();
 },[refresh]);


 async function listaUsuarios(){
  const response = await fetch("http://localhost:5000/usuarios");
  const dato = await response.json();
  setUsuarios(dato);
  console.log(dato);
}

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Documento</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
        {
          //Si el hook esta vacio, no muestro nada, de lo contrario, me muesta la lista de usuarios
          Usuarios != null ? (Usuarios.map(objeto => (<Columna editDel={editDel}objUsuario={objeto}/>))) : console.log("no tengo nada")
          // 
        }
        </tbody>
      </Table>
    </>
  );
}


//Componente que representa cada fila de la lista con sus funcionalidades
function Columna({objUsuario, editDel}){
  //Hook que permite activar la funcionalidad de editar los campos de la fila y otro similar a como esta en el componente formulario
  const [EditableToggle, setEditableToggle] = useState(false);
  const [DatosEditados, setDatosEditados] = useState(objUsuario);
  
  //Borra el dato desde BD y avisa para que vuelva a refrescar la lista
  const botonBorrar = async (e) =>{
    const {name} = e.target;
    const response = await fetch(`http://localhost:5000/eliminarUsuario/${[name]}`,{method:"DELETE"});
    const dato = await response.text();
    console.log(dato);
    editDel();
  }

  //Verifica los cambios en la fila, similar al componente formulario
  const datoCambiado = (evento) => {
    const { name, value } = evento.target;
    setDatosEditados({ ...DatosEditados, [name]: value });
    console.log(DatosEditados);
  };

  //Funcion que me permite modificar los datos de la fila y confirmar los cambios para luego actualizarlos en BD
  const editarConfirmar = async () => {
    if(!EditableToggle){
      setEditableToggle(true);
    }else{
      const opcionDeRequest = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DatosEditados),
      };
      const response = await fetch('http://localhost:5000/modificarUsuario',opcionDeRequest);
      const dato = await response.text();
      console.log(dato);
      
      editDel();
      setEditableToggle(false);
    }
    
  }

  return (
    <tr key={DatosEditados.id}>
      <th scope="row" key={DatosEditados.id}>{DatosEditados.id}</th>
      
      {
        !EditableToggle ?
        (
          <>
            <td >{DatosEditados.nombre}</td>
            <td >{DatosEditados.apellido}</td>
            <td >{DatosEditados.dni}</td>
          </>
        ):
        (
          <>
            <td ><Input onChange={datoCambiado} type="text" name="nombre" value={DatosEditados.nombre}/></td>
            <td ><Input onChange={datoCambiado} type="text" name="apellido" value={DatosEditados.apellido}/></td>
            <td ><Input onChange={datoCambiado} type="text" name="dni"value={DatosEditados.dni}/></td>
          </>
        )
      }

      <td className="col-sm-2">
        <Button color={EditableToggle ? "success" : "secondary"} className="m-1" onClick={editarConfirmar}>{EditableToggle ? "Confirmar" : "Editar"}</Button>
        <Button color="danger" name={DatosEditados.id} onClick={botonBorrar} className="m-1">Borrar</Button>
      </td>
    </tr>
  );
}



