
import { AppDataSource } from '../config/data-source'
import { Fila } from '../models/Fila'
import { ParticipacaoFila } from '../models/ParticipacaoFila'

export default class FilaService {
  static async listar() {
    return AppDataSource.getRepository(Fila).find({
      where: { ativa: true },
      relations: ['unidade']
    })
  }

  static async entrar(pacienteId: number, filaId: number) {
    const filaRepo = AppDataSource.getRepository(Fila)
    const participacaoRepo = AppDataSource.getRepository(ParticipacaoFila)

    const fila = await filaRepo.findOneBy({ id: filaId, ativa: true })

    if (!fila) throw new Error('Fila não encontrada ou inativa')

    const existente = await participacaoRepo.findOne({
      where: {
        paciente: { id: pacienteId },
        fila: { id: filaId },
        status: 'AGUARDANDO'
      }
    })

    if (existente) throw new Error('Paciente já está nesta fila')

    const participacao = participacaoRepo.create({
      paciente: { id: pacienteId },
      fila: { id: filaId },
      status: 'AGUARDANDO'
    } as any)

    return participacaoRepo.save(participacao)
  }

  static async minhasFilas(pacienteId: number) {
    return AppDataSource.getRepository(ParticipacaoFila).find({
      where: { paciente: { id: pacienteId } },
      relations: ['fila', 'fila.unidade'],
      order: { entrouEm: 'ASC' }
    })
  }

  static async cancelar(id: number, pacienteId: number) {
    const repositorio = AppDataSource.getRepository(ParticipacaoFila)

    const participacao = await repositorio.findOne({
      where: {
        id,
        paciente: { id: pacienteId }
      }
    })

    if (!participacao) throw new Error('Participação não encontrada')

    if (participacao.status !== 'AGUARDANDO') {
      throw new Error('Esta participação não pode ser cancelada')
    }

    participacao.status = 'CANCELADA'

    return repositorio.save(participacao)
  }
}
