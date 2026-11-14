import { Linking } from 'react-native'
import Botao from '../../components/Botao'
import Painel from '../../components/Painel'
import Tela from '../../components/Tela'
import { UBS } from '../../data/mock'
import { PropsTela } from '../../navigation/tipos'

// Esta tela não existe no Figma (só a aba do menu): layout provisório no mesmo padrão visual.
const AjudaScreen = ({ ir }: PropsTela) => (
  <Tela titulo="Ajuda" subtitulo={`Fale com a ${UBS}`}>
    <Painel titulo="Precisa de transporte ou de ajuda?"
      subtitulo="Ligue para o Disque Saúde (136) ou fale com a recepção da unidade.">
      <Botao variante="verde" rotulo="Ligar para o Disque Saúde" onPress={() => Linking.openURL('tel:136')} />
    </Painel>
    <Painel titulo="Modo demonstração" subtitulo="Veja como a unidade libera uma vaga e envia a oferta.">
      <Botao variante="contornoRoxo" rotulo="Abrir demonstração da unidade" onPress={() => ir('vagaLiberada')} />
    </Painel>
  </Tela>
)

export default AjudaScreen
