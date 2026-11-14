import Aviso from '../../components/Aviso'
import Botao from '../../components/Botao'
import Painel from '../../components/Painel'
import Tela from '../../components/Tela'
import { UBS, VAGA } from '../../data/mock'
import { PropsTela } from '../../navigation/tipos'
import DemonstracaoUnidade from './components/DemonstracaoUnidade'

const AguardandoScreen = ({ paciente, ir }: PropsTela) => (
  <Tela titulo="Aguardando a unidade" subtitulo="Seu aceite foi recebido.">
    <Aviso variante="atencao" titulo="Aceite em validação"
      texto="A vaga só será confirmada depois que a unidade validar a substituição." />
    <Painel titulo={`Vaga ${VAGA.codigo} · ${paciente}`}
      subtitulo={`19 nov · ${VAGA.hora}\n${UBS}`} />
    <Botao variante="contornoRoxo" rotulo="Acompanhar minha fila" onPress={() => ir('minhasFilas')} />
    <DemonstracaoUnidade onValidar={() => ir('confirmacao')} onNaoValidar={() => ir('ofertaPassou')} />
  </Tela>
)

export default AguardandoScreen
