import { View } from 'react-native'
import Botao from '../../../components/Botao'
import ConfirmacaoVaga from '../../../components/Card'

type Props = {
  confirmada: boolean
  dataHora: string
  onConfirmar: () => void
  onDesfazer: () => void
  onRemarcar: () => void
  onNaoVou: () => void
}

const AcoesConsulta = ({ confirmada, dataHora, onConfirmar, onDesfazer, onRemarcar, onNaoVou }: Props) => (
  <View style={{ gap: 16 }}>
    {confirmada ? (
      <ConfirmacaoVaga
        titulo="Presença confirmada"
        mensagem={`Avisamos a unidade. Esperamos você em ${dataHora}.`}
        textoAcao="Desfazer"
        onDesfazer={onDesfazer}
      />
    ) : (
      <Botao variante="verde" rotulo="Confirmar presença" onPress={onConfirmar} />
    )}
    <Botao variante="contornoRoxo" rotulo="Preciso remarcar" onPress={onRemarcar} />
    <Botao variante="contornoVermelho" rotulo="Não vou poder ir" onPress={onNaoVou} />
  </View>
)

export default AcoesConsulta
