import { StyleSheet, Text, View } from 'react-native'
import Botao from '../../../components/Botao'
import { cores, fontes } from '../../../theme/tema'

type Props = { onValidar: () => void; onNaoValidar: () => void }

const DemonstracaoUnidade = ({ onValidar, onNaoValidar }: Props) => (
  <View style={{ gap: 12 }}>
    <Text style={styles.rotulo}>Demonstração da unidade</Text>
    <Botao variante="roxoEscuro" rotulo="Simular validação da UBS" onPress={onValidar} />
    <Botao variante="contornoRoxo" rotulo="Simular não validação" onPress={onNaoValidar} />
  </View>
)

export default DemonstracaoUnidade

const styles = StyleSheet.create({
  rotulo: { fontFamily: fontes.bold, fontSize: 14, color: cores.texto },
})
