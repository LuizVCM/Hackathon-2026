
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from 'typeorm'

import { Paciente } from './Paciente'
import { ParticipacaoFila } from './ParticipacaoFila'

export type StatusOferta =
  | 'PENDENTE'
  | 'ACEITA'
  | 'RECUSADA'
  | 'EXPIRADA'
  | 'PASSOU'

@Entity('ofertas')
export class Oferta {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Paciente, paciente => paciente.ofertas)
  paciente!: Paciente

  @ManyToOne(() => ParticipacaoFila, participacao => participacao.ofertas)
  participacao!: ParticipacaoFila

  @Column({
    type: 'enum',
    enum: [
      'PENDENTE',
      'ACEITA',
      'RECUSADA',
      'EXPIRADA',
      'PASSOU'
    ],
    default: 'PENDENTE'
  })
  status!: StatusOferta

  @Column({ type: 'datetime', nullable: true })
  expiraEm?: Date

  @CreateDateColumn()
  criadaEm!: Date
}
