import { Router } from 'express'
import { AppDataSource as db } from '../config/data-source'
import { exigir, uid } from '../utils/request'
import { Consulta } from '../models/Consulta'
const router = Router()
router.get('/consultas', async (req, res) => {
  res.json(await db.getRepository(Consulta).find({ where: { paciente: { id: uid(req) } }, relations: ['unidade'], order: { dataHora: 'ASC' } }))
})
router.patch('/consultas/:id', async (req, res) => {
  const { status, motivo } = req.body ?? {}
  exigir(['AGENDADA', 'CONFIRMADA', 'CANCELADA'].includes(status), 'Status inválido.')
  exigir(motivo === undefined || (typeof motivo === 'string' && motivo.length <= 255), 'Motivo inválido.')
  const repo = db.getRepository(Consulta)
  const c = await repo.findOneBy({ id: Number(req.params.id), paciente: { id: uid(req) } })
  exigir(c, 'Consulta não encontrada.')
  exigir(['AGENDADA', 'CONFIRMADA'].includes(c.status), 'Esta consulta não pode ser alterada.')
  c.status = status
  if (status === 'CANCELADA') c.motivoCancelamento = motivo
  res.json(await repo.save(c))
})
export default router
