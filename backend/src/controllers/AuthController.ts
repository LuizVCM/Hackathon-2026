
import { Request, Response } from 'express'
import AuthService from '../services/AuthService'

export default class AuthController {
  static cadastro = async (req: Request, res: Response) => {
    try {
      const resultado = await AuthService.cadastro(req.body)
      return res.status(201).json(resultado)
    } catch (erro: any) {
      return res.status(400).json({ mensagem: erro.message })
    }
  }

  static login = async (req: Request, res: Response) => {
    try {
      const { cpf, senha } = req.body

      const resultado = await AuthService.login(cpf, senha)

      return res.status(200).json(resultado)
    } catch (erro: any) {
      return res.status(401).json({ mensagem: erro.message })
    }
  }
}
