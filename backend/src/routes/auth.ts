import { Router } from 'express'
import { AppDataSource as db } from '../config/data-source'
import { exigir, uid } from '../utils/request'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'node:crypto'
import { Paciente } from '../models/Paciente'
const publico = ({ id, nome, codigoPaciente }: Paciente) => ({ id, nome, codigoPaciente })
const router = Router()
import { authMiddleware } from '../middlewares/authMiddleware'
router.post('/auth/cadastro', async (req, res) => {
  const { nome, cpf, telefone, senha } = req.body ?? {}
  exigir(typeof nome === 'string' && nome.trim().length >= 2 && nome.length <= 100, 'Informe seu nome completo.')
  exigir(typeof cpf === 'string' && /^\d{11}$/.test(cpf), 'Informe os 11 números do CPF.')
  exigir(typeof telefone === 'string' && /^\d{10,11}$/.test(telefone), 'Informe um telefone válido.')
  exigir(typeof senha === 'string' && senha.length >= 6 && senha.length <= 72, 'Use uma senha entre 6 e 72 caracteres.')
  const repo = db.getRepository(Paciente)
  exigir(!await repo.existsBy({ cpf }), 'CPF já cadastrado.')
  const p = await repo.save(repo.create({ nome: nome.trim(), cpf, telefone, senha: await bcrypt.hash(senha, 12), codigoPaciente: `P-${randomUUID().replace(/-/g, '').slice(0, 10)}` }))
  res.status(201).json(publico(p))
})
router.post('/auth/login', async (req, res) => {
  const { cpf, senha } = req.body ?? {}
  exigir(typeof cpf === 'string' && typeof senha === 'string' && senha.length <= 72, 'Informe CPF e senha.')
  const p = await db.getRepository(Paciente).createQueryBuilder('p').addSelect('p.senha').where('p.cpf = :cpf', { cpf: cpf.replace(/\D/g, '') }).getOne()
  if (!p || !await bcrypt.compare(senha, p.senha)) { res.status(401).json({ mensagem: 'CPF ou senha inválidos.' }); return }
  res.json({ token: jwt.sign({ id: p.id }, process.env.JWT_SECRET!, { expiresIn: '1d' }), paciente: publico(p) })
})
router.get('/auth/me', authMiddleware, async (req, res) => {
  const p = await db.getRepository(Paciente).findOneBy({ id: uid(req) })
  if (!p) { res.status(401).json({ mensagem: 'Sessão inválida.' }); return }
  res.json(publico(p))
})
export default router
