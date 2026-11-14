
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from 'typeorm'

import { Paciente } from './Paciente'
import { Unidade } from './Unidade'

@Entity('consultas')
export class Consulta {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Paciente, paciente => paciente.consultas)
  paciente!: Paciente

  @ManyToOne(() => Unidade, unidade => unidade.consultas)
  unidade!: Unidade

  @Column({ length: 120 })
  especialidade!: string

  @Column({ type: 'datetime' })
  dataHora!: Date

  @Column({ length: 20, default: 'AGENDADA' })
  status!: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  motivoCancelamento?: string

  @CreateDateColumn()
  criadaEm!: Date
}
