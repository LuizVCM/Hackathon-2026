import { Router } from 'express'
import { AppDataSource as db } from '../config/data-source'
import { exigir, uid } from '../utils/request'
import { Oferta } from '../models/Oferta'
import { ParticipacaoFila } from '../models/ParticipacaoFila'
const router = Router()
router.get('/ofertas', async (req, res) => {
  res.json(await db.getRepository(Oferta).find({ where: { paciente: { id: uid(req) } }, relations: ['participacao', 'participacao.fila', 'participacao.fila.unidade'], order: { criadaEm: 'DESC' } }))
})
router.post('/ofertas/:id/responder', async (req, res) => {
  const { resposta } = req.body ?? {}
  exigir(['ACEITAR', 'RECUSAR'].includes(resposta), 'Resposta inválida.')
  res.json(await db.transaction(async manager => {
    const repo = manager.getRepository(Oferta)
    const oferta = await repo.findOne({ where: { id: Number(req.params.id), paciente: { id: uid(req) } }, lock: { mode: 'pessimistic_write' } })
    exigir(oferta && oferta.status === 'PENDENTE', 'Oferta indisponível.')
    exigir(oferta.expiraEm && oferta.expiraEm > new Date(), 'O prazo desta oferta terminou.')
    const completa = await repo.findOneOrFail({ where: { id: oferta.id }, relations: ['participacao'] })
    completa.status = resposta === 'ACEITAR' ? 'ACEITA' : 'RECUSADA'
    completa.participacao.status = resposta === 'ACEITAR' ? 'AGUARDANDO_VALIDACAO' : 'AGUARDANDO'
    await manager.getRepository(ParticipacaoFila).save(completa.participacao)
    return repo.save(completa)
  }))
})
export default router
