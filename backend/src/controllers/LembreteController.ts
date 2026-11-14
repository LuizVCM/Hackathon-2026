
import { Request, Response } from 'express'
import LembreteService from '../services/LembreteService'

export default class LembreteController {
  static listar = async (req: Request, res: Response) => {
    try {
      const pacienteId = (req as any).userId

      const resultado = await LembreteService.listar(Number(pacienteId))

      return res.json(resultado)
    } catch (erro: any) {
      return res.status(500).json({ mensagem: erro.message })
    }
  }

  static criar = async (req: Request, res: Response) => {
    try {
      const pacienteId = (req as any).userId

      const resultado = await LembreteService.criar(
        Number(pacienteId),
        req.body
      )

      return res.status(201).json(resultado)
    } catch (erro: any) {
      return res.status(400).json({ mensagem: erro.message })
    }
  }

  static atualizar = async (req: Request, res: Response) => {
    try {
      const pacienteId = (req as any).userId

      const resultado = await LembreteService.atualizar(
        Number(req.params.id),
        Number(pacienteId),
        req.body
      )

      return res.json(resultado)
    } catch (erro: any) {
      return res.status(400).json({ mensagem: erro.message })
    }
  }

  static deletar = async (req: Request, res: Response) => {
    try {
      const pacienteId = (req as any).userId

      const resultado = await LembreteService.deletar(
        Number(req.params.id),
        Number(pacienteId)
      )

      return res.json(resultado)
    } catch (erro: any) {
      return res.status(404).json({ mensagem: erro.message })
    }
  }
}
