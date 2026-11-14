import Aviso from '../../components/Aviso'
import Botao from '../../components/Botao'
import Painel from '../../components/Painel'
import Tela from '../../components/Tela'
import { useSaude } from '../../context/SaudeContext'
import { PropsTela } from '../../navigation/tipos'
export default function AguardandoScreen({ ir }: PropsTela) {
  const { participacoes, executar, atualizar } = useSaude()
  const pendentes = participacoes.filter(p => p.status === 'AGUARDANDO_VALIDACAO')
  return <Tela titulo="Aguardando a unidade" subtitulo="Acompanhe a resposta da sua unidade.">
    <Aviso variante="atencao" titulo="Aceite em validação" texto="O agendamento só será confirmado quando a unidade validar a substituição." />
    {pendentes.map(p => <Painel key={p.id} titulo={p.fila.especialidade} subtitulo={p.fila.unidade.nome} />)}
    <Botao rotulo="Atualizar situação" onPress={() => void executar(atualizar, () => ir('minhasFilas'))} />
    <Botao variante="contornoRoxo" rotulo="Acompanhar minha fila" onPress={() => ir('minhasFilas')} />
  </Tela>
}
