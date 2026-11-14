
import { AppDataSource } from '../config/data-source'
import { Oferta } from '../models/Oferta'

const repositorio = AppDataSource.getRepository(Oferta)

export default {
  listar: () =>
    repositorio.find({
      relations: ['paciente', 'participacao']
    }),

  buscarPorId: (id: number) =>
    repositorio.findOne({
      where: { id },
      relations: ['paciente', 'participacao']
    }),

  criar: (dados: Partial<Oferta>) =>
    repositorio.save(repositorio.create(dados)),

  atualizar: async (id: number, dados: Partial<Oferta>) => {
    await repositorio.update(id, dados)
    return repositorio.findOneBy({ id })
  },

  deletar: (id: number) =>
    repositorio.delete(id)
}
