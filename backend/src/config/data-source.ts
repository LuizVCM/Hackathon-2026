
import { DataSource } from 'typeorm'
import * as dotenv from "dotenv"

dotenv.config() // carrega as informações do arquivo .env para o proccess.env
import { Lembrete } from '../models/Lembrete'
import { Oferta } from '../models/Oferta'
import { Paciente } from '../models/Paciente'
import { ParticipacaoFila } from '../models/ParticipacaoFila'
import { Unidade } from '../models/Unidade'
import { Consulta } from '../models/Consulta'
import { Fila } from '../models/Fila'

// DESESTRUTURAÇÃO
const { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = process.env

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
    synchronize: true, // cria as tabelas no banco se estiver marcado como true
    logging: true, // mostra o código SQL gerado ao criar as tabelas
    entities: [Consulta, Fila, Lembrete, Oferta, Paciente,ParticipacaoFila, Unidade] // indica quais entidades o TypeORM deve ler para criar as tabelas
})