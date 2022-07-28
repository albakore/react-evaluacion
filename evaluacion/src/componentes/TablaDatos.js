import React, { useState, useEffect } from "react";
import { Table,Button } from "reactstrap";

export default function TablaDatos() {
  const [Usuarios, setUsuarios] = useState();
  const listaUsuarios = async () => {
    const response = await fetch("http://localhost:5000/usuarios");
    const dato = await response.json();
    setUsuarios(dato);
  };

  useEffect(() => {
    if (!Usuarios) {
      listaUsuarios();
    }
  }, [Usuarios]);

  useEffect(() => {
      listaUsuarios();
  }, []);


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
          
          Usuarios ? (Usuarios.map((valor) => {
            return (
              <tr key={valor.id}>
                <th scope="row" key={valor.id}>{valor.id}</th>
                <td >{valor.nombre}</td>
                <td >{valor.apellido}</td>
                <td >{valor.dni}</td>
                <td >
                  <Button className="m-1">Editar</Button>
                  <Button color="danger" className="m-1">Borrar</Button>
                </td>
              </tr>
            );
          })): <></>
        }


        </tbody>
      </Table>
    </>
  );
}


function BotonEditar({borrarUsuario}){

}


function BotonBorrar(){
  
}
