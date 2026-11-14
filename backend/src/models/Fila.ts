
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn
} from 'typeorm'

import { Unidade } from './Unidade'
import { ParticipacaoFila } from './ParticipacaoFila'

@Entity('filas')
export class Fila {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 120 })
  especialidade!: string

  @Column({ type: 'date' })
  dataReferencia!: string

  @Column({ default: true })
  ativa!: boolean

  @ManyToOne(() => Unidade, unidade => unidade.filas)
  unidade!: Unidade

  @OneToMany(() => ParticipacaoFila, participacao => participacao.fila)
  participacoes!: ParticipacaoFila[]

  @CreateDateColumn()
  criadaEm!: Date
}
