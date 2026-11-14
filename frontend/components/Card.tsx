import { Pressable, StyleSheet, Text, View } from 'react-native'
import { cores, fontes } from '../theme/tema'

type Props = {
  titulo?: string
  mensagem?: string
  textoAcao?: string
  onDesfazer?: () => void
}

const ConfirmacaoVaga = ({
  titulo = 'Tudo certo, avisamos a unidade',
  mensagem = 'Obrigada por avisar. Sua vaga vai ajudar outra pessoa da fila. Você continua na fila para uma nova data.',
  textoAcao = 'Desfazer, eu vou',
  onDesfazer,
}: Props) => {
  return (
    <View style={styles.container} accessibilityLiveRegion="polite" accessibilityRole="alert">
      <Text style={styles.titulo} accessibilityRole="header">{titulo}</Text>
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
  container: { backgroundColor: cores.verdeClaro, borderRadius: 24, padding: 24, gap: 16 },
  titulo: { fontFamily: fontes.tituloForte, fontSize: 24, lineHeight: 30, color: cores.texto },
  mensagem: { fontFamily: fontes.regular, fontSize: 17, lineHeight: 26, color: cores.texto },
  acao: {
    minHeight: 52, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 999,
    borderWidth: 2, borderColor: cores.texto, justifyContent: 'center', alignItems: 'center',
  },
  acaoPressionada: { backgroundColor: cores.roxoClaro },
  acaoTexto: { fontFamily: fontes.bold, fontSize: 17, color: cores.texto },
})
