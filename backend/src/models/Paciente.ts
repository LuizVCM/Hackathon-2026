
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany
} from 'typeorm'

import { ParticipacaoFila } from './ParticipacaoFila'
import { Consulta } from './Consulta'
import { Oferta } from './Oferta'
import { Lembrete } from './Lembrete'

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true, length: 14 })
  cpf!: string

  @Column({ length: 100 })
  nome!: string

  @Column({ length: 20 })
  telefone!: string

  @Column({ select: false })
  senha!: string

  @Column({ unique: true, length: 12 })
  codigoPaciente!: string

  @CreateDateColumn()
  criadoEm!: Date

  @OneToMany(() => ParticipacaoFila, item => item.paciente)
  participacoes!: ParticipacaoFila[]

  @OneToMany(() => Consulta, item => item.paciente)
  consultas!: Consulta[]

  @OneToMany(() => Oferta, item => item.paciente)
  ofertas!: Oferta[]

  @OneToMany(() => Lembrete, item => item.paciente)
  lembretes!: Lembrete[]
}
