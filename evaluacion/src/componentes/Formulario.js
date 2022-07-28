import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
export default function Formulario({nuevoUsuario}) {
  const initForm = { nombre: "", apellido: "", dni: "" };
  const [formulario, setformulario] = useState(initForm);

  const chequearFormularioVacio = () => {
   if (Object.keys(formulario).filter(key => formulario[key] != "")){
     return true;
     
   }else{
     return false;
   }
  }

  const agregarUsuario = async() => {
    const opcionDeRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formulario)
    };

    if(chequearFormularioVacio()){
      const response = await fetch("http://localhost:5000/crearUsuario",opcionDeRequest);
      const resultado = await response.json();
      console.log(resultado);
      nuevoUsuario(resultado);
      setformulario(initForm);
    }
    
  };

  

  const datoCambiado = (evento) => {
    const {name, value} = evento.target;
    if (name === "dni"){
      const numero = Number(value);
      setformulario({...formulario, dni : numero});
    }else{
      setformulario({...formulario, [name] : value});
    }
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
