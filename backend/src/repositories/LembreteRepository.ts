
import { AppDataSource } from '../config/data-source'
import { Lembrete } from '../models/Lembrete'

const repositorio = AppDataSource.getRepository(Lembrete)

export default {
  listar: () =>
    repositorio.find({
      relations: ['paciente']
    }),

  buscarPorId: (id: number) =>
    repositorio.findOne({
      where: { id },
      relations: ['paciente']
    }),

  criar: (dados: Partial<Lembrete>) =>
    repositorio.save(repositorio.create(dados)),

  atualizar: async (id: number, dados: Partial<Lembrete>) => {
    await repositorio.update(id, dados)
    return repositorio.findOneBy({ id })
  },

  deletar: (id: number) =>
    repositorio.delete(id)
}
