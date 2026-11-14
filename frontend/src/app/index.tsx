import { Redirect, router } from 'expo-router'
import LoginScreen from '../../screens/Login/LoginScreen'
import { useSaude } from '../../context/SaudeContext'
export default function Login() {
  const { paciente } = useSaude()
  if (paciente) return <Redirect href="/inicio" />
  return <LoginScreen onEntrar={() => router.replace('/inicio')} onCriarConta={() => router.push('/cadastro')} />
}
