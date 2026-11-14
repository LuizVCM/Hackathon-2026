
import { AppDataSource } from '../config/data-source'
import { Consulta } from '../models/Consulta'

const repositorio = AppDataSource.getRepository(Consulta)

export default {
  listar: () =>
    repositorio.find({
      relations: ['paciente', 'unidade']
    }),

  buscarPorId: (id: number) =>
    repositorio.findOne({
      where: { id },
      relations: ['paciente', 'unidade']
    }),

  criar: (dados: Partial<Consulta>) =>
    repositorio.save(repositorio.create(dados)),

  atualizar: async (id: number, dados: Partial<Consulta>) => {
    await repositorio.update(id, dados)
    return repositorio.findOneBy({ id })
  },

  deletar: (id: number) =>
    repositorio.delete(id)
}
