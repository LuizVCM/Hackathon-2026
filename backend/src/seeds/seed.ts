import 'reflect-metadata'
import bcrypt from 'bcrypt'
import { AppDataSource as db } from '../config/data-source'
import { Paciente } from '../models/Paciente'
import { Unidade } from '../models/Unidade'
import { Fila } from '../models/Fila'
import { ParticipacaoFila } from '../models/ParticipacaoFila'
import { Consulta } from '../models/Consulta'
import { Oferta } from '../models/Oferta'
async function seed() {
  await db.initialize()
  try {
    await db.transaction(async m => {
      if (await m.getRepository(Paciente).existsBy({ cpf: '12345678901' })) {
        console.log('Dados de demonstração já existentes; nenhum registro alterado.'); return
      }
      const unidade = await m.save(Unidade, m.create(Unidade, { nome: 'UBS Setor Sul', endereco: 'Rua da Saúde, 100 · Setor Sul' }))
      const paciente = await m.save(Paciente, m.create(Paciente, { nome: 'Ana Souza', cpf: '12345678901', telefone: '11999999999', senha: await bcrypt.hash('Consulta123!', 12), codigoPaciente: 'P-1042' }))
      const data = new Date(); data.setDate(data.getDate() + 5); data.setHours(14, 30, 0, 0)
      const fila = await m.save(Fila, m.create(Fila, { unidade, especialidade: 'Clínica geral', dataReferencia: data.toISOString().slice(0, 10), ativa: true }))
      await m.save(Fila, m.create(Fila, { unidade, especialidade: 'Exames de rotina', dataReferencia: data.toISOString().slice(0, 10), ativa: true }))
      const participacao = await m.save(ParticipacaoFila, m.create(ParticipacaoFila, { paciente, fila, status: 'AGUARDANDO', possuiTransporte: true }))
      await m.save(Consulta, m.create(Consulta, { paciente, unidade, especialidade: 'Clínica geral', dataHora: data, status: 'AGENDADA' }))
      await m.save(Oferta, m.create(Oferta, { paciente, participacao, status: 'PENDENTE', expiraEm: new Date(Date.now() + 20 * 60000) }))
      console.log('Demonstração criada. CPF: 12345678901 / senha: Consulta123!')
    })
  } finally { await db.destroy() }
}
seed().catch(e => { console.error(e); process.exitCode = 1 })
