export type NomeTela =
  | 'login' | 'cadastro' | 'inicio' | 'entrarFila' | 'minhasFilas' | 'cancelamento'
  | 'vagaLiberada' | 'oferta' | 'confirmacao' | 'lembretes' | 'aguardando'
  | 'ofertaPassou' | 'lugarMantido' | 'ajuda'

export type Aba = 'inicio' | 'filas' | 'lembretes' | 'ajuda'

export const TELA_DA_ABA: Record<Aba, NomeTela> = {
  inicio: 'inicio',
  filas: 'minhasFilas',
  lembretes: 'lembretes',
  ajuda: 'ajuda',
}

// Qual aba fica destacada em cada tela (conforme o Figma)
export const ABA_DA_TELA: Partial<Record<NomeTela, Aba>> = {
  inicio: 'inicio', cancelamento: 'inicio', confirmacao: 'inicio',
  entrarFila: 'filas', minhasFilas: 'filas', vagaLiberada: 'filas', oferta: 'filas',
  aguardando: 'filas', ofertaPassou: 'filas', lugarMantido: 'filas',
  lembretes: 'lembretes', ajuda: 'ajuda',
}

export type PropsTela = {
  paciente: string
  /** empilha uma tela (o botão voltar do Android desempilha) */
  ir: (tela: NomeTela) => void
  /** reinicia a pilha em uma tela (abas e "Voltar ao início") */
  raiz: (tela: NomeTela) => void
}
