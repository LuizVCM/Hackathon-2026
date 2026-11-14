import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet, Text, View } from 'react-native'
import { cores, fontes } from '../theme/tema'

type Props = { titulo: string; subtitulo?: string; alto?: boolean }

/** Cabeçalho roxo das telas internas, com a marca "consulta+" e círculos decorativos. */
const Head = ({ titulo, subtitulo, alto = false }: Props) => {
  const insets = useSafeAreaInsets()
  return (
  <LinearGradient colors={['#563788', '#6845A5']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.cabecalho, { paddingTop: Math.max(insets.top + 20, 56) }, alto && styles.alto]}>
    <View style={styles.circuloGrande} />
    <View style={styles.circuloPequeno} />
    <Text style={styles.marca}>consulta+</Text>
    <Text style={styles.titulo} accessibilityRole="header">{titulo}</Text>
    {subtitulo ? <Text style={styles.subtitulo}>{subtitulo}</Text> : null}
  </LinearGradient>
)
}

export default Head

const styles = StyleSheet.create({
  cabecalho: {
    backgroundColor: cores.roxo,
    paddingTop: 56,
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    gap: 8,
  },
  alto: { paddingBottom: 64 },
  circuloGrande: {
    position: 'absolute', top: -60, right: -50, width: 190, height: 190,
    borderRadius: 95, backgroundColor: 'rgba(255,255,255,0.09)',
  },
  circuloPequeno: {
    position: 'absolute', bottom: -40, right: -30, width: 120, height: 120,
    borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.09)',
  },
  marca: { fontFamily: fontes.titulo, fontSize: 20, color: cores.branco },
  titulo: { fontFamily: fontes.tituloForte, fontSize: 28, lineHeight: 36, color: cores.branco },
  subtitulo: { fontFamily: fontes.regular, fontSize: 14, lineHeight: 20, marginTop: 28, color: cores.branco },
})
