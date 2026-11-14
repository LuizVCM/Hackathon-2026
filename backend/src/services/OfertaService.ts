
import { AppDataSource } from '../config/data-source'
import { Oferta } from '../models/Oferta'
import { ParticipacaoFila } from '../models/ParticipacaoFila'

export default class OfertaService {
  static async listar(pacienteId: number) {
    return AppDataSource.getRepository(Oferta).find({
      where: { paciente: { id: pacienteId } },
      relations: ['participacao', 'participacao.fila'],
      order: { criadaEm: 'DESC' }
    })
  }

  static async buscarPorId(id: number, pacienteId: number) {
    const oferta = await AppDataSource.getRepository(Oferta).findOne({
      where: { id, paciente: { id: pacienteId } },
      relations: ['participacao', 'participacao.fila']
    })

    if (!oferta) throw new Error('Oferta não encontrada')

    return oferta
  }

  static async responder(id: number, pacienteId: number, resposta: string) {
    const ofertaRepo = AppDataSource.getRepository(Oferta)
    const participacaoRepo = AppDataSource.getRepository(ParticipacaoFila)

    const oferta = await ofertaRepo.findOne({
      where: { id, paciente: { id: pacienteId } },
      relations: ['participacao']
    })

    if (!oferta) throw new Error('Oferta não encontrada')

    if (oferta.status !== 'PENDENTE') {
      throw new Error('Esta oferta já foi respondida')
    }

    if (oferta.expiraEm && oferta.expiraEm < new Date()) {
      oferta.status = 'EXPIRADA'
      await ofertaRepo.save(oferta)
      throw new Error('Esta oferta expirou')
    }

    if (resposta === 'ACEITAR') {
      oferta.status = 'ACEITA'
      oferta.participacao.status = 'CONFIRMADA'
    } else if (resposta === 'RECUSAR') {
      oferta.status = 'RECUSADA'
      oferta.participacao.status = 'PASSOU'
    } else {
      throw new Error('Resposta inválida')
    }

    await ofertaRepo.save(oferta)
    await participacaoRepo.save(oferta.participacao)

    return oferta
  }
}
