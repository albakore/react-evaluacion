CREATE DATABASE evaluacion;
CREATE TABLE listado_usuarios(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR,
    apellido VARCHAR,
    dni VARCHAR
);

INSERT INTO listado_usuarios(nombre,apellido) VALUES 
('Kevin','Kener'),
('Miguel','Moyano');