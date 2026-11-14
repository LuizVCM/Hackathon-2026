import { useState } from 'react'
import { View } from 'react-native'
import Aviso from '../../components/Aviso'
import Botao from '../../components/Botao'
import Painel from '../../components/Painel'
import Tela from '../../components/Tela'
import { CONSULTA, FILA_ATUAL, UBS } from '../../data/mock'
import LinhaHorario from './components/LinhaHorario'
import SeletorCanal, { Canal } from './components/SeletorCanal'

type Horario = { hora: number; ativo: boolean }
const INICIAIS: Horario[] = [
  { hora: 8, ativo: true },
  { hora: 12, ativo: true },
  { hora: 18, ativo: true },
]

const LembretesScreen = () => {
  const [horarios, setHorarios] = useState<Horario[]>(INICIAIS)
  const [canal, setCanal] = useState<Canal>('ambos')
  const [salvo, setSalvo] = useState(false)

  const alterar = (i: number, parcial: Partial<Horario>) => {
    setHorarios((atual) => atual.map((h, idx) => (idx === i ? { ...h, ...parcial } : h)))
    setSalvo(false)
  }

  return (
    <Tela titulo="Lembretes" subtitulo="No dia da consulta · 19 de novembro">
      <Painel titulo="Até três horários">
        <View style={{ gap: 14, marginTop: 4 }}>
          {horarios.map((h, i) => (
            <LinhaHorario key={i} hora={h.hora} ativo={h.ativo}
              onAlternar={() => alterar(i, { ativo: !h.ativo })}
              onMudarHora={(hora) => alterar(i, { hora })} />
          ))}
        </View>
      </Painel>
      <SeletorCanal canal={canal} onMudar={(c) => { setCanal(c); setSalvo(false) }} />
      <Aviso variante="sucesso"
        texto={`Consulta hoje: Fila ${FILA_ATUAL.codigo}, às ${CONSULTA.hora}.\n${UBS}.`} />
      <Botao rotulo={salvo ? 'Lembretes salvos ✓' : 'Salvar lembretes'} onPress={() => setSalvo(true)} />
    </Tela>
  )
}

export default LembretesScreen
