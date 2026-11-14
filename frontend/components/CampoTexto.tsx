import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import { cores, fontes } from '../theme/tema'

type Props = TextInputProps & { rotulo: string; erro?: string }

const CampoTexto = ({ rotulo, erro, style, ...resto }: Props) => (
  <View style={styles.grupo}>
    <Text style={styles.rotulo}>{rotulo}</Text>
    <TextInput
      accessibilityLabel={rotulo}
      placeholderTextColor="#6F7A76"
      style={[styles.campo, !!erro && styles.campoErro, style]}
      {...resto}
    />
    {erro ? <Text style={styles.erro} accessibilityLiveRegion="polite">{erro}</Text> : null}
  </View>
)

export default CampoTexto

const styles = StyleSheet.create({
  grupo: { gap: 6 },
  rotulo: { fontFamily: fontes.bold, fontSize: 14, color: cores.texto },
  campo: {
    minHeight: 52, borderRadius: 14, borderWidth: 1.5, borderColor: cores.lilas,
    backgroundColor: cores.roxoClaro, paddingHorizontal: 16,
    fontFamily: fontes.regular, fontSize: 16, color: cores.texto,
  },
  campoErro: { borderColor: cores.vermelho },
  erro: { fontFamily: fontes.regular, fontSize: 13, color: cores.vermelho },
})
