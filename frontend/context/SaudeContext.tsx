import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import { api, ApiError, restaurarToken, salvarToken } from '../services/api'
import { Consulta, Fila, Oferta, Paciente, Participacao } from '../services/tipos'

function useSaudeState() {
  const [paciente, setPaciente] = useState<Paciente | null>(null)
  const [pronto, setPronto] = useState(false)
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [filas, setFilas] = useState<Fila[]>([])
  const [participacoes, setParticipacoes] = useState<Participacao[]>([])
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [filaId, setFilaId] = useState<number | null>(null)
  const [erro, setErro] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const bloqueio = useRef(false)
  const atualizar = useCallback(async () => {
    const [c, f, p, o] = await Promise.all([
      api<Consulta[]>('/consultas'), api<Fila[]>('/filas'),
      api<Participacao[]>('/filas/minhas'), api<Oferta[]>('/ofertas'),
    ])
    setConsultas(c); setFilas(f); setParticipacoes(p); setOfertas(o)
  }, [])
  useEffect(() => {
    let ativo = true
    async function restaurar() {
      try {
        if (await restaurarToken()) {
          const p = await api<Paciente>('/auth/me')
          if (ativo) setPaciente(p)
          await atualizar()
        }
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) await salvarToken(null)
        if (ativo) setErro(e instanceof Error ? e.message : 'Falha ao restaurar sessão.')
      }
      finally { if (ativo) setPronto(true) }
    }
    void restaurar()
    return () => { ativo = false }
  }, [atualizar])
  async function entrar(cpf: string, senha: string) {
    const resultado = await api<{ token: string; paciente: Paciente }>('/auth/login', 'POST', { cpf: cpf.replace(/\D/g, ''), senha })
    await salvarToken(resultado.token)
    setPaciente(resultado.paciente)
    await atualizar()
  }
  async function cadastrar(dados: { nome: string; cpf: string; telefone: string; senha: string }) {
    await api('/auth/cadastro', 'POST', { ...dados, cpf: dados.cpf.replace(/\D/g, ''), telefone: dados.telefone.replace(/\D/g, '') })
    await entrar(dados.cpf, dados.senha)
  }
  async function executar(acao: () => Promise<unknown>, sucesso?: () => void) {
    if (bloqueio.current) return
    bloqueio.current = true
    setOcupado(true); setErro('')
    try { await acao(); await atualizar(); sucesso?.() }
    catch (e) {
      if (e instanceof ApiError && e.status === 401) await sair()
      setErro(e instanceof Error ? e.message : 'Não foi possível concluir.')
    }
    finally { bloqueio.current = false; setOcupado(false) }
  }
  async function sair() {
    await salvarToken(null); setPaciente(null); setConsultas([]); setFilas([]); setParticipacoes([]); setOfertas([]); setFilaId(null); setErro('')
  }
  return { paciente, pronto, consultas, filas, participacoes, ofertas, filaId, setFilaId, erro, setErro, ocupado, entrar, cadastrar, atualizar, executar, sair }
}
const SaudeContext = createContext<ReturnType<typeof useSaudeState> | null>(null)
export function SaudeProvider({ children }: { children: ReactNode }) {
  return <SaudeContext.Provider value={useSaudeState()}>{children}</SaudeContext.Provider>
}
export function useSaude() {
  const value = useContext(SaudeContext)
  if (!value) throw new Error('SaudeProvider ausente')
  return value
}
