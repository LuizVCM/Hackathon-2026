
import { AppDataSource } from '../config/data-source'
import { Fila } from '../models/Fila'

const repositorio = AppDataSource.getRepository(Fila)

export default {
  listar: () =>
    repositorio.find({
      relations: ['unidade', 'participacoes']
    }),

  buscarPorId: (id: number) =>
    repositorio.findOne({
      where: { id },
      relations: ['unidade', 'participacoes']
    }),

  criar: (dados: Partial<Fila>) =>
    repositorio.save(repositorio.create(dados)),

  atualizar: async (id: number, dados: Partial<Fila>) => {
    await repositorio.update(id, dados)
    return repositorio.findOneBy({ id })
  },

  deletar: (id: number) =>
    repositorio.delete(id)
}
