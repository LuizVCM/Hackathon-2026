
import { AppDataSource } from '../config/data-source'
import { Paciente } from '../models/Paciente'
import bcrypt from 'bcrypt'

const repositorio = () => AppDataSource.getRepository(Paciente)

export default class PacienteService {
  static async listar() {
    return repositorio().find({
      select: {
        id: true,
        nome: true,
        cpf: true,
        telefone: true,
        codigoPaciente: true,
        criadoEm: true
      }
    })
  }

  static async buscarPorId(id: number) {
    const paciente = await repositorio().findOneBy({ id })

    if (!paciente) throw new Error('Paciente não encontrado')

    const { senha, ...dados } = paciente
    return dados
  }

  static async atualizar(id: number, dados: any) {
    const paciente = await repositorio().findOneBy({ id })

    if (!paciente) throw new Error('Paciente não encontrado')

    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, 10)
    }

    delete dados.cpf
    delete dados.codigoPaciente

    await repositorio().update(id, dados)

    return this.buscarPorId(id)
  }

  static async deletar(id: number) {
    const paciente = await repositorio().findOneBy({ id })

    if (!paciente) throw new Error('Paciente não encontrado')

    await repositorio().delete(id)

    return { mensagem: 'Paciente excluído com sucesso' }
  }
}
