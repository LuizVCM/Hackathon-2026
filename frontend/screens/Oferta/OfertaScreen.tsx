import { useEffect, useState } from 'react'
import Aviso from '../../components/Aviso'
import Botao from '../../components/Botao'
import Painel from '../../components/Painel'
import Tela from '../../components/Tela'
import { useSaude } from '../../context/SaudeContext'
import { api } from '../../services/api'
import { PropsTela } from '../../navigation/tipos'
import AcoesOferta from './components/AcoesOferta'

export default function OfertaScreen({ ir }: PropsTela) {
  const { ofertas, executar } = useSaude()
  const [agora, setAgora] = useState(() => Date.now())
  useEffect(() => { const timer = setInterval(() => setAgora(Date.now()), 1000); return () => clearInterval(timer) }, [])
  const oferta = ofertas.find(o => o.status === 'PENDENTE' && new Date(o.expiraEm).getTime() > agora)
  const responder = (resposta: string) => oferta && void executar(() => api(`/ofertas/${oferta.id}/responder`, 'POST', { resposta }), () => ir(resposta === 'ACEITAR' ? 'aguardando' : 'ofertaPassou'))
  return <Tela titulo="Uma nova oportunidade" subtitulo="O aceite depende da validação da unidade.">
    {oferta ? <>
      <Painel titulo={`Oferta V-${oferta.id}`} subtitulo={`${oferta.participacao.fila.especialidade} · ${oferta.participacao.fila.unidade.nome}`} />
      <Aviso variante="atencao" titulo={`Responda em ${Math.ceil((new Date(oferta.expiraEm).getTime() - agora) / 60000)} min`}
        texto="A unidade confirmará os detalhes e o horário após a validação." />
      <AcoesOferta onAceitar={() => responder('ACEITAR')} onRecusar={() => responder('RECUSAR')} onTransporte={() => ir('ajuda')} />
    </> : <Painel titulo="Nenhuma oferta disponível" subtitulo="O prazo pode ter terminado. Seu lugar na fila permanece preservado.">
      <Botao rotulo="Ver minhas filas" onPress={() => ir('minhasFilas')} />
    </Painel>}
  </Tela>
}
