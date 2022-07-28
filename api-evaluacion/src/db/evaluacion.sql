CREATE DATABASE evaluacion;
CREATE TABLE listado_usuarios(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(20),
    apellido VARCHAR(20),
    dni INT
);

INSERT INTO listado_usuarios(nombre,apellido) VALUES 
('Kevin','Kener'),
('Miguel','Moyano');