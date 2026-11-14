export type Paciente = { id: number; nome: string; codigoPaciente: string }
export type Unidade = { nome: string; endereco: string }
export type Consulta = { id: number; especialidade: string; dataHora: string; status: string; unidade: Unidade }
export type Fila = { id: number; especialidade: string; unidade: Unidade; dataReferencia: string }
export type Participacao = { id: number; status: string; posicao: number | null; fila: Fila }
export type Oferta = { id: number; status: string; expiraEm: string; participacao: Participacao }
export type Preferencias = { canal: 'app' | 'whatsapp' | 'ambos'; horarios: { hora: number; ativo: boolean }[] }
export const dataConsulta = (data: string) => new Date(data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', weekday: 'short' })
export const horaConsulta = (data: string) => new Date(data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
