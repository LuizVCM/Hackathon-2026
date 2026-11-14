import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ConfirmacaoVaga = ({
  titulo = 'Tudo certo, avisamos a unidade',
  mensagem = 'Obrigada por avisar. Sua vaga vai ajudar outra pessoa da fila. Você continua na fila para uma nova data.',
  textoAcao = 'Desfazer, eu vou',
  onDesfazer,
}) => {
  return (
    <View
      style={styles.container}
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
    >
      <Text style={styles.titulo} accessibilityRole="header">
        {titulo}
      </Text>

      <Text style={styles.mensagem}>{mensagem}</Text>

      {onDesfazer && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={textoAcao}
          onPress={onDesfazer}
          style={({ pressed }) => [styles.acao, pressed && styles.acaoPressionada]}
        >
          <Text style={styles.acaoTexto}>{textoAcao}</Text>
        </Pressable>
      )}
    </View>
  )
}

export default ConfirmacaoVaga

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#75BFA5',
    borderRadius: 24,
    padding: 24,
    gap: 16,
  },
  titulo: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
    color: '#34423D',
  },
  mensagem: {
    fontFamily: 'Lato-Regular', 
    fontSize: 17,
    lineHeight: 26,
    color: '#34423D',
  },
  acao: {
    minHeight: 52,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#34423D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  acaoPressionada: {
    backgroundColor: '#F4F1F8',
  },
  acaoTexto: {
    fontFamily: 'Lato-Bold', 
    fontSize: 17,
    fontWeight: '700',
    color: '#34423D',
  },
})