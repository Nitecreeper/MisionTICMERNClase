import express from 'express';
import { consultar,registrar,autenticar } from '../controllers/control.js';
import path from 'path'

const router = express.Router();
const dirFrontend = path.join(path.resolve(), '../../frontend')


router.get('/consultar', function(pet, res){
    res.sendFile(dirFrontend+"/build/index.html")
})

router.post('/registrar', function(pet, res){
    registrar(pet,res);
})

router.post('/autenticacion', function(pet,res){
    autenticar(pet,res);
})

export {router}