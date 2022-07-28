const {Router} = require('express');
const router = Router();
const {getUsuarios,crearUsuario,modificarUsuario,eliminarUsuario} = require('../controladores/index.controller');



router.get('/',(req,res)=>{
    res.send("Hola Mundo");
})

router.get('/usuarios',getUsuarios);
router.post('/crearUsuario',crearUsuario);
router.post('/modificarUsuario',modificarUsuario);
router.delete('/eliminarUsuario/:id',eliminarUsuario);






module.exports = router;
