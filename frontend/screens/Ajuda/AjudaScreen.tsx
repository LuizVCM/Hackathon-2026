import Botao from '../../components/Botao'
import Painel from '../../components/Painel'
import Tela from '../../components/Tela'
import { useSaude } from '../../context/SaudeContext'
export default function AjudaScreen() {
  const { sair, setErro } = useSaude()
  return <Tela titulo="Ajuda" subtitulo="Estamos com você em cada etapa.">
    <Painel titulo="Precisa de transporte ou de ajuda?" subtitulo="Entre em contato com a recepção da sua unidade. Ela poderá orientar sobre o atendimento e o transporte disponível." />
    <Painel titulo="Como funciona a fila?" subtitulo="As ofertas respeitam a ordem de entrada e suas preferências. Aceitar uma oferta inicia a validação pela unidade." />
    <Painel titulo="Seus lembretes" subtitulo="Suas preferências ficam salvas. O envio de notificações e WhatsApp depende da ativação desses serviços pela unidade." />
    <Botao variante="contornoRoxo" rotulo="Sair da conta" onPress={() => void sair().catch(e => setErro(e.message))} />
  </Tela>
}
