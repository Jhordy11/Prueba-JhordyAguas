import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/crearJWT.js";
import axios from "axios";

const login = async(req, res) => {
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const UsuarioBDD = await Usuario.findOne({email})
    if(!UsuarioBDD) return res.status(404).json({msg:"Usuario o contraseña incorrectos."})
    const verificarPassword = await UsuarioBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Usuario o contraseña incorrectos."})
    const token = generarJWT(UsuarioBDD._id,UsuarioBDD.email)
    res.status(200).json({
        token,
        email:UsuarioBDD.email,
    })
}

const crearUsuarioPorDefecto = async () => {
    try {
      const usuarioExistente = await Usuario.findOne({ email: process.env.USER });
      if (!usuarioExistente) {
        const nuevoUsuario = new Usuario({
          email: process.env.USER,
          password: await Usuario.prototype.encrypPassword(process.env.PASSWORD), 
        });
        await nuevoUsuario.save();
        console.log("Usuario por defecto creado correctamente.");
      } else {
        console.log("El usuario por defecto ya existe.");
      }
    } catch (error) {
      console.error("Error creando el usuario por defecto:", error);
    }
};

const consultarTransaccion = async (req, res) => {
    const { id } = req.params;
    const apiUrl = `${process.env.URL_API_PAGOPLUX}/integrations/getTransactionByIdStateResource?idTransaction=${id}`;
  
    const usuarioClave = Buffer.from(`${process.env.API_PAGOPLUX_USER}:${process.env.API_PAGOPLUX_PASSWORD}`).toString("base64");
  
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${usuarioClave}`,
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Error al consultar la transacción.",
        error: error.response ? error.response.data : error.message,
      });
    }
};

export {
    login,
    crearUsuarioPorDefecto,
    consultarTransaccion
}