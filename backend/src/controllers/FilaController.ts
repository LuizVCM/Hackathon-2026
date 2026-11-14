
import { Request, Response } from 'express'
import FilaService from '../services/FilaService'

export default class FilaController {
  static listar = async (req: Request, res: Response) => {
    try {
      const resultado = await FilaService.listar()
      return res.json(resultado)
    } catch (erro: any) {
      return res.status(500).json({ mensagem: erro.message })
    }
  }

  static entrar = async (req: Request, res: Response) => {
    try {
      const pacienteId = (req as any).userId
      const { filaId } = req.body

      const resultado = await FilaService.entrar(
        Number(pacienteId),
        Number(filaId)
      )

      return res.status(201).json(resultado)
    } catch (erro: any) {
      return res.status(400).json({ mensagem: erro.message })
    }
  }

  static minhasFilas = async (req: Request, res: Response) => {
    try {
      const pacienteId = (req as any).userId

      const resultado = await FilaService.minhasFilas(
        Number(pacienteId)
      )

      return res.json(resultado)
    } catch (erro: any) {
      return res.status(500).json({ mensagem: erro.message })
    }
  }

  static cancelar = async (req: Request, res: Response) => {
    try {
      const pacienteId = (req as any).userId

      const resultado = await FilaService.cancelar(
        Number(req.params.id),
        Number(pacienteId)
      )

      return res.json(resultado)
    } catch (erro: any) {
      return res.status(400).json({ mensagem: erro.message })
    }
  }
}
