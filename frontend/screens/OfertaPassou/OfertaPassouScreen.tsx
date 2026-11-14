import Aviso from '../../components/Aviso'
import Botao from '../../components/Botao'
import ItemPaciente from '../../components/ItemPaciente'
import Painel from '../../components/Painel'
import Tela from '../../components/Tela'
import { FILA_NOVA, PROXIMA_PESSOA, UBS } from '../../data/mock'
import { PropsTela } from '../../navigation/tipos'

const OfertaPassouScreen = ({ ir, raiz }: PropsTela) => (
  <Tela titulo="A consulta passou adiante" subtitulo={`Fila ${FILA_NOVA.codigo} · ${UBS}`}>
    <Aviso variante="info" titulo="A vaga não fica parada" texto="Você recusou esta oferta." />
    <ItemPaciente titulo={`Paciente ${PROXIMA_PESSOA.paciente}`} subtitulo={PROXIMA_PESSOA.detalhe}
      direita={PROXIMA_PESSOA.espera} />
    <Painel titulo="Você continua na fila"
      subtitulo="Recusar ou deixar o prazo vencer não confirma a vaga. Aguarde outra oferta." />
    <Botao rotulo="Ver minha fila" onPress={() => ir('minhasFilas')} />
    <Botao variante="contornoRoxo" rotulo="Voltar ao início" onPress={() => raiz('inicio')} />
  </Tela>
)

export default OfertaPassouScreen
