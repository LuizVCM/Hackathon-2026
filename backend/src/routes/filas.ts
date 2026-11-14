import { Router } from 'express'
import { AppDataSource as db } from '../config/data-source'
import { exigir, uid } from '../utils/request'
import { Fila } from '../models/Fila'
import { ParticipacaoFila } from '../models/ParticipacaoFila'
const router = Router()
router.get('/filas', async (_req, res) => {
  res.json(await db.getRepository(Fila).find({ where: { ativa: true }, relations: ['unidade'] }))
})
router.get('/filas/minhas', async (req, res) => {
  const repo = db.getRepository(ParticipacaoFila)
  const minhas = await repo.find({ where: { paciente: { id: uid(req) } }, relations: ['fila', 'fila.unidade'], order: { entrouEm: 'ASC', id: 'ASC' } })
  res.json(await Promise.all(minhas.map(async p => {
    const ativos = ['AGUARDANDO', 'OFERTADA', 'AGUARDANDO_VALIDACAO']
    if (!ativos.includes(p.status)) return { ...p, posicao: null }
    const antes = await repo.createQueryBuilder('p').where('p.filaId = :fila', { fila: p.fila.id }).andWhere('p.status IN (:...ativos)', { ativos })
      .andWhere('(p.entrouEm < :entrou OR (p.entrouEm = :entrou AND p.id < :id))', { entrou: p.entrouEm, id: p.id }).getCount()
    return { ...p, posicao: antes + 1 }
  })))
})
router.post('/filas/entrar', async (req, res) => {
  const { filaId, distanciaMaximaKm, possuiTransporte, disponibilidade } = req.body ?? {}
  exigir(Number.isInteger(filaId) && filaId > 0, 'Selecione uma fila.')
  exigir(Number.isInteger(distanciaMaximaKm) && distanciaMaximaKm >= 1 && distanciaMaximaKm <= 100, 'Distância inválida.')
  exigir(typeof possuiTransporte === 'boolean' && ['MANHA', 'QUALQUER'].includes(disponibilidade), 'Preferências inválidas.')
  const resultado = await db.transaction(async manager => {
    const fila = await manager.getRepository(Fila).findOne({ where: { id: filaId, ativa: true }, lock: { mode: 'pessimistic_write' } })
    exigir(fila, 'Fila não encontrada ou inativa.')
    const repo = manager.getRepository(ParticipacaoFila)
    const existe = await repo.createQueryBuilder('p').where('p.pacienteId = :paciente AND p.filaId = :fila', { paciente: uid(req), fila: filaId })
      .andWhere('p.status IN (:...status)', { status: ['AGUARDANDO', 'OFERTADA', 'AGUARDANDO_VALIDACAO', 'CONFIRMADA'] }).getOne()
    exigir(!existe, 'Você já participa desta fila.')
    return repo.save(repo.create({ paciente: { id: uid(req) }, fila, distanciaMaximaKm, possuiTransporte, disponibilidade, status: 'AGUARDANDO' }))
  })
  res.status(201).json(resultado)
})
export default router
