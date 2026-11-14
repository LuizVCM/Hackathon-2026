import { DataSource } from "typeorm"
import { Unidade } from "../models/Unidade"
import { Paciente } from "../models/Paciente"
import { Fila } from "../models/Fila"
import { ParticipacaoFila } from "../models/ParticipacaoFila"
import { Consulta } from "../models/Consulta"
import { Oferta } from "../models/Oferta"
import { Lembrete } from "../models/Lembrete"
import { AppDataSource } from "../config/data-source"
 // ⚠️ Ajuste o caminho para onde está o seu DataSource principal do TypeORM

export async function runSeed(dataSource: DataSource) {
    const unidadeRepo = dataSource.getRepository(Unidade)
    const pacienteRepo = dataSource.getRepository(Paciente)
    const filaRepo = dataSource.getRepository(Fila)
    const participacaoRepo = dataSource.getRepository(ParticipacaoFila)
    const consultaRepo = dataSource.getRepository(Consulta)
    const ofertaRepo = dataSource.getRepository(Oferta)
    const lembreteRepo = dataSource.getRepository(Lembrete)

    console.log('🌱 Iniciando o seed do banco de dados...')

    // 1. Criar Unidades de Saúde
    const unidade1 = unidadeRepo.create({
        nome: 'UBS Central',
        endereco: 'Rua Principal, 100 - Centro',
        telefone: '(51) 3333-1111'
    })

    const unidade2 = unidadeRepo.create({
        nome: 'UBS Bairro Novo',
        endereco: 'Av. das Flores, 500 - Bairro Novo',
        telefone: '(51) 3333-2222'
    })

    await unidadeRepo.save([unidade1, unidade2])

    // 2. Criar Pacientes
    const paciente1 = pacienteRepo.create({
        cpf: '12345678901',
        nome: 'Ana Souza',
        telefone: '(51) 98888-1111',
        senha: 'senha_criptografada_1',
        codigoPaciente: 'PAC-001'
    })

    const paciente2 = pacienteRepo.create({
        cpf: '98765432109',
        nome: 'Carlos Silva',
        telefone: '(51) 97777-2222',
        senha: 'senha_criptografada_2',
        codigoPaciente: 'PAC-002'
    })

    await pacienteRepo.save([paciente1, paciente2])

    // 3. Criar Filas de Atendimento
    const fila1 = filaRepo.create({
        especialidade: 'Cardiologia',
        dataReferencia: '2026-06-01',
        ativa: true,
        unidade: unidade1
    })

    const fila2 = filaRepo.create({
        especialidade: 'Pediatria',
        dataReferencia: '2026-06-01',
        ativa: true,
        unidade: unidade2
    })

    await filaRepo.save([fila1, fila2])

    // 4. Criar Participações na Fila
    const participacao1 = participacaoRepo.create({
        paciente: paciente2,
        fila: fila1,
        status: 'AGUARDANDO'
    })

    await participacaoRepo.save(participacao1)

    // 5. Criar Consultas Agendadas
    const consulta1 = consultaRepo.create({
        paciente: paciente1,
        unidade: unidade1,
        especialidade: 'Clínica Geral',
        dataHora: new Date('2026-06-10T14:30:00'),
        status: 'AGENDADA'
    })

    await consultaRepo.save(consulta1)

    // 6. Criar Ofertas de Vagas
    const oferta1 = ofertaRepo.create({
        paciente: paciente2,
        participacao: participacao1,
        status: 'PENDENTE',
        expiraEm: new Date('2026-06-02T18:00:00')
    })

    await ofertaRepo.save(oferta1)

    // 7. Criar Lembretes para os Pacientes
    const lembrete1 = lembreteRepo.create({
        paciente: paciente1,
        titulo: 'Consulta Confirmada',
        mensagem: 'Sua consulta de Clínica Geral na UBS Central está agendada para o dia 10/06 às 14:30.',
        dataHora: new Date('2026-06-09T08:00:00'),
        lido: false
    })

    await lembreteRepo.save(lembrete1)

    console.log('✅ Seed finalizado com sucesso!')
}

// 🚀 Executa a seed automaticamente ao rodar o arquivo
async function execute() {
    try {
        console.log('⏳ Conectando ao banco de dados...')
        await AppDataSource.initialize()
        console.log('📦 Conexão estabelecida com sucesso!')

        await runSeed(AppDataSource)

        await AppDataSource.destroy()
        process.exit(0)
    } catch (error) {
        console.error('❌ Erro ao executar a seed:', error)
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy()
        }
        process.exit(1)
    }
}

execute()