import { useSaude } from '../../context/SaudeContext'
import { api } from '../../services/api'
import { dataConsulta, horaConsulta } from '../../services/tipos'
import Painel from '../../components/Painel'
import Botao from '../../components/Botao'
import CartaoAgendamento from '../../components/CartaoAgendamento'
import Tela from '../../components/Tela'
import { PropsTela } from '../../navigation/tipos'
import AcoesConsulta from './components/AcoesConsulta'

const InicioScreen = ({ paciente, ir }: PropsTela) => {
  const { consultas, ofertas, executar, atualizar } = useSaude()
  const consulta = consultas.find(c => ['AGENDADA', 'CONFIRMADA'].includes(c.status))
  const oferta = ofertas.find(o => o.status === 'PENDENTE' && new Date(o.expiraEm) > new Date())

  return (
    <Tela titulo={`Olá, ${paciente}!`} subtitulo="Acompanhe seus próximos passos.">
      {oferta ? <Painel titulo="Uma vaga está disponível para você" subtitulo="Veja o prazo e os detalhes da oferta.">
        <Botao rotulo="Ver oferta recebida" onPress={() => ir('oferta')} />
      </Painel> : null}
      {consulta ? <><CartaoAgendamento
        rotulo="Próxima consulta · responda abaixo"
        titulo={`Agendamento C-${consulta.id}`}
        subtitulo={`${consulta.especialidade} · ${consulta.unidade.nome}`}
        data={dataConsulta(consulta.dataHora)}
        hora={horaConsulta(consulta.dataHora)}
      />
      <AcoesConsulta
        confirmada={consulta.status === 'CONFIRMADA'}
        dataHora={`${dataConsulta(consulta.dataHora)}, às ${horaConsulta(consulta.dataHora)}`}
        onConfirmar={() => void executar(() => api(`/consultas/${consulta.id}`, 'PATCH', { status: 'CONFIRMADA' }))}
        onDesfazer={() => void executar(() => api(`/consultas/${consulta.id}`, 'PATCH', { status: 'AGENDADA' }))}
        onRemarcar={() => ir('entrarFila')}
        onNaoVou={() => ir('cancelamento')}
      /></> : <Painel titulo="Nenhuma consulta agendada" subtitulo="Acompanhe suas filas e as próximas oportunidades.">
        <Botao rotulo="Ver minhas filas" onPress={() => ir('minhasFilas')} />
      </Painel>}
      <Botao variante="contornoRoxo" rotulo="Atualizar informações" onPress={() => void executar(atualizar)} />
    </Tela>
  )
}

export default InicioScreen
