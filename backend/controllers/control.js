import {autenticacion, conectarCliente, insert, query, autenticacionAdmin, conectarAdmin} from '../dataBase.js'
//import {  } from '../dataBase2.js';

export function consultar(pet, res){
    console.log("Conectado al server de node js");
    res.send("Hola")
}

export function registrar(pet, res){
    //console.log(pet.body);
    let datos = query(pet.body.id, pet.body.email)
    .then(data => {guardar(data)})
    
    function guardar(data){
        if(data == null){
            insert(pet.body)
            .then(() => res.send("Usuario registrado exitosamente."))
            
        } else {
            res.send("ERROR: El usuario ya está registrado")
        }
    }
}

export function autenticar(pet,res){
    if(pet.body.userType == true){
        conectarCliente();
        //console.log(pet.body)
        let datos = autenticacion(pet.body.email, pet.body.password)
        .then(data => {credenciales(data)})

        
    }else{
        conectarAdmin();
        let datos = autenticacionAdmin(pet.body.email, pet.body.password)
        .then(data => {credenciales(data)})
    }

    function credenciales(data){
        if(data != null){
            console.log("Credenciales correctas")
            res.send(data)
        } else {
            console.log("ERROR: Correo y/o contraseña incorrectas.")
            res.send({id:""})
        }
    }
    
}