import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { Paciente } from './Paciente'

@Entity('preferencias_lembrete')
export class PreferenciaLembrete {
  @PrimaryColumn()
  pacienteId!: number

  @OneToOne(() => Paciente, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pacienteId' })
  paciente!: Paciente

  @Column({ length: 12, default: 'app' })
  canal!: string

  @Column({ type: 'simple-json' })
  horarios!: { hora: number; ativo: boolean }[]
}
