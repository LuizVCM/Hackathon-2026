import Aviso from '../../components/Aviso'
import Botao from '../../components/Botao'
import CartaoAgendamento from '../../components/CartaoAgendamento'
import Tela from '../../components/Tela'
import { useSaude } from '../../context/SaudeContext'
import { dataConsulta, horaConsulta } from '../../services/tipos'
import { PropsTela } from '../../navigation/tipos'
export default function ConfirmacaoScreen({ raiz }: PropsTela) {
  const { consultas } = useSaude()
  const consulta = consultas.find(c => c.status === 'CONFIRMADA')
  return <Tela titulo={consulta ? 'Tudo pronto.' : 'Acompanhe seu agendamento'} subtitulo="Situação informada pela unidade.">
    {consulta ? <><Aviso variante="sucesso" titulo="Presença confirmada" texto="Sua confirmação foi registrada." />
      <CartaoAgendamento rotulo="Agendamento confirmado" titulo={`Consulta C-${consulta.id}`} subtitulo={consulta.unidade.nome} data={dataConsulta(consulta.dataHora)} hora={horaConsulta(consulta.dataHora)} />
    </> : <Aviso variante="info" texto="Nenhum agendamento confirmado. Aguarde a validação da unidade." />}
    <Botao rotulo="Voltar ao início" onPress={() => raiz('inicio')} />
  </Tela>
}
