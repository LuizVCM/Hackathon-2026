import { useState } from 'react'
import Botao from '../../components/Botao'
import Tela from '../../components/Tela'
import { FILA_NOVA, UBS } from '../../data/mock'
import { PropsTela } from '../../navigation/tipos'
import ListaDisponibilidade, { Disponibilidade } from './components/ListaDisponibilidade'
import SeletorDistancia from './components/SeletorDistancia'

const EntrarNaFilaScreen = ({ ir }: PropsTela) => {
  const [disp, setDisp] = useState<Disponibilidade>({ manha: true, transporte: true, revisadas: true })
  const [km, setKm] = useState(5)

  return (
    <Tela titulo="Entrar na fila" subtitulo={`Fila ${FILA_NOVA.codigo} · ${UBS}`}>
      <ListaDisponibilidade valor={disp} onMudar={setDisp} />
      <SeletorDistancia km={km} onMudar={setKm} />
      <Botao rotulo="Salvar e ver minha posição" onPress={() => ir('minhasFilas')} />
    </Tela>
  )
}

export default EntrarNaFilaScreen
