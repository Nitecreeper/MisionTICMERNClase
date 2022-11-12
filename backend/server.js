import express  from "express";
import cors from "cors";

import { router } from "./routes/route.js";

const app = express();
//Para poder interconectar los servidores.
app.use(cors());
app.use(express.static('../frontend/build'))
app.use(express.json());
app.use(router)


app.listen('5000', function(pet, res){
    console.log("Servidor iniciado.");
})