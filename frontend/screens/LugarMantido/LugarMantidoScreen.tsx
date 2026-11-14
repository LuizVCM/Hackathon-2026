import Aviso from '../../components/Aviso'
import Botao from '../../components/Botao'
import ItemPaciente from '../../components/ItemPaciente'
import Painel from '../../components/Painel'
import Tela from '../../components/Tela'
import { FILA_ATUAL, UBS } from '../../data/mock'
import { PropsTela } from '../../navigation/tipos'

const LugarMantidoScreen = ({ paciente, raiz }: PropsTela) => (
  <Tela titulo="Seu lugar está mantido" subtitulo={`Fila ${FILA_ATUAL.codigo} · ${UBS}`}>
    <Aviso variante="sucesso" titulo="Vaga liberada"
      texto="Sua consulta será reaproveitada por outra pessoa da fila." />
    <ItemPaciente titulo={`Paciente ${paciente}`}
      subtitulo={`Fila ${FILA_ATUAL.codigo} · ${FILA_ATUAL.aFrente} pessoas à frente`}
      direita={FILA_ATUAL.posicao} />
    <Painel titulo="Aguarde uma nova oferta"
      subtitulo="Seu lugar não mudou. Nenhuma nova consulta está confirmada ainda." />
    <Botao rotulo="Acompanhar minha fila" onPress={() => raiz('minhasFilas')} />
    <Botao variante="contornoRoxo" rotulo="Voltar ao início" onPress={() => raiz('inicio')} />
  </Tela>
)

export default LugarMantidoScreen
