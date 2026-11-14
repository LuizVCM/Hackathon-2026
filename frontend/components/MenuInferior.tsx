import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'

const ROXO = '#6845A5'
const TEXTO = '#34423D'

const ITENS = [
  { chave: 'inicio', rotulo: 'Início', icone: 'home' },
  { chave: 'horarios', rotulo: 'Horários', icone: 'calendar' },
  { chave: 'saude', rotulo: 'Saúde', icone: 'heart' },
  { chave: 'ajuda', rotulo: 'Ajuda', icone: 'call' },
]

const MenuInferior = ({ ativa = 'inicio', onMudar }) => {
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
              name={selecionada ? item.icone : `${item.icone}-outline`}
              size={24}
              color={selecionada ? ROXO : TEXTO}
            />
            <Text style={[styles.rotulo, selecionada && styles.rotuloAtivo]}>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 12,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  item: {
    flex: 1,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingVertical: 6,
    paddingHorizontal: 4,
    gap: 2,
  },
  itemAtivo: {
    backgroundColor: '#F4F1F8',
    borderColor: '#6845A5',
  },
  rotulo: {
    fontFamily: 'Lato-Regular', // precisa estar carregada com expo-font
    fontSize: 14,
    color: '#34423D',
  },
  rotuloAtivo: {
    fontFamily: 'Lato-Bold', // precisa estar carregada com expo-font
    fontWeight: '700',
    color: '#6845A5',
  },
})