import { Pressable, StyleSheet, Text, View } from 'react-native'
import { cores, fontes } from '../../../theme/tema'

type Props = { rotulo: string; selecionada: boolean; onPress: () => void }

const OpcaoMotivo = ({ rotulo, selecionada, onPress }: Props) => (
  <Pressable
    accessibilityRole="radio"
    accessibilityLabel={rotulo}
    accessibilityState={{ selected: selecionada, checked: selecionada }}
    onPress={onPress}
    style={styles.opcao}
  >
    <View style={[styles.radio, selecionada && styles.radioAtivo]}>
      {selecionada ? <View style={styles.miolo} /> : null}
    </View>
    <Text style={styles.texto}>{rotulo}</Text>
  </Pressable>
)

export default OpcaoMotivo

const styles = StyleSheet.create({
  opcao: {
    minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: cores.roxoClaro, borderRadius: 14, paddingHorizontal: 16,
  },
  radio: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: cores.roxo,
    alignItems: 'center', justifyContent: 'center',
  },
  radioAtivo: { backgroundColor: cores.branco },
  miolo: { width: 10, height: 10, borderRadius: 5, backgroundColor: cores.roxo },
  texto: { fontFamily: fontes.regular, fontSize: 15, color: cores.texto },
})
