
import mongoose from 'mongoose'
import {crearUsuarioPorDefecto} from "./controllers/usuario_controller.js";  

mongoose.set('strictQuery', true)


const connection = async()=>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database is connected on ${connection.host} - ${connection.port}`)
        crearUsuarioPorDefecto();
    } catch (error) {
        console.log(error);
    }
}




//Exportar la función
export default  connection