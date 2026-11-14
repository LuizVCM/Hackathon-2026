import { Request } from 'express'
export const uid = (req: Request) => (req as Request & { userId: number }).userId
export function exigir(ok: unknown, mensagem: string): asserts ok {
  if (!ok) throw Object.assign(new Error(mensagem), { status: 400 })
}
