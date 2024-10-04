import {Router} from 'express'
const router = Router()

import {
    login,
    consultarTransaccion
} from "../controllers/usuario_controller.js"

import verificarAutenticacion from "../middlewares/autenticacion.js";

router.post("/login", login);
router.get("/consultarTransaccion/:id", verificarAutenticacion,consultarTransaccion);

export default router






