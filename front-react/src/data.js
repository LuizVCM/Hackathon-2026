// Dados fictícios (protótipo) – troque por chamadas à API quando houver back-end
export const paciente = { codigo: 'P-1042', unidade: 'UBS Setor Sul' }
export const consulta = { id: 'C-1042', data: '19 nov · qui', hora: '14h30', fila: 'F-02' }
export const vaga = { id: 'V-2048', data: '19 nov · qui', hora: '07h40', unidade: 'UBS Setor Sul' }
export const fila = [
  { codigo: 'P-1001', info: 'Horário indisponível', dias: 45 },
  { codigo: 'P-1002', info: 'Preferências pendentes', dias: 60 },
  { codigo: 'P-1042', info: 'Compatível · oferta para você', dias: 42, eu: true },
]
export const motivos = ['Não tenho transporte', 'Não consigo no horário', 'Esqueci o agendamento', 'Outro motivo']
