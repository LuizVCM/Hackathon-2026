import ItemPaciente from '../../components/ItemPaciente'
import Painel from '../../components/Painel'
import Tela from '../../components/Tela'
import Botao from '../../components/Botao'
import { useSaude } from '../../context/SaudeContext'
import { PropsTela } from '../../navigation/tipos'

export default function MinhasFilasScreen({ paciente, ir }: PropsTela) {
  const { participacoes, filas, ofertas, setFilaId, executar, atualizar } = useSaude()
  return <Tela titulo="Minhas filas" subtitulo={`${paciente} · Acompanhe seu lugar`}>
    {participacoes.length === 0 ? <Painel titulo="Você ainda não entrou em uma fila" subtitulo="Escolha uma especialidade abaixo e revise suas preferências." /> : null}
    {participacoes.map(p => <Painel key={p.id} titulo={`Fila F-${p.fila.id} · ${p.fila.especialidade}`} subtitulo={p.fila.unidade.nome}>
      <ItemPaciente titulo={p.posicao ? `${p.posicao}ª posição` : p.status.replace(/_/g, ' ')}
        subtitulo={p.posicao ? `${p.posicao - 1} pessoa(s) à frente` : 'Acompanhe as atualizações da unidade.'} direita={p.posicao ? String(p.posicao) : '—'} />
    </Painel>)}
    {ofertas.some(o => o.status === 'PENDENTE' && new Date(o.expiraEm) > new Date()) ? <Botao rotulo="Ver oferta recebida" onPress={() => ir('oferta')} /> : null}
    {filas.filter(f => !participacoes.some(p => p.fila.id === f.id && !['CANCELADA', 'ATENDIDA', 'PASSOU'].includes(p.status))).map(f =>
      <Painel key={f.id} titulo={`Fila F-${f.id} · ${f.especialidade}`} subtitulo={f.unidade.nome}>
        <Botao rotulo="Entrar nesta fila" onPress={() => { setFilaId(f.id); ir('entrarFila') }} />
      </Painel>)}
    <Botao variante="contornoRoxo" rotulo="Atualizar minha posição" onPress={() => void executar(atualizar)} />
  </Tela>
}
