import { ReactNode } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Head from './Head'
import { cores } from '../theme/tema'

type Props = {
  titulo: string
  subtitulo?: string
  /** o primeiro cartão invade o cabeçalho (tela de cancelamento) */
  sobrepor?: boolean
  children: ReactNode
}

const Tela = ({ titulo, subtitulo, sobrepor = false, children }: Props) => (
  <ScrollView
    style={styles.tela}
    contentContainerStyle={styles.scroll}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
    <Head titulo={titulo} subtitulo={subtitulo} alto={sobrepor} />
    <View style={[styles.conteudo, sobrepor && styles.sobrepor]}>{children}</View>
  </ScrollView>
)

export default Tela

const styles = StyleSheet.create({
  tela: { flex: 1, alignSelf: 'stretch', backgroundColor: cores.roxoClaro },
  scroll: { paddingBottom: 16 },
  conteudo: { padding: 20, gap: 16 },
  sobrepor: { marginTop: -40 },
})
