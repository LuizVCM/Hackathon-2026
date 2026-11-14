
import { Request, Response, NextFunction } from 'express'

export const validatePaciente = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { nome, cpf, telefone, senha } = req.body

    if (!nome || !cpf || !telefone || !senha) {
        return res.status(400).json({
            mensagem: 'Todos os campos são obrigatórios'
        })
    }

    if (String(cpf).replace(/\D/g, '').length !== 11) {
        return res.status(400).json({
            mensagem: 'CPF inválido'
        })
    }

    if (String(senha).length < 6) {
        return res.status(400).json({
            mensagem: 'A senha deve ter pelo menos 6 caracteres'
        })
    }

    return next()
}
