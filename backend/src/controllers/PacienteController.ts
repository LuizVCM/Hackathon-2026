
import { Request, Response } from 'express'
import PacienteService from '../services/PacienteService'

export default class PacienteController {
    static listar = async (req: Request, res: Response) => {
        try {
            const resultado = await PacienteService.listar()
            return res.json(resultado)
        } catch (erro: any) {
            return res.status(500).json({ mensagem: erro.message })
        }
    }

    static buscarPorId = async (req: Request, res: Response) => {
        try {
            const resultado = await PacienteService.buscarPorId(Number(req.params.id))
            return res.json(resultado)
        } catch (erro: any) {
            return res.status(404).json({ mensagem: erro.message })
        }
    }

    static atualizar = async (req: Request, res: Response) => {
        try {
            const resultado = await PacienteService.atualizar(
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
            const resultado = await PacienteService.deletar(Number(req.params.id))
            return res.json(resultado)
        } catch (erro: any) {
            return res.status(404).json({ mensagem: erro.message })
        }
    }
}
