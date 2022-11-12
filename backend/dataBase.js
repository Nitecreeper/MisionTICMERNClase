import mongoose, { mongo } from "mongoose";

export let conectarCliente = () => {
    mongoose.connect('mongodb+srv://jlguepudb:JlGb91$$@ciclocuatro.b3haph8.mongodb.net/db?retryWrites=true&w=majority')
    .then(() => console.log("Conectado a mongoDB Atlas Cliente."))
    .catch(err => console.log(err))
}

export let conectarAdmin = () => {
    mongoose.connect('mongodb+srv://jlguepudb:JlGb91$$@ciclocuatro.b3haph8.mongodb.net/db?retryWrites=true&w=majority')
    .then(() => console.log("Conectado a mongoDB Atlas Admin."))
    .catch(err => console.log(err))
}

let esquemaCliente = mongoose.Schema({
    _id:Number,
    name:String,
    email:String,
    password:String
},{versionKey:false});

let esquemaAdmin = mongoose.Schema({
    _id:Number,
    name:String,
    email:String,
    password:String,
    job:String
},{versionKey:false});

let modelo = mongoose.model('users',esquemaCliente);
let modeloAdmin = mongoose.model('admins',esquemaAdmin);

export let query = async (id,email) => {
    let document = await modelo.findOne({$or:[{_id:id},{email:email}]});
    return document;
}

export let insert = async (datos) => {
    let document = new modelo(
        {
            _id:datos.id,
            name:datos.nombre,
            email:datos.email,
            password:datos.password
        }
    )
    await document.save()
}

export let autenticacion = async (correo, contrasena) => {
    let document = await modelo.findOne({$and:[{email:correo},{password:contrasena}]});
    return document;
}

export let autenticacionAdmin = async (correo, contrasena) => {
    let document = await modeloAdmin.findOne({$and:[{email:correo},{password:contrasena}]});
    return document
}