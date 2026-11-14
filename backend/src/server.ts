
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { AppDataSource } from './config/data-source'
import routes from './routes'
import { errorHandler } from './middlewares/errorHandler'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// ROTAS
app.use('/api', routes)

// TRATAMENTO DE ERROS
app.use(errorHandler)

// INICIALIZAÇÃO DO SERVIDOR
const PORT = Number(process.env.PORT || 3000)

AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado com sucesso!')

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor rodando na porta ${PORT}`)
    })
  })
  .catch((erro) => {
    console.error('Erro ao conectar ao banco:', erro)
  })
