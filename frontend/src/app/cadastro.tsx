import { Redirect, router } from 'expo-router'
import CadastroScreen from '../../screens/Cadastro/CadastroScreen'
import { useSaude } from '../../context/SaudeContext'
export default function Cadastro() {
  const { paciente } = useSaude()
  if (paciente) return <Redirect href="/inicio" />
  return <CadastroScreen onCadastrar={() => router.replace('/inicio')} onEntrar={() => router.replace('/')} />
}
