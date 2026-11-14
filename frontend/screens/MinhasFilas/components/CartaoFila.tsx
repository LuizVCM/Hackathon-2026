import Botao from '../../../components/Botao'
import Painel from '../../../components/Painel'

type Props = { codigo: string; onEntrar: () => void }

const CartaoFila = ({ codigo, onEntrar }: Props) => (
  <Painel titulo={`Fila ${codigo}`} subtitulo="Quer aproveitar uma vaga liberada nesta unidade?">
    <Botao rotulo="Entrar nesta fila" onPress={onEntrar} />
  </Painel>
)

export default CartaoFila
