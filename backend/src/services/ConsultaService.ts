
import { AppDataSource } from '../config/data-source'
import { Consulta } from '../models/Consulta'

const repositorio = () => AppDataSource.getRepository(Consulta)

export default class ConsultaService {
  static async listar() {
    return repositorio().find({
      relations: ['paciente', 'unidade']
    })
  }

  static async buscarPorId(id: number) {
    const consulta = await repositorio().findOne({
      where: { id },
      relations: ['paciente', 'unidade']
    })

    if (!consulta) throw new Error('Consulta não encontrada')

    return consulta
  }

  static async criar(dados: any) {
    const consulta = repositorio().create({
      especialidade: dados.especialidade,
      dataHora: new Date(dados.dataHora),
      status: 'AGENDADA',
      paciente: { id: dados.pacienteId },
      unidade: { id: dados.unidadeId }
    } as any)

    return repositorio().save(consulta)
  }

  static async atualizar(id: number, dados: any) {
    await this.buscarPorId(id)

    const atualizacao: any = {
      especialidade: dados.especialidade,
      dataHora: dados.dataHora ? new Date(dados.dataHora) : undefined,
      status: dados.status
    }

    if (dados.pacienteId) atualizacao.paciente = { id: dados.pacienteId }
    if (dados.unidadeId) atualizacao.unidade = { id: dados.unidadeId }

    Object.keys(atualizacao).forEach(key => {
      if (atualizacao[key] === undefined) delete atualizacao[key]
    })

    await repositorio().update(id, atualizacao)

    return this.buscarPorId(id)
  }

  static async deletar(id: number) {
    await this.buscarPorId(id)
    await repositorio().delete(id)

    return { mensagem: 'Consulta excluída com sucesso' }
  }
}
