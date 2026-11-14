import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { cores, fontes, sombra } from '../theme/tema'

type Props = { rotulo: string; titulo: string; subtitulo: string; data: string; hora: string }

/** Cartão roxo com data e horário (Início, Oferta e Confirmação). */
const CartaoAgendamento = ({ rotulo, titulo, subtitulo, data, hora }: Props) => (
  <View style={styles.cartao}>
    <Text style={styles.rotulo}>{rotulo}</Text>
    <Text style={styles.titulo}>{titulo}</Text>
    <Text style={styles.subtitulo}>{subtitulo}</Text>
    <View style={styles.pilulas}>
      <View style={styles.pilula} accessible accessibilityLabel={`Data ${data}`}>
        <Ionicons name="calendar-outline" size={22} color={cores.roxo} />
        <Text style={styles.pilulaTexto}>{data}</Text>
      </View>
      <View style={styles.pilula} accessible accessibilityLabel={`Horário ${hora}`}>
        <Ionicons name="alarm-outline" size={22} color={cores.roxo} />
        <Text style={styles.pilulaTexto}>{hora}</Text>
      </View>
    </View>
  </View>
)

export default CartaoAgendamento

const styles = StyleSheet.create({
  cartao: { backgroundColor: cores.roxo, borderRadius: 24, padding: 20, gap: 6, ...sombra },
  rotulo: { fontFamily: fontes.bold, fontSize: 12, color: cores.branco },
  titulo: { fontFamily: fontes.tituloForte, fontSize: 22, lineHeight: 28, color: cores.branco },
  subtitulo: { fontFamily: fontes.regular, fontSize: 14, color: cores.branco },
  pilulas: { flexDirection: 'row', gap: 12, marginTop: 10 },
  pilula: {
    flex: 1, minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: cores.branco, borderRadius: 16, paddingHorizontal: 10,
  },
  pilulaTexto: { fontFamily: fontes.bold, fontSize: 14, color: cores.roxo },
})
