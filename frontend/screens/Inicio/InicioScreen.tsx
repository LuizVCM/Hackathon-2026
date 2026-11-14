import { useState } from 'react'
import CartaoAgendamento from '../../components/CartaoAgendamento'
import Tela from '../../components/Tela'
import { CONSULTA, UBS } from '../../data/mock'
import { PropsTela } from '../../navigation/tipos'
import AcoesConsulta from './components/AcoesConsulta'

const InicioScreen = ({ paciente, ir }: PropsTela) => {
  const [confirmada, setConfirmada] = useState(false)

  return (
    <Tela titulo={`Olá, ${paciente}!`} subtitulo="Acompanhe seus próximos passos.">
      <CartaoAgendamento
        rotulo="Próxima consulta · responda abaixo"
        titulo={`Agendamento ${CONSULTA.codigo}`}
        subtitulo={UBS}
        data={CONSULTA.data}
        hora={CONSULTA.hora}
      />
      <AcoesConsulta
        confirmada={confirmada}
        dataHora={`${CONSULTA.data}, às ${CONSULTA.hora}`}
        onConfirmar={() => setConfirmada(true)}
        onDesfazer={() => setConfirmada(false)}
        onRemarcar={() => ir('entrarFila')}
        onNaoVou={() => ir('cancelamento')}
      />
    </Tela>
  )
}

export default InicioScreen
