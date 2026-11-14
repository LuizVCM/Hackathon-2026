
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from 'typeorm'

import { Paciente } from './Paciente'

@Entity('lembretes')
export class Lembrete {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Paciente, paciente => paciente.lembretes, {
    onDelete: 'CASCADE'
  })
  paciente!: Paciente

  @Column({ length: 160 })
  titulo!: string

  @Column({ type: 'text' })
  mensagem!: string

  @Column({ type: 'datetime', nullable: true })
  dataHora?: Date

  @Column({ default: false })
  lido!: boolean

  @CreateDateColumn()
  criadoEm!: Date
}
