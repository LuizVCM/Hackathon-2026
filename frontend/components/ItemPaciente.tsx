import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { cores, fontes, sombra } from '../theme/tema'

type Props = { titulo: string; subtitulo: string; direita?: string; destaque?: boolean }

/** Linha de paciente na fila: avatar, textos e posição/tempo de espera à direita. */
const ItemPaciente = ({ titulo, subtitulo, direita, destaque = false }: Props) => (
  <View style={[styles.linha, destaque && styles.destaque]}>
    <View style={[styles.avatar, destaque && styles.avatarDestaque]}>
      <Ionicons name="person-outline" size={22} color={destaque ? cores.branco : cores.roxo} />
    </View>
    <View style={styles.textos}>
      <Text style={[styles.titulo, destaque && styles.textoClaro]}>{titulo}</Text>
      <Text style={[styles.subtitulo, destaque && styles.textoClaro]}>{subtitulo}</Text>
    </View>
    {direita ? <Text style={[styles.direita, destaque && styles.textoClaro]}>{direita}</Text> : null}
  </View>
)

export default ItemPaciente

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14,
    backgroundColor: cores.branco, borderRadius: 20, ...sombra,
  },
  destaque: { backgroundColor: cores.verde },
  avatar: {
    width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center',
    backgroundColor: cores.roxoClaro,
  },
  avatarDestaque: { backgroundColor: 'rgba(255,255,255,0.25)' },
  textos: { flex: 1, gap: 2 },
  titulo: { fontFamily: fontes.bold, fontSize: 15, color: cores.texto },
  subtitulo: { fontFamily: fontes.regular, fontSize: 13, color: cores.textoSuave },
  direita: { fontFamily: fontes.tituloForte, fontSize: 18, color: cores.roxo },
  textoClaro: { color: cores.branco },
})
