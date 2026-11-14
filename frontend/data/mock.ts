// Dados de demonstração (o backend ainda não está integrado).
export const PACIENTE_PADRAO = 'P-1042'
export const UBS = 'UBS Setor Sul'

export const CONSULTA = { codigo: 'C-1042', data: '19 nov · qui', hora: '14h30' }
export const VAGA = { codigo: 'V-2048', data: '19 nov · qui', hora: '07h40' }
export const FILA_ATUAL = { codigo: 'F-01', posicao: '5ª', aFrente: 4 }
export const FILA_NOVA = { codigo: 'F-02' }

export const FILA_DA_VAGA = [
  { paciente: 'P-1001', detalhe: 'Horário indisponível', espera: '45d', compativel: false },
  { paciente: 'P-1002', detalhe: 'Preferências pendentes', espera: '60d', compativel: false },
  { paciente: 'P-1042', detalhe: 'Compatível · oferta para você', espera: '42d', compativel: true },
]

export const PROXIMA_PESSOA = { paciente: 'P-1004', detalhe: 'Próxima pessoa compatível', espera: '30d' }

export const MOTIVOS_CANCELAMENTO = [
  { chave: 'transporte', rotulo: 'Não tenho transporte' },
  { chave: 'horario', rotulo: 'Não consigo no horário' },
  { chave: 'esqueci', rotulo: 'Esqueci o agendamento' },
  { chave: 'outro', rotulo: 'Outro motivo' },
]
