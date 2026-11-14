import { useState } from 'react'
import { useSaude } from '../../context/SaudeContext'
import { api } from '../../services/api'
import { View } from 'react-native'
import Botao from '../../components/Botao'
import Painel from '../../components/Painel'
import Tela from '../../components/Tela'
import { MOTIVOS_CANCELAMENTO } from './motivos'
import { PropsTela } from '../../navigation/tipos'
import OpcaoMotivo from './components/OpcaoMotivo'

const CancelamentoScreen = ({ paciente, ir, raiz }: PropsTela) => {
  const [motivo, setMotivo] = useState('transporte')
  const { consultas, executar } = useSaude()
  const consulta = consultas.find(c => ['AGENDADA', 'CONFIRMADA'].includes(c.status))

  return (
    <Tela titulo={`Olá, ${paciente}!`} sobrepor>
      <Painel titulo="O que aconteceu?" subtitulo="Sua resposta ajuda a unidade a reaproveitar a vaga.">
        <View style={{ gap: 10, marginVertical: 4 }} accessibilityRole="radiogroup">
          {MOTIVOS_CANCELAMENTO.map((m) => (
            <OpcaoMotivo key={m.chave} rotulo={m.rotulo} selecionada={motivo === m.chave}
              onPress={() => setMotivo(m.chave)} />
          ))}
        </View>
        <View style={{ gap: 12, marginTop: 8 }}>
          <Botao variante="contornoVermelho" rotulo="Cancelar consulta" desabilitado={!consulta}
            onPress={() => consulta && void executar(() => api(`/consultas/${consulta.id}`, 'PATCH', { status: 'CANCELADA', motivo }), () => ir('lugarMantido'))} />
          <Botao variante="contornoRoxo" rotulo="Voltar sem cancelar" onPress={() => raiz('inicio')} />
        </View>
      </Painel>
    </Tela>
  )
}

export default CancelamentoScreen
