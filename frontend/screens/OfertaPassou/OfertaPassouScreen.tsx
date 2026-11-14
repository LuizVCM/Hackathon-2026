import Aviso from '../../components/Aviso'
import Botao from '../../components/Botao'
import Tela from '../../components/Tela'
import { PropsTela } from '../../navigation/tipos'
export default function OfertaPassouScreen({ raiz }: PropsTela) {
  return <Tela titulo="Oferta encerrada" subtitulo="Você pode acompanhar novas oportunidades.">
    <Aviso variante="info" titulo="Resposta registrada" texto="Você recusou esta oferta. Sua participação na fila permanece ativa." />
    <Botao rotulo="Ver minha fila" onPress={() => raiz('minhasFilas')} />
    <Botao variante="contornoRoxo" rotulo="Voltar ao início" onPress={() => raiz('inicio')} />
  </Tela>
}
