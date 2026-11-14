import { View } from 'react-native'
import Botao from '../../../components/Botao'

type Props = { onAceitar: () => void; onTransporte: () => void; onRecusar: () => void }

const AcoesOferta = ({ onAceitar, onTransporte, onRecusar }: Props) => (
  <View style={{ gap: 16 }}>
    <Botao variante="roxoEscuro" rotulo="Quero a vaga" onPress={onAceitar} />
    <Botao variante="contornoRoxo" rotulo="Preciso de transporte" onPress={onTransporte} />
    <Botao variante="contornoVermelho" rotulo="Não posso" onPress={onRecusar} />
  </View>
)

export default AcoesOferta
