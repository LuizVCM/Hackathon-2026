import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { cores, fontes, sombra } from '../theme/tema'

type Variante = 'atencao' | 'sucesso' | 'info'
type Props = { variante: Variante; titulo?: string; texto: string; onPress?: () => void }

const ICONE: Record<Variante, keyof typeof Ionicons.glyphMap> = {
  atencao: 'warning-outline',
  sucesso: 'checkmark-circle-outline',
  info: 'information-circle-outline',
}

const cfg = {
  atencao: { fundo: cores.avisoFundo, borda: cores.avisoBorda, cor: cores.avisoTexto },
  sucesso: { fundo: cores.verde, borda: cores.verde, cor: cores.branco },
  info: { fundo: cores.branco, borda: cores.branco, cor: cores.texto },
}

/** Faixa de aviso: atenção (amarelo), sucesso (verde) ou informação (branco). */
const Aviso = ({ variante, titulo, texto, onPress }: Props) => {
  const { fundo, borda, cor } = cfg[variante]
  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : 'alert'}
      accessibilityLabel={titulo ? `${titulo}. ${texto}` : texto}
      style={[styles.aviso, { backgroundColor: fundo, borderColor: borda }, variante === 'info' && sombra]}
    >
      {titulo ? (
        <View style={styles.linhaTitulo}>
          <Ionicons name={ICONE[variante]} size={22} color={cor} />
          <Text style={[styles.titulo, { color: cor }]}>{titulo}</Text>
        </View>
      ) : null}
      <Text style={[styles.texto, { color: cor }]}>{texto}</Text>
    </Pressable>
  )
}

export default Aviso

const styles = StyleSheet.create({
  aviso: { borderRadius: 20, borderWidth: 1.5, padding: 18, gap: 8 },
  linhaTitulo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  titulo: { fontFamily: fontes.bold, fontSize: 16 },
  texto: { fontFamily: fontes.regular, fontSize: 15, lineHeight: 22 },
})
