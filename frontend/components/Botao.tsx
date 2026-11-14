import { Pressable, StyleSheet, Text } from 'react-native'
import { cores, fontes } from '../theme/tema'

type Variante = 'verde' | 'roxo' | 'roxoEscuro' | 'contornoRoxo' | 'contornoVermelho'
type Props = { rotulo: string; onPress?: () => void; variante?: Variante }

const Botao = ({ rotulo, onPress, variante = 'roxo' }: Props) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={rotulo}
    onPress={onPress}
    style={({ pressed }) => [styles.base, estilos[variante].caixa, pressed && styles.pressionado]}
  >
    <Text style={[styles.texto, estilos[variante].texto]}>{rotulo}</Text>
  </Pressable>
)

export default Botao

const styles = StyleSheet.create({
  base: {
    minHeight: 52, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 999,
    borderWidth: 2, alignItems: 'center', justifyContent: 'center',
  },
  texto: { fontFamily: fontes.bold, fontSize: 16 },
  pressionado: { opacity: 0.8 },
})

const estilos = {
  verde: {
    caixa: { backgroundColor: cores.verde, borderColor: cores.verde },
    texto: { color: cores.branco },
  },
  roxo: {
    caixa: { backgroundColor: cores.roxo, borderColor: cores.roxo },
    texto: { color: cores.branco },
  },
  roxoEscuro: {
    caixa: { backgroundColor: cores.roxoEscuro, borderColor: cores.roxoEscuro },
    texto: { color: cores.branco },
  },
  contornoRoxo: {
    caixa: { backgroundColor: cores.branco, borderColor: cores.roxo },
    texto: { color: cores.roxo },
  },
  contornoVermelho: {
    caixa: { backgroundColor: cores.branco, borderColor: cores.vermelho },
    texto: { color: cores.vermelho },
  },
}
