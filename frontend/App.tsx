import { useFonts } from 'expo-font'
import {
  Lato_400Regular,
  Lato_700Bold,
} from '@expo-google-fonts/lato'
import {
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect, useState } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'
import MenuInferior from './components/MenuInferior'
import { ABA_DA_TELA, Aba, NomeTela, PropsTela, TELA_DA_ABA } from './navigation/tipos'
import { PACIENTE_PADRAO } from './data/mock'
import AguardandoScreen from './screens/Aguardando/AguardandoScreen'
import AjudaScreen from './screens/Ajuda/AjudaScreen'
import CadastroScreen from './screens/Cadastro/CadastroScreen'
import CancelamentoScreen from './screens/Cancelamento/CancelamentoScreen'
import ConfirmacaoScreen from './screens/Confirmacao/ConfirmacaoScreen'
import EntrarNaFilaScreen from './screens/EntrarNaFila/EntrarNaFilaScreen'
import InicioScreen from './screens/Inicio/InicioScreen'
import LembretesScreen from './screens/Lembretes/LembretesScreen'
import LoginScreen from './screens/Login/LoginScreen'
import LugarMantidoScreen from './screens/LugarMantido/LugarMantidoScreen'
import MinhasFilasScreen from './screens/MinhasFilas/MinhasFilasScreen'
import OfertaScreen from './screens/Oferta/OfertaScreen'
import OfertaPassouScreen from './screens/OfertaPassou/OfertaPassouScreen'
import VagaLiberadaScreen from './screens/VagaLiberada/VagaLiberadaScreen'
import { cores } from './theme/tema'

export default function App() {
  const [fontesProntas, erroFontes] = useFonts({
    'Lato-Regular': Lato_400Regular,
    'Lato-Bold': Lato_700Bold,
    'PlusJakartaSans-Bold': PlusJakartaSans_700Bold,
    'PlusJakartaSans-ExtraBold': PlusJakartaSans_800ExtraBold,
  })
  const [pilha, setPilha] = useState<NomeTela[]>(['login'])
  const [paciente, setPaciente] = useState(PACIENTE_PADRAO)
  const tela = pilha[pilha.length - 1]

  const ir = useCallback((t: NomeTela) => setPilha((p) => [...p, t]), [])
  const raiz = useCallback((t: NomeTela) => setPilha([t]), [])

  // Botão voltar do Android desempilha as telas
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (pilha.length > 1) {
        setPilha((p) => p.slice(0, -1))
        return true
      }
      return false
    })
    return () => sub.remove()
  }, [pilha.length])

  if (!fontesProntas && !erroFontes) return null

  const props: PropsTela = { paciente, ir, raiz }
  const aba = ABA_DA_TELA[tela]
  const mudarAba = (a: Aba) => raiz(TELA_DA_ABA[a])

  const renderizar = () => {
    switch (tela) {
      case 'login':
        return <LoginScreen onEntrar={() => raiz('inicio')} onCriarConta={() => raiz('cadastro')} />
      case 'cadastro':
        return (
          <CadastroScreen
            onCadastrar={(codigo) => { setPaciente(codigo); raiz('inicio') }}
            onEntrar={() => raiz('login')}
          />
        )
      case 'inicio': return <InicioScreen {...props} />
      case 'entrarFila': return <EntrarNaFilaScreen {...props} />
      case 'minhasFilas': return <MinhasFilasScreen {...props} />
      case 'cancelamento': return <CancelamentoScreen {...props} />
      case 'vagaLiberada': return <VagaLiberadaScreen {...props} />
      case 'oferta': return <OfertaScreen {...props} />
      case 'confirmacao': return <ConfirmacaoScreen {...props} />
      case 'lembretes': return <LembretesScreen />
      case 'aguardando': return <AguardandoScreen {...props} />
      case 'ofertaPassou': return <OfertaPassouScreen {...props} />
      case 'lugarMantido': return <LugarMantidoScreen {...props} />
      case 'ajuda': return <AjudaScreen {...props} />
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style={aba ? 'light' : 'dark'} />
      {renderizar()}
      {aba ? <MenuInferior ativa={aba} onMudar={mudarAba} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.roxoClaro },
})
