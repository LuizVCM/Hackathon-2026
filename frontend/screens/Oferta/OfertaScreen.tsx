import Aviso from '../../components/Aviso'
import CartaoAgendamento from '../../components/CartaoAgendamento'
import Tela from '../../components/Tela'
import { UBS, VAGA } from '../../data/mock'
import { PropsTela } from '../../navigation/tipos'
import AcoesOferta from './components/AcoesOferta'

const OfertaScreen = ({ paciente, ir }: PropsTela) => (
  <Tela titulo="Uma nova oportunidade" subtitulo="Aceitar ainda depende da validação da unidade.">
    <CartaoAgendamento
      rotulo="Nova vaga disponível"
      titulo={`Vaga ${VAGA.codigo}`}
      subtitulo={`${UBS} · paciente ${paciente}`}
      data={VAGA.data}
      hora={VAGA.hora}
    />
    <Aviso
      variante="atencao"
      titulo="Responda em 20 minutos"
      texto="Toque para simular o fim do prazo."
      onPress={() => ir('ofertaPassou')}
    />
    <AcoesOferta
      onAceitar={() => ir('aguardando')}
      onTransporte={() => ir('ajuda')}
      onRecusar={() => ir('ofertaPassou')}
    />
  </Tela>
)

export default OfertaScreen
