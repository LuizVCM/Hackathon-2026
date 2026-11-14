import { StyleSheet, Text, View } from 'react-native'
import BotaoRedondo from '../../../components/BotaoRedondo'
import Painel from '../../../components/Painel'
import { cores, fontes } from '../../../theme/tema'

type Props = { km: number; onMudar: (km: number) => void; min?: number; max?: number }

const SeletorDistancia = ({ km, onMudar, min = 1, max = 50 }: Props) => (
  <Painel titulo="Até quantos km você pode ir?">
    <View style={styles.linha}>
      <BotaoRedondo simbolo="−" rotulo="Diminuir distância" desabilitado={km <= min}
        onPress={() => onMudar(Math.max(min, km - 1))} />
      <Text style={styles.valor} accessibilityLiveRegion="polite">{km} km</Text>
      <BotaoRedondo simbolo="+" rotulo="Aumentar distância" desabilitado={km >= max}
        onPress={() => onMudar(Math.min(max, km + 1))} />
    </View>
  </Painel>
)

export default SeletorDistancia

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  valor: { fontFamily: fontes.bold, fontSize: 20, color: cores.texto },
})
