import { Pressable, StyleSheet, Text } from 'react-native'
import { cores, fontes } from '../theme/tema'

type Props = {
  rotulo: string
  selecionado: boolean
  onPress: () => void
  variante?: 'contorno' | 'verde'
  /** ocupa só o espaço do texto (por padrão, a linha toda) */
  compacta?: boolean
}

/** Botão-pílula de alternância (disponibilidade, canais, "Ativo"). */
const PilulaOpcao = ({ rotulo, selecionado, onPress, variante = 'contorno', compacta }: Props) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={rotulo}
    accessibilityState={{ selected: selecionado }}
    onPress={onPress}
    style={[
      styles.base,
      compacta ? styles.compacta : styles.total,
      selecionado && (variante === 'verde' ? styles.verde : styles.selecionada),
    ]}
  >
    <Text
      style={[
        styles.texto,
        selecionado && (variante === 'verde' ? styles.textoVerde : styles.textoSelecionado),
      ]}
    >
      {rotulo}
    </Text>
  </Pressable>
)

export default PilulaOpcao

const styles = StyleSheet.create({
  base: {
    minHeight: 48, borderRadius: 999, borderWidth: 2, borderColor: cores.lilas,
    backgroundColor: cores.branco, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16,
  },
  total: { alignSelf: 'stretch' },
  compacta: { flexGrow: 1 },
  selecionada: { borderColor: cores.roxo, backgroundColor: cores.roxoSelecionado },
  verde: { borderColor: cores.verde, backgroundColor: cores.verde },
  texto: { fontFamily: fontes.regular, fontSize: 15, color: cores.texto },
  textoSelecionado: { fontFamily: fontes.bold, color: cores.roxo },
  textoVerde: { fontFamily: fontes.bold, color: cores.branco },
})
