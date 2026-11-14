
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany
} from 'typeorm'

import { Paciente } from './Paciente'
import { Fila } from './Fila'
import { Oferta } from './Oferta'

export type StatusParticipacao =
  | 'AGUARDANDO'
  | 'AGUARDANDO_VALIDACAO'
  | 'OFERTADA'
  | 'CONFIRMADA'
  | 'CANCELADA'
  | 'ATENDIDA'
  | 'PASSOU'

@Entity('participacoes_fila')
export class ParticipacaoFila {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Paciente, paciente => paciente.participacoes, {
    onDelete: 'CASCADE'
  })
  paciente!: Paciente

  @ManyToOne(() => Fila, fila => fila.participacoes, {
    onDelete: 'CASCADE'
  })
  fila!: Fila

  @Column({
    type: 'enum',
    enum: [
      'AGUARDANDO',
      'AGUARDANDO_VALIDACAO',
      'OFERTADA',
      'CONFIRMADA',
      'CANCELADA',
      'ATENDIDA',
      'PASSOU'
    ],
    default: 'AGUARDANDO'
  })
  status!: StatusParticipacao

  @Column({ type: 'int', default: 5 })
  distanciaMaximaKm!: number

  @Column({ default: false })
  possuiTransporte!: boolean

  @Column({ length: 30, default: 'QUALQUER' })
  disponibilidade!: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  motivoCancelamento?: string

  @CreateDateColumn()
  entrouEm!: Date

  @OneToMany(() => Oferta, oferta => oferta.participacao)
  ofertas!: Oferta[]
}
