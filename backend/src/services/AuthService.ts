
import { AppDataSource } from '../config/data-source'
import { Paciente } from '../models/Paciente'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class AuthService {
  static async cadastro(dados: any) {
    const repositorio = AppDataSource.getRepository(Paciente)

    const existente = await repositorio.findOne({
      where: { cpf: dados.cpf }
    })

    if (existente) throw new Error('CPF já cadastrado')

    const senha = await bcrypt.hash(dados.senha, 10)

    const codigoPaciente = `P-${Date.now().toString().slice(-8)}`

    const paciente = repositorio.create({
      nome: dados.nome,
      cpf: dados.cpf,
      telefone: dados.telefone,
      senha,
      codigoPaciente
    })

    const salvo = await repositorio.save(paciente)

    return {
      mensagem: 'Cadastro realizado com sucesso',
      id: salvo.id,
      codigoPaciente: salvo.codigoPaciente
    }
  }

  static async login(cpf: string, senha: string) {
    const repositorio = AppDataSource.getRepository(Paciente)

    const paciente = await repositorio
      .createQueryBuilder('paciente')
      .addSelect('paciente.senha')
      .where('paciente.cpf = :cpf', { cpf })
      .getOne()

    if (!paciente) throw new Error('CPF ou senha inválidos')

    const senhaValida = await bcrypt.compare(senha, paciente.senha)

    if (!senhaValida) throw new Error('CPF ou senha inválidos')

    const token = jwt.sign(
      { id: paciente.id },
      process.env.JWT_SECRET || 'chave_temporaria',
      { expiresIn: '1d' }
    )

    return {
      mensagem: 'Login realizado com sucesso',
      token,
      paciente: {
        id: paciente.id,
        nome: paciente.nome,
        cpf: paciente.cpf,
        telefone: paciente.telefone,
        codigoPaciente: paciente.codigoPaciente
      }
    }
  }
}
