import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import routerUsuario from './routes/usuario_routes.js'

const app = express()

app.set('port', process.env.port || 3000)
app.use(cors())

app.use(express.json())

app.use('/api', routerUsuario)

app.use((req, res) => res.status(404).send("Endpoint no encontrado - 404"))

export default app
