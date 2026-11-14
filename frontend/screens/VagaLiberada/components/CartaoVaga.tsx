import Painel from '../../../components/Painel'

type Props = { codigo: string; hora: string; data: string; ubs: string }

const CartaoVaga = ({ codigo, hora, data, ubs }: Props) => (
  <Painel titulo={`Vaga ${codigo} · ${hora}`} subtitulo={`${data} · ${ubs}\nSimular liberação por falta`} />
)

export default CartaoVaga
