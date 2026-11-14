import { StyleSheet, Text, View } from 'react-native'
import Svg, { Circle, Path, Rect } from 'react-native-svg'
import { cores, fontes } from '../theme/tema'

type Props = { tamanho?: number }

// Marca provisória em SVG. Para usar o logo oficial do Figma, exporte-o em PNG/SVG
// e troque o conteúdo deste componente por <Image source={require('../assets/logo.png')} />.
const Logo = ({ tamanho = 56 }: Props) => (
  <View style={styles.linha} accessible accessibilityRole="image" accessibilityLabel="Consulta+">
    <Svg width={tamanho} height={tamanho} viewBox="0 0 56 56">
      <Rect x="30" y="8" width="16" height="44" rx="6" fill={cores.verdeClaro} />
      <Rect x="20" y="22" width="36" height="16" rx="6" fill={cores.verdeClaro} />
      <Circle cx="18" cy="14" r="6" fill={cores.roxo} />
      <Path d="M6 48 C8 32 22 26 34 34 C24 34 18 40 16 52 Z" fill={cores.roxo} />
    </Svg>
    <Text style={[styles.texto, { fontSize: tamanho * 0.55 }]}>
      consulta<Text style={styles.mais}>+</Text>
    </Text>
  </View>
)

export default Logo

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  texto: { fontFamily: fontes.tituloForte, color: cores.roxo },
  mais: { color: cores.verdeClaro },
})
