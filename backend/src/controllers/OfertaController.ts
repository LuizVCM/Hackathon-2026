
import { Request, Response } from 'express'
import OfertaService from '../services/OfertaService'

export default class OfertaController {
  static listar = async (req: Request, res: Response) => {
    try {
      const pacienteId = (req as any).userId

      const resultado = await OfertaService.listar(Number(pacienteId))

      return res.json(resultado)
    } catch (erro: any) {
      return res.status(500).json({ mensagem: erro.message })
    }
  }

  static buscarPorId = async (req: Request, res: Response) => {
    try {
      const pacienteId = (req as any).userId

      const resultado = await OfertaService.buscarPorId(
        Number(req.params.id),
        Number(pacienteId)
      )

      return res.json(resultado)
    } catch (erro: any) {
      return res.status(404).json({ mensagem: erro.message })
    }
  }

  static responder = async (req: Request, res: Response) => {
    try {
      const pacienteId = (req as any).userId
      const { resposta } = req.body

      const resultado = await OfertaService.responder(
        Number(req.params.id),
        Number(pacienteId),
        resposta
      )

      return res.json(resultado)
    } catch (erro: any) {
      return res.status(400).json({ mensagem: erro.message })
    }
  }
}
