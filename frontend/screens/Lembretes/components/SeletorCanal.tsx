import { View } from 'react-native'
import Painel from '../../../components/Painel'
import PilulaOpcao from '../../../components/PilulaOpcao'

export type Canal = 'app' | 'whatsapp' | 'ambos'
const CANAIS: { chave: Canal; rotulo: string }[] = [
  { chave: 'app', rotulo: 'App' },
  { chave: 'whatsapp', rotulo: 'WhatsApp' },
  { chave: 'ambos', rotulo: 'Ambos' },
]

type Props = { canal: Canal; onMudar: (c: Canal) => void }

const SeletorCanal = ({ canal, onMudar }: Props) => (
  <Painel titulo="Onde você quer receber?">
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {CANAIS.map((c) => (
        <PilulaOpcao key={c.chave} compacta rotulo={c.rotulo} selecionado={canal === c.chave}
          variante={c.chave === 'ambos' ? 'verde' : 'contorno'} onPress={() => onMudar(c.chave)} />
      ))}
    </View>
  </Painel>
)

export default SeletorCanal
