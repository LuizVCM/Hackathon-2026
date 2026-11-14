import { ErrorRequestHandler } from 'express'
export const errorHandler: ErrorRequestHandler = (erro, _req, res, _next) => {
  if (erro.code === 'ER_DUP_ENTRY') { res.status(409).json({ mensagem: 'Registro já cadastrado.' }); return }
  const status = erro.status ?? 500
  if (status >= 500) console.error(erro)
  res.status(status).json({ mensagem: status >= 500 ? 'Não foi poss?vel concluir a solicita??o.' : erro.message })
}
