
import { Request, Response } from 'express'
import ConsultaService from '../services/ConsultaService'

export default class ConsultaController {
  static listar = async (req: Request, res: Response) => {
    try {
      const resultado = await ConsultaService.listar()
      return res.json(resultado)
    } catch (erro: any) {
      return res.status(500).json({ mensagem: erro.message })
    }
  }

  static buscarPorId = async (req: Request, res: Response) => {
    try {
      const resultado = await ConsultaService.buscarPorId(Number(req.params.id))
      return res.json(resultado)
    } catch (erro: any) {
      return res.status(404).json({ mensagem: erro.message })
    }
  }

  static criar = async (req: Request, res: Response) => {
    try {
      const resultado = await ConsultaService.criar(req.body)
      return res.status(201).json(resultado)
    } catch (erro: any) {
      return res.status(400).json({ mensagem: erro.message })
    }
  }

  static atualizar = async (req: Request, res: Response) => {
    try {
      const resultado = await ConsultaService.atualizar(
        Number(req.params.id),
        req.body
      )

      return res.json(resultado)
    } catch (erro: any) {
      return res.status(400).json({ mensagem: erro.message })
    }
  }

  static deletar = async (req: Request, res: Response) => {
    try {
      const resultado = await ConsultaService.deletar(Number(req.params.id))
      return res.json(resultado)
    } catch (erro: any) {
      return res.status(404).json({ mensagem: erro.message })
    }
  }
}
