import { Pressable, StyleSheet, Text } from 'react-native'
import { cores, fontes } from '../theme/tema'

type Props = { simbolo: '−' | '+'; rotulo: string; onPress: () => void; desabilitado?: boolean }

const BotaoRedondo = ({ simbolo, rotulo, onPress, desabilitado }: Props) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={rotulo}
    accessibilityState={{ disabled: !!desabilitado }}
    disabled={desabilitado}
    onPress={onPress}
    style={({ pressed }) => [styles.botao, desabilitado && styles.off, pressed && styles.on]}
  >
    <Text style={styles.simbolo}>{simbolo}</Text>
  </Pressable>
)

export default BotaoRedondo

const styles = StyleSheet.create({
  botao: {
    width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: cores.roxo,
    backgroundColor: cores.branco, alignItems: 'center', justifyContent: 'center',
  },
  simbolo: { fontFamily: fontes.bold, fontSize: 22, color: cores.roxo },
  off: { opacity: 0.4 },
  on: { backgroundColor: cores.roxoClaro },
})
