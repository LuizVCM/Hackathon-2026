import { StyleSheet, Text, View } from 'react-native'
import BotaoRedondo from '../../../components/BotaoRedondo'
import PilulaOpcao from '../../../components/PilulaOpcao'
import { cores, fontes } from '../../../theme/tema'

type Props = {
  hora: number
  ativo: boolean
  min?: number
  max?: number
  onAlternar: () => void
  onMudarHora: (hora: number) => void
}

const LinhaHorario = ({ hora, ativo, min = 5, max = 22, onAlternar, onMudarHora }: Props) => (
  <View style={styles.linha}>
    <View style={{ width: 96 }}>
      <PilulaOpcao rotulo={ativo ? 'Ativo' : 'Pausado'} selecionado={ativo} onPress={onAlternar} />
    </View>
    <BotaoRedondo simbolo="−" rotulo="Horário mais cedo" desabilitado={hora <= min}
      onPress={() => onMudarHora(hora - 1)} />
    <Text style={[styles.hora, !ativo && styles.horaInativa]}>{hora}h</Text>
    <BotaoRedondo simbolo="+" rotulo="Horário mais tarde" desabilitado={hora >= max}
      onPress={() => onMudarHora(hora + 1)} />
  </View>
)

export default LinhaHorario

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  hora: { fontFamily: fontes.bold, fontSize: 18, color: cores.texto, minWidth: 40, textAlign: 'center' },
  horaInativa: { opacity: 0.45 },
})
