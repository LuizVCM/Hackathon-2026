
import { Paciente } from '../models/Paciente'

export function omitPassword(paciente: Paciente) {
    const { senha, ...dadosPaciente } = paciente

    return dadosPaciente
}
