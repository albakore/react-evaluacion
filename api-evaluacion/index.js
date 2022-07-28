const express = require('express');
const cors = require('cors');
const app = express();
const puerto = 5000;

//Configuro CORS para que tome desde el puerto 3000
const corsOption = {
    origin: ['http://localhost:3000']
};

//Middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//Rutas
app.use(require('./src/Rutas/index'));


//Inicio el servidor en el puerto 5000
app.listen(puerto);
console.log("Escuchando en puerto 5000")