
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm'

import { Fila } from './Fila'
import { Consulta } from './Consulta'

@Entity('unidades')
export class Unidade {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 120 })
  nome!: string

  @Column({ length: 180 })
  endereco!: string

  @Column({ length: 20, nullable: true })
  telefone?: string

  @OneToMany(() => Fila, fila => fila.unidade)
  filas!: Fila[]

  @OneToMany(() => Consulta, consulta => consulta.unidade)
  consultas!: Consulta[]
}
