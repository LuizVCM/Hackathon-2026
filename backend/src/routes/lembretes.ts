import { Router } from 'express'
import { AppDataSource as db } from '../config/data-source'
import { exigir, uid } from '../utils/request'
import { PreferenciaLembrete } from '../models/PreferenciaLembrete'
const router = Router()
router.get('/lembretes/preferencias', async (req, res) => {
  res.json(await db.getRepository(PreferenciaLembrete).findOneBy({ pacienteId: uid(req) }) ?? {
    canal: 'app', horarios: [{ hora: 8, ativo: true }, { hora: 12, ativo: true }, { hora: 18, ativo: true }],
  })
})
router.put('/lembretes/preferencias', async (req, res) => {
  const { canal, horarios } = req.body ?? {}
  exigir(['app', 'whatsapp', 'ambos'].includes(canal), 'Canal inválido.')
  exigir(Array.isArray(horarios) && horarios.length <= 3 && horarios.every(h => h && Number.isInteger(h.hora) && h.hora >= 0 && h.hora <= 23 && typeof h.ativo === 'boolean'), 'Escolha até três horários válidos.')
  exigir(new Set(horarios.filter(h => h.ativo).map(h => h.hora)).size === horarios.filter(h => h.ativo).length, 'Evite horários repetidos.')
  res.json(await db.getRepository(PreferenciaLembrete).save({ pacienteId: uid(req), canal, horarios: horarios.map(h => ({ hora: h.hora, ativo: h.ativo })) }))
})
export default router
