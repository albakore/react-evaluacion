
const { Pool } = require("pg");

//Defino la configuracion de coneccion a la base de postgress
const db = new Pool({
    host: 'localhost',
    user: 'postgres',
    password:'admin',
    database:'evaluacion',
    port:'5432'
})

const getUsuarios = async (req,res) => {
    const response = await db.query('SELECT * FROM listado_usuarios ORDER BY id ASC');
    console.log(response.rows);
    res.json(response.rows);
};

const crearUsuario = async (req,res) => {
    const {nombre, apellido, dni} = req.body;
    await db.query('INSERT INTO listado_usuarios(nombre,apellido,dni) VALUES ($1,$2,$3)',[nombre,apellido,dni]);
    const response = await db.query('SELECT * FROM listado_usuarios ORDER BY id ASC');
    console.log(`El usuario ${nombre} ${apellido} se ha creado con exito!`);
    res.send(`El usuario ${nombre} ${apellido} se ha creado con exito!`);
};

const modificarUsuario = async (req,res) => {
    const {nombre, apellido, dni, id} = req.body;
    await db.query('UPDATE listado_usuarios SET nombre = $1, apellido = $2, dni = $3 WHERE id = $4',[nombre,apellido,dni,id]);
    const response = await db.query('SELECT * FROM listado_usuarios ORDER BY id ASC'); 
    console.log(response.rows);
    res.json(response.rows);
};

const eliminarUsuario = async (req,res) => {
    const id = req.params.id;
    await db.query('DELETE FROM listado_usuarios WHERE id = $1',[id]);
    res.send("El usuario con id " + id + ", fue eliminado ");
};

module.exports ={
    getUsuarios,
    crearUsuario,
    modificarUsuario,
    eliminarUsuario
}



