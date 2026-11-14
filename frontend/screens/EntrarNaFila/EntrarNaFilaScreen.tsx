import { useState } from 'react'
import Botao from '../../components/Botao'
import Tela from '../../components/Tela'
import { useSaude } from '../../context/SaudeContext'
import { api } from '../../services/api'
import Painel from '../../components/Painel'
import { PropsTela } from '../../navigation/tipos'
import ListaDisponibilidade, { Disponibilidade } from './components/ListaDisponibilidade'
import SeletorDistancia from './components/SeletorDistancia'

const EntrarNaFilaScreen = ({ ir }: PropsTela) => {
  const [disp, setDisp] = useState<Disponibilidade>({ manha: true, transporte: true, revisadas: true })
  const [km, setKm] = useState(5)
  const { filas, filaId, executar, participacoes } = useSaude()
  const fila = filas.find(f => f.id === filaId) ?? filas.find(f => !participacoes.some(p => p.fila.id === f.id && p.posicao !== null))

  return (
    <Tela titulo="Entrar na fila" subtitulo={fila ? `Fila F-${fila.id} · ${fila.unidade.nome}` : 'Nenhuma fila disponível'}>
      {fila ? <><Painel titulo={fila.especialidade} subtitulo="Revise suas preferências para receber ofertas compatíveis." />
      <ListaDisponibilidade valor={disp} onMudar={setDisp} />
      <SeletorDistancia km={km} onMudar={setKm} />
      <Botao rotulo="Salvar e ver minha posição" desabilitado={!disp.revisadas} onPress={() => void executar(() => api('/filas/entrar', 'POST', {
        filaId: fila.id, distanciaMaximaKm: km, possuiTransporte: disp.transporte, disponibilidade: disp.manha ? 'MANHA' : 'QUALQUER',
      }), () => ir('minhasFilas'))} /></> : <Painel titulo="Você está em dia" subtitulo="Consulte suas filas para acompanhar sua participação." />}
    </Tela>
  )
}

export default EntrarNaFilaScreen
