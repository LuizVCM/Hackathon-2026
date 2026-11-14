import { Slot, usePathname, router } from 'expo-router'
import { useFonts } from 'expo-font'
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato'
import { PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { SaudeProvider, useSaude } from '../../context/SaudeContext'
import { ABA_DA_TELA, NomeTela, TELA_DA_ABA } from '../../navigation/tipos'
import MenuInferior from '../../components/MenuInferior'
import { cores } from '../../theme/tema'

function Conteudo() {
  const { pronto, paciente } = useSaude()
  const insets = useSafeAreaInsets()
  const path = usePathname().slice(1) as NomeTela
  const aba = paciente ? ABA_DA_TELA[path] : undefined
  if (!pronto) return <View style={styles.carregando}><ActivityIndicator color={cores.roxo} /></View>
  return <View style={styles.fundo}><View style={styles.app}>
    <StatusBar style={aba ? 'light' : 'dark'} />
    <Slot />
    {aba ? <View style={{ paddingBottom: insets.bottom }}><MenuInferior ativa={aba} onMudar={a => router.replace(`/${TELA_DA_ABA[a]}` as never)} /></View> : null}
  </View></View>
}
export default function Layout() {
  const [prontas, erro] = useFonts({ 'Lato-Regular': Lato_400Regular, 'Lato-Bold': Lato_700Bold,
    'PlusJakartaSans-Bold': PlusJakartaSans_700Bold, 'PlusJakartaSans-ExtraBold': PlusJakartaSans_800ExtraBold })
  if (!prontas && !erro) return <View style={styles.carregando}><ActivityIndicator color={cores.roxo} /></View>
  return <SafeAreaProvider><SaudeProvider><Conteudo /></SaudeProvider></SafeAreaProvider>
}
const styles = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: '#E7E1EF', alignItems: 'center' },
  app: { flex: 1, width: '100%', maxWidth: 520, backgroundColor: cores.roxoClaro },
  carregando: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: cores.roxoClaro },
})
