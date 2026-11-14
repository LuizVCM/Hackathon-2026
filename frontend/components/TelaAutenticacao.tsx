import { ReactNode } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'
import Logo from './Logo'
import { cores } from '../theme/tema'

/** Base de Login e Cadastro: fundo lilás com círculos, logo e formulário. */
const TelaAutenticacao = ({ children }: { children: ReactNode }) => (
  <KeyboardAvoidingView
    style={styles.tela}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    <View style={styles.circuloGrande} />
    <View style={styles.circuloPequeno} />
    <ScrollView
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.logo}><Logo tamanho={64} /></View>
      <View style={styles.form}>{children}</View>
    </ScrollView>
  </KeyboardAvoidingView>
)

export default TelaAutenticacao

const styles = StyleSheet.create({
  tela: { flex: 1, alignSelf: 'stretch', backgroundColor: cores.roxoClaro, overflow: 'hidden' },
  circuloGrande: {
    position: 'absolute', top: -70, right: -60, width: 220, height: 220,
    borderRadius: 110, backgroundColor: 'rgba(104,69,165,0.08)',
  },
  circuloPequeno: {
    position: 'absolute', top: 70, right: -50, width: 120, height: 120,
    borderRadius: 60, backgroundColor: 'rgba(104,69,165,0.08)',
  },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 28, paddingVertical: 48, gap: 36 },
  logo: { alignItems: 'center' },
  form: { gap: 16 },
})
