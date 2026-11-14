import ItemPaciente from '../../components/ItemPaciente'
import Painel from '../../components/Painel'
import Tela from '../../components/Tela'
import { FILA_ATUAL, FILA_NOVA, UBS } from '../../data/mock'
import { PropsTela } from '../../navigation/tipos'
import CartaoFila from './components/CartaoFila'

const MinhasFilasScreen = ({ paciente, ir }: PropsTela) => (
  <Tela titulo="Minhas filas" subtitulo={`${paciente} · ${UBS}`}>
    <ItemPaciente
      titulo={`Paciente ${paciente}`}
      subtitulo={`Fila ${FILA_ATUAL.codigo} · ${FILA_ATUAL.aFrente} pessoas à frente`}
      direita={FILA_ATUAL.posicao}
    />
    <Painel
      titulo="Seu lugar está preservado"
      subtitulo="Liberar uma consulta não faz você perder sua posição na fila."
    />
    <CartaoFila codigo={FILA_NOVA.codigo} onEntrar={() => ir('entrarFila')} />
  </Tela>
)

export default MinhasFilasScreen
