import { View } from 'react-native'
import Painel from '../../../components/Painel'
import PilulaOpcao from '../../../components/PilulaOpcao'

export type Disponibilidade = { manha: boolean; transporte: boolean; revisadas: boolean }
type Props = { valor: Disponibilidade; onMudar: (v: Disponibilidade) => void }

const ListaDisponibilidade = ({ valor, onMudar }: Props) => (
  <Painel titulo="Sua disponibilidade" subtitulo="Toque para alterar suas preferências.">
    <View style={{ gap: 12, marginTop: 4 }}>
      <PilulaOpcao rotulo={valor.manha ? 'Manhã disponível' : 'Manhã indisponível'}
        selecionado={valor.manha} onPress={() => onMudar({ ...valor, manha: !valor.manha })} />
      <PilulaOpcao rotulo={valor.transporte ? 'Tenho transporte' : 'Preciso de transporte'}
        selecionado={valor.transporte} onPress={() => onMudar({ ...valor, transporte: !valor.transporte })} />
      <PilulaOpcao rotulo={valor.revisadas ? 'Preferências revisadas' : 'Revisar preferências'}
        selecionado={valor.revisadas} onPress={() => onMudar({ ...valor, revisadas: !valor.revisadas })} />
    </View>
  </Painel>
)

export default ListaDisponibilidade
