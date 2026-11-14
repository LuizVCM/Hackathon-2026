import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Botao from '../../../components/Botao'
import CampoTexto from '../../../components/CampoTexto'
import { cores, fontes } from '../../../theme/tema'
import { celularCompleto, cpfCompleto, formatarCelular, formatarCpf } from '../../../utils/mascaras'

type Props = { onCadastrar: (codigo: string) => void; onEntrar: () => void }

const FormularioCadastro = ({ onCadastrar, onEntrar }: Props) => {
  const [codigo, setCodigo] = useState('')
  const [cpf, setCpf] = useState('')
  const [celular, setCelular] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState<Record<string, string>>({})

  const cadastrar = () => {
    const novos: Record<string, string> = {}
    if (!codigo.trim()) novos.codigo = 'Informe o código que a unidade te deu.'
    if (!cpfCompleto(cpf)) novos.cpf = 'Digite os 11 números do CPF.'
    if (!celularCompleto(celular)) novos.celular = 'Digite o DDD e o número com 9 dígitos.'
    if (senha.length < 6) novos.senha = 'Use pelo menos 6 caracteres.'
    setErros(novos)
    if (Object.keys(novos).length === 0) onCadastrar(codigo.trim().toUpperCase())
  }

  return (
    <View style={styles.form}>
      <CampoTexto rotulo="Código do paciente" placeholder="P-1042" autoCapitalize="characters"
        value={codigo} onChangeText={setCodigo} erro={erros.codigo} />
      <CampoTexto rotulo="CPF" placeholder="000.000.000-00" keyboardType="number-pad"
        value={cpf} onChangeText={(t) => setCpf(formatarCpf(t))} erro={erros.cpf} />
      <CampoTexto rotulo="Celular com WhatsApp" placeholder="(00) 00000-0000" keyboardType="phone-pad"
        value={celular} onChangeText={(t) => setCelular(formatarCelular(t))} erro={erros.celular} />
      <CampoTexto rotulo="Senha" placeholder="Crie sua senha" secureTextEntry
        value={senha} onChangeText={setSenha} erro={erros.senha} />
      <Botao variante="verde" rotulo="Cadastrar" onPress={cadastrar} />
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
