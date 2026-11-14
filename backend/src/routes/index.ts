
import { Router } from 'express'

import AuthController from '../controllers/AuthController'
import PacienteController from '../controllers/PacienteController'
import ConsultaController from '../controllers/ConsultaController'
import FilaController from '../controllers/FilaController'
import OfertaController from '../controllers/OfertaController'
import LembreteController from '../controllers/LembreteController'

import { authMiddleware } from '../middlewares/authMiddleware'
import { validatePaciente } from '../middlewares/validatePaciente'

const router = Router()

// AUTENTICAÇÃO
router.post('/auth/cadastro', validatePaciente, AuthController.cadastro)
router.post('/auth/login', AuthController.login)

// PACIENTES
router.get('/pacientes', authMiddleware, PacienteController.listar)
router.get('/pacientes/:id', authMiddleware, PacienteController.buscarPorId)
router.put('/pacientes/:id', authMiddleware, PacienteController.atualizar)
router.delete('/pacientes/:id', authMiddleware, PacienteController.deletar)

// CONSULTAS
router.get('/consultas', authMiddleware, ConsultaController.listar)
router.get('/consultas/:id', authMiddleware, ConsultaController.buscarPorId)
router.post('/consultas', authMiddleware, ConsultaController.criar)
router.put('/consultas/:id', authMiddleware, ConsultaController.atualizar)
router.delete('/consultas/:id', authMiddleware, ConsultaController.deletar)

// FILAS
router.get('/filas', authMiddleware, FilaController.listar)
router.post('/filas/entrar', authMiddleware, FilaController.entrar)
router.get('/filas/minhas', authMiddleware, FilaController.minhasFilas)
router.delete('/filas/:id/cancelar', authMiddleware, FilaController.cancelar)

// OFERTAS
router.get('/ofertas', authMiddleware, OfertaController.listar)
router.get('/ofertas/:id', authMiddleware, OfertaController.buscarPorId)
router.post('/ofertas/:id/responder', authMiddleware, OfertaController.responder)

// LEMBRETES
router.get('/lembretes', authMiddleware, LembreteController.listar)
router.post('/lembretes', authMiddleware, LembreteController.criar)
router.put('/lembretes/:id', authMiddleware, LembreteController.atualizar)
router.delete('/lembretes/:id', authMiddleware, LembreteController.deletar)

export default router
