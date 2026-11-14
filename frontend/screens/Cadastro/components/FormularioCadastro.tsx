import { useSaude } from '../../../context/SaudeContext'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Botao from '../../../components/Botao'
import CampoTexto from '../../../components/CampoTexto'
import { cores, fontes } from '../../../theme/tema'
import { celularCompleto, cpfCompleto, formatarCelular, formatarCpf } from '../../../utils/mascaras'

type Props = { onCadastrar: (codigo: string) => void; onEntrar: () => void }

const FormularioCadastro = ({ onCadastrar, onEntrar }: Props) => {
  const { cadastrar: criarConta } = useSaude()
  const [nome, setNome] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [cpf, setCpf] = useState('')
  const [celular, setCelular] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState<Record<string, string>>({})

  const cadastrar = async () => {
    const novos: Record<string, string> = {}
    if (nome.trim().length < 2) novos.nome = 'Informe seu nome completo.'
    if (!cpfCompleto(cpf)) novos.cpf = 'Digite os 11 números do CPF.'
    if (!celularCompleto(celular)) novos.celular = 'Digite o DDD e o número com 9 dígitos.'
    if (senha.length < 6) novos.senha = 'Use pelo menos 6 caracteres.'
    setErros(novos)
    if (Object.keys(novos).length || carregando) return
    setCarregando(true); setErro('')
    try { await criarConta({ nome, cpf, telefone: celular, senha }); onCadastrar('') }
    catch (e) { setErro(e instanceof Error ? e.message : 'Falha ao cadastrar.') }
    finally { setCarregando(false) }
  }

  return (
    <View style={styles.form}>
      <CampoTexto rotulo="Nome completo" placeholder="Como você se chama?" autoCapitalize="words"
        value={nome} onChangeText={setNome} erro={erros.nome} />
      <CampoTexto rotulo="CPF" placeholder="000.000.000-00" keyboardType="number-pad"
        value={cpf} onChangeText={(t) => setCpf(formatarCpf(t))} erro={erros.cpf} />
      <CampoTexto rotulo="Celular com WhatsApp" placeholder="(00) 00000-0000" keyboardType="phone-pad"
        value={celular} onChangeText={(t) => setCelular(formatarCelular(t))} erro={erros.celular} />
      <CampoTexto rotulo="Senha" placeholder="Crie sua senha" secureTextEntry
        value={senha} onChangeText={setSenha} erro={erros.senha} />
      {erro ? <Text accessibilityRole="alert" style={{ color: cores.vermelho }}>{erro}</Text> : null}
      <Botao variante="verde" carregando={carregando} rotulo="Cadastrar" onPress={cadastrar} />
      <Text style={styles.pergunta}>Já tem uma conta?</Text>
      <Botao variante="roxo" rotulo="Entrar" onPress={onEntrar} />
    </View>
  )
}

export default FormularioCadastro

const styles = StyleSheet.create({
  form: { gap: 14 },
  pergunta: { fontFamily: fontes.regular, fontSize: 15, color: cores.texto, textAlign: 'center', marginTop: 8 },
})
