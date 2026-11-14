import Botao from '../../components/Botao'
import ItemPaciente from '../../components/ItemPaciente'
import Tela from '../../components/Tela'
import { FILA_DA_VAGA, UBS, VAGA } from '../../data/mock'
import { PropsTela } from '../../navigation/tipos'
import CartaoVaga from './components/CartaoVaga'

const VagaLiberadaScreen = ({ ir }: PropsTela) => (
  <Tela titulo="Uma vaga foi liberada">
    <CartaoVaga codigo={VAGA.codigo} hora={VAGA.hora} data="19 nov" ubs={UBS} />
    {FILA_DA_VAGA.map((p) => (
      <ItemPaciente key={p.paciente} titulo={`Paciente ${p.paciente}`} subtitulo={p.detalhe}
        direita={p.espera} destaque={p.compativel} />
    ))}
    <Botao rotulo="Simular envio da oferta" onPress={() => ir('oferta')} />
  </Tela>
)

export default VagaLiberadaScreen
