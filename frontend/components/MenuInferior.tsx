import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Aba } from '../navigation/tipos'
import { cores, fontes } from '../theme/tema'

type Icone = keyof typeof Ionicons.glyphMap

const ITENS: { chave: Aba; rotulo: string; icone: Icone; iconeAtivo: Icone }[] = [
  { chave: 'inicio', rotulo: 'Início', icone: 'home-outline', iconeAtivo: 'home' },
  { chave: 'filas', rotulo: 'Minhas filas', icone: 'list-outline', iconeAtivo: 'list' },
  { chave: 'lembretes', rotulo: 'Lembretes', icone: 'notifications-outline', iconeAtivo: 'notifications' },
  { chave: 'ajuda', rotulo: 'Ajuda', icone: 'help-circle-outline', iconeAtivo: 'help-circle' },
]

type Props = { ativa?: Aba; onMudar?: (aba: Aba) => void }

const MenuInferior = ({ ativa = 'inicio', onMudar }: Props) => {
  return (
    <View style={styles.barra} accessibilityRole="tablist">
      {ITENS.map((item) => {
        const selecionada = item.chave === ativa

        return (
          <Pressable
            key={item.chave}
            accessibilityRole="tab"
            accessibilityLabel={item.rotulo}
            accessibilityState={{ selected: selecionada }}
            onPress={() => onMudar?.(item.chave)}
            style={[styles.item, selecionada && styles.itemAtivo]}
          >
            <Ionicons
              name={selecionada ? item.iconeAtivo : item.icone}
              size={24}
              color={selecionada ? cores.roxo : cores.texto}
            />
            <Text style={[styles.rotulo, selecionada && styles.rotuloAtivo]} numberOfLines={1}>
              {item.rotulo}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export default MenuInferior

const styles = StyleSheet.create({
  barra: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
    backgroundColor: cores.branco, borderRadius: 24, paddingVertical: 8, paddingHorizontal: 8,
    marginHorizontal: 12, marginBottom: 16, shadowColor: '#000000', shadowOpacity: 0.08,
    shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 8,
  },
  item: {
    flex: 1, minHeight: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 18,
    borderWidth: 2, borderColor: 'transparent', paddingVertical: 6, paddingHorizontal: 4, gap: 2,
  },
  itemAtivo: { backgroundColor: cores.roxoClaro, borderColor: cores.roxo },
  rotulo: { fontFamily: fontes.regular, fontSize: 12, color: cores.texto },
  rotuloAtivo: { fontFamily: fontes.bold, color: cores.roxo },
})
