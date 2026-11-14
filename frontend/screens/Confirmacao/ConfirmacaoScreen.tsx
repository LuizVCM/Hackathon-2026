import Aviso from '../../components/Aviso'
import Botao from '../../components/Botao'
import CartaoAgendamento from '../../components/CartaoAgendamento'
import Tela from '../../components/Tela'
import { UBS, VAGA } from '../../data/mock'
import { PropsTela } from '../../navigation/tipos'

const ConfirmacaoScreen = ({ paciente, raiz }: PropsTela) => (
  <Tela titulo="Tudo pronto." subtitulo="Seu agendamento está confirmado.">
    <Aviso variante="sucesso" titulo="Vaga confirmada"
      texto="Ótimo. Enviamos o endereço e o horário de chegada." />
    <CartaoAgendamento rotulo="Agendamento confirmado" titulo={`Paciente ${paciente}`}
      subtitulo={UBS} data={VAGA.data} hora={VAGA.hora} />
    <Botao rotulo="Voltar ao início" onPress={() => raiz('inicio')} />
    <Botao variante="contornoRoxo" rotulo="Ver minha fila" onPress={() => raiz('minhasFilas')} />
  </Tela>
)

export default ConfirmacaoScreen
