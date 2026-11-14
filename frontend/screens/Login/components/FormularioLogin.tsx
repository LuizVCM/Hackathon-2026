import { useSaude } from '../../../context/SaudeContext'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Botao from '../../../components/Botao'
import CampoTexto from '../../../components/CampoTexto'
import { cores, fontes } from '../../../theme/tema'
import { cpfCompleto, formatarCpf } from '../../../utils/mascaras'

type Props = { onEntrar: () => void; onCriarConta: () => void }

const FormularioLogin = ({ onEntrar, onCriarConta }: Props) => {
  const { entrar } = useSaude()
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [erroCpf, setErroCpf] = useState('')
  const [erroSenha, setErroSenha] = useState('')

  const enviar = async () => {
    const cpfOk = cpfCompleto(cpf)
    setErroCpf(cpfOk ? '' : 'Digite os 11 números do CPF.')
    setErroSenha(senha ? '' : 'Digite sua senha.')
    if (!cpfOk || !senha || carregando) return
    setCarregando(true); setErro('')
    try { await entrar(cpf, senha); onEntrar() }
    catch (e) { setErro(e instanceof Error ? e.message : 'Falha ao entrar.') }
    finally { setCarregando(false) }
  }

  return (
    <View style={styles.form}>
      <CampoTexto
        rotulo="CPF" placeholder="000.000.000-00" keyboardType="number-pad"
        value={cpf} onChangeText={(t) => setCpf(formatarCpf(t))} erro={erroCpf}
      />
      <CampoTexto
        rotulo="Senha" placeholder="Digite sua senha" secureTextEntry
        value={senha} onChangeText={setSenha} erro={erroSenha}
      />
      {erro ? <Text accessibilityRole="alert" style={{ color: cores.vermelho }}>{erro}</Text> : null}
      <Botao variante="verde" rotulo="Entrar" carregando={carregando} onPress={enviar} />
      <Text style={styles.pergunta}>Ainda não tem uma conta?</Text>
      <Botao variante="roxo" rotulo="Criar uma conta" onPress={onCriarConta} />
    </View>
  )
}

export default FormularioLogin

const styles = StyleSheet.create({
  form: { gap: 16 },
  pergunta: { fontFamily: fontes.regular, fontSize: 15, color: cores.texto, textAlign: 'center', marginTop: 16 },
})
