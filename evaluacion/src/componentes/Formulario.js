import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";


export default function Formulario({ nuevo }) {
  //Se crea un Hook donde inicializa con los datos que se van a cargar en el formulario
  const initForm = { nombre: "", apellido: "", dni: "" };
  const [formulario, setformulario] = useState(initForm);

  //Funcion que agrega un usuario en BD
  const agregarUsuario = async () => {
    const opcionDeRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formulario),
    };

    const response = await fetch(
      "http://localhost:5000/crearUsuario",
      opcionDeRequest
    );
    const resultado = await response.text();
    
    console.log(resultado);

    //Utilizando la prop que le pase al componente anteriormente, comunico a la lista de Usuarios 
    //que vuelva a refrescarse con la nueva informacion extraida desde BD.
    nuevo();
  };


  //Funcion que detecta por medio del evento onChange, los cambios que se van realizando 
  //en cada Input tomando las propiedades name y value  y va modificando el estado del Hook cargandolo de informacion.
  const datoCambiado = (evento) => {
    const { name, value } = evento.target;
    setformulario({ ...formulario, [name]: value });
    console.log(formulario);
  };

  return (
    <>
      <Container>
        <Form>
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              placeholder="Ingrese su Nombre"
              type="text"
              name="nombre"
              onChange={datoCambiado}
              value={formulario.nombre}
            />
            <Label>Apellido</Label>
            <Input
              placeholder="Ingrese su Apellido"
              type="text"
              name="apellido"
              onChange={datoCambiado}
              value={formulario.apellido}
            />
            <Label>Documento</Label>
            <Input
              placeholder="Ingrese su numero de documento"
              type="numeric"
              name="dni"
              onChange={datoCambiado}
              value={formulario.dni}
            />
          </FormGroup>
        </Form>
        <Button className="m-2" onClick={agregarUsuario}>
          Agregar
        </Button>
      </Container>
    </>
  );
}
