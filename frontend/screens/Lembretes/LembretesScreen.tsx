import { useSaude } from '../../context/SaudeContext'
import { api } from '../../services/api'
import { Preferencias, dataConsulta, horaConsulta } from '../../services/tipos'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import Aviso from '../../components/Aviso'
import Botao from '../../components/Botao'
import Painel from '../../components/Painel'
import Tela from '../../components/Tela'
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
  const [carregando, setCarregando] = useState(true)
  const { consultas, executar, setErro } = useSaude()
  const consulta = consultas.find(c => ['AGENDADA', 'CONFIRMADA'].includes(c.status))
  useEffect(() => {
    let ativo = true
    api<Preferencias>('/lembretes/preferencias').then(p => { if (ativo) { setHorarios(p.horarios); setCanal(p.canal) } })
      .catch(e => { if (ativo) setErro(e.message) }).finally(() => { if (ativo) setCarregando(false) })
    return () => { ativo = false }
  }, [setErro])

  const alterar = (i: number, parcial: Partial<Horario>) => {
    setHorarios((atual) => atual.map((h, idx) => (idx === i ? { ...h, ...parcial } : h)))
    setSalvo(false)
  }

  return (
    <Tela titulo="Lembretes" subtitulo={consulta ? `No dia da consulta · ${dataConsulta(consulta.dataHora)}` : "Seus horários e canais preferidos"}>
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
        texto={consulta ? `Próxima consulta: ${horaConsulta(consulta.dataHora)} · ${consulta.unidade.nome}.` : "Você não tem consulta agendada. As preferências serão usadas nos próximos agendamentos."} />
      <Botao rotulo={salvo ? 'Lembretes salvos ✓' : 'Salvar lembretes'} desabilitado={carregando} onPress={() => void executar(() => api('/lembretes/preferencias', 'PUT', { canal, horarios }), () => setSalvo(true))} />
    </Tela>
  )
}

export default LembretesScreen
