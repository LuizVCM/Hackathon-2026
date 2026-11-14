
import { AppDataSource } from '../config/data-source'
import { Lembrete } from '../models/Lembrete'

const repositorio = () => AppDataSource.getRepository(Lembrete)

export default class LembreteService {
  static async listar(pacienteId: number) {
    return repositorio().find({
      where: { paciente: { id: pacienteId } },
      order: { criadoEm: 'DESC' }
    })
  }

  static async criar(pacienteId: number, dados: any) {
    const lembrete = repositorio().create({
      titulo: dados.titulo,
      mensagem: dados.mensagem,
      dataHora: dados.dataHora ? new Date(dados.dataHora) : undefined,
      paciente: { id: pacienteId }
    } as any)

    return repositorio().save(lembrete)
  }

  static async atualizar(id: number, pacienteId: number, dados: any) {
    const lembrete = await repositorio().findOne({
      where: { id, paciente: { id: pacienteId } }
    })

    if (!lembrete) throw new Error('Lembrete não encontrado')

    if (dados.titulo !== undefined) lembrete.titulo = dados.titulo
    if (dados.mensagem !== undefined) lembrete.mensagem = dados.mensagem
    if (dados.lido !== undefined) lembrete.lido = dados.lido
    if (dados.dataHora !== undefined) {
      lembrete.dataHora = dados.dataHora ? new Date(dados.dataHora) : undefined
    }

    return repositorio().save(lembrete)
  }

  static async deletar(id: number, pacienteId: number) {
    const lembrete = await repositorio().findOne({
      where: { id, paciente: { id: pacienteId } }
    })

    if (!lembrete) throw new Error('Lembrete não encontrado')

    await repositorio().delete(id)

    return { mensagem: 'Lembrete excluído com sucesso' }
  }
}
