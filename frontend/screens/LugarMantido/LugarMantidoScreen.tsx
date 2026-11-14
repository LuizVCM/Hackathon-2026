import Aviso from '../../components/Aviso'
import Botao from '../../components/Botao'
import Painel from '../../components/Painel'
import Tela from '../../components/Tela'
import { PropsTela } from '../../navigation/tipos'
export default function LugarMantidoScreen({ raiz }: PropsTela) {
  return <Tela titulo="Consulta cancelada" subtitulo="Sua resposta foi registrada.">
    <Aviso variante="sucesso" titulo="A unidade foi informada" texto="O cancelamento foi salvo. Suas participações nas filas permanecem preservadas." />
    <Painel titulo="Acompanhe suas filas" subtitulo="Nenhum novo agendamento foi confirmado. Consulte a situação das filas e aguarde as atualizações da unidade." />
    <Botao rotulo="Acompanhar minha fila" onPress={() => raiz('minhasFilas')} />
    <Botao variante="contornoRoxo" rotulo="Voltar ao início" onPress={() => raiz('inicio')} />
  </Tela>
}
