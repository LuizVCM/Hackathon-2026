
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorization = req.headers.authorization

        if (!authorization) {
            return res.status(401).json({
                mensagem: 'Token não informado'
            })
        }

        const [, token] = authorization.split(' ')

        if (!token || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({
                mensagem: 'Token inválido'
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as { id: number }

            ; (req as any).userId = decoded.id

        return next()

    } catch {
        return res.status(401).json({
            mensagem: 'Token inválido ou expirado'
        })
    }
}
