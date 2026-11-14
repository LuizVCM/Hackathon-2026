import { Redirect, router } from 'expo-router'
import { useSaude } from '../context/SaudeContext'
import { NomeTela, PropsTela } from './tipos'
import { ComponentType } from 'react'

export default function TelaRota({ componente: Componente }: { componente: ComponentType<PropsTela> }) {
  const { paciente } = useSaude()
  if (!paciente) return <Redirect href="/" />
  const caminho = (t: NomeTela) => t === 'login' ? '/' : `/${t}`
  return <Componente paciente={paciente.codigoPaciente}
    ir={t => router.push(caminho(t) as never)} raiz={t => router.replace(caminho(t) as never)} />
}
