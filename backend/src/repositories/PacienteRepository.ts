
import { AppDataSource } from '../config/data-source'
import { Paciente } from '../models/Paciente'

const repositorio = AppDataSource.getRepository(Paciente)

export default {
  listar: () => repositorio.find(),

  buscarPorId: (id: number) =>
    repositorio.findOneBy({ id }),

  buscarPorCpf: (cpf: string) =>
    repositorio.findOneBy({ cpf }),

  criar: (dados: Partial<Paciente>) =>
    repositorio.save(repositorio.create(dados)),

  atualizar: async (id: number, dados: Partial<Paciente>) => {
    await repositorio.update(id, dados)
    return repositorio.findOneBy({ id })
  },

  deletar: (id: number) =>
    repositorio.delete(id)
}
