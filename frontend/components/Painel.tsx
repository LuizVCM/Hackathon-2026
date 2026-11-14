import { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { cores, fontes, sombra } from '../theme/tema'

type Props = { titulo?: string; subtitulo?: string; children?: ReactNode }

/** Cartão branco com título opcional. */
const Painel = ({ titulo, subtitulo, children }: Props) => (
  <View style={styles.painel}>
    {titulo ? <Text style={styles.titulo} accessibilityRole="header">{titulo}</Text> : null}
    {subtitulo ? <Text style={styles.subtitulo}>{subtitulo}</Text> : null}
    {children}
  </View>
)

export default Painel

const styles = StyleSheet.create({
  painel: { backgroundColor: cores.branco, borderRadius: 24, padding: 20, gap: 10, ...sombra },
  titulo: { fontFamily: fontes.titulo, fontSize: 18, lineHeight: 24, color: cores.texto },
  subtitulo: { fontFamily: fontes.regular, fontSize: 15, lineHeight: 22, color: cores.texto },
})
