import { useState, useEffect } from 'react'
import { Layout, Btn, Card, Slot, Nav } from './ui'
import { paciente, consulta, vaga, fila, motivos } from './data'

const Data = ({ d, h }) => (
  <div className="row"><Slot icon="📅">{d}</Slot><Slot icon="⏰">{h}</Slot></div>
)

function Timer({ onEnd }) {
  const [s, setS] = useState(1200)
  useEffect(() => {
    if (s === 0) return onEnd()
    const t = setTimeout(() => setS(s - 1), 1000)
    return () => clearTimeout(t)
  }, [s])
  return <span>{String(Math.floor(s / 60)).padStart(2, '0')}:{String(s % 60).padStart(2, '0')}</span>
}

const screens = {
  login: (go) => (
    <Layout title={'Seu cuidado,\nmais perto.'} nav={false}>
      <Card><label>CPF</label><input placeholder="000.000.000-00" />
        <label>Senha</label><input type="password" placeholder="Digite sua senha" />
        <Btn v="pri" onClick={() => go('inicio')}>Entrar</Btn></Card>
      <p className="c">Ainda não tem uma conta?</p>
      <div className="pad"><Btn onClick={() => go('cadastro')}>Criar conta</Btn></div>
    </Layout>
  ),
  cadastro: (go) => (
    <Layout title="Vamos começar?" nav={false}>
      <Card><label>Código do paciente</label><input placeholder="P-1042" />
        <label>CPF</label><input placeholder="000.000.000-00" />
        <label>Celular com WhatsApp</label><input placeholder="(00) 00000-0000" />
        <label>Senha</label><input type="password" placeholder="Crie sua senha" />
        <Btn v="pri" onClick={() => go('inicio')}>Cadastrar e entrar</Btn></Card>
      <div className="pad"><Btn onClick={() => go('login')}>Já tenho conta · Entrar</Btn></div>
    </Layout>
  ),
  inicio: (go, st) => (
    <Layout title={`Olá, ${paciente.codigo}!`} sub="Acompanhe seus próximos passos." tab="inicio">
      <Card v="pu"><p>Próxima consulta · responda abaixo</p><h3>Agendamento {consulta.id}</h3>
        <p>{paciente.unidade}</p><Data d={consulta.data} h={consulta.hora} /></Card>
      <Btn v="grn" onClick={() => st.set({ ...st.v, presenca: true })}>
        {st.v.presenca ? 'Presença confirmada ✓' : 'Confirmar presença'}</Btn>
      <Btn onClick={() => go('entrar')}>Preciso remarcar</Btn>
      <Btn v="red" onClick={() => go('cancelamento')}>Não vou poder ir</Btn>
    </Layout>
  ),
  entrar: (go, st) => (
    <Layout title="Entrar na fila" sub={`Fila ${consulta.fila} · ${paciente.unidade}`} tab="filas">
      <Card><h3>Sua disponibilidade</h3><p>Toque para alterar suas preferências.</p>
        {['Manhã disponível', 'Tenho transporte', 'Preferências revisadas'].map((x) => (
          <Btn key={x} v={st.v[x] ? 'on' : ''} onClick={() => st.set({ ...st.v, [x]: !st.v[x] })}>{x}</Btn>))}</Card>
      <Card><h3>Até quantos km você pode ir?</h3>
        <div className="row"><button className="rd" onClick={() => st.set({ ...st.v, km: Math.max(1, st.v.km - 1) })}>−</button>
          <b className="c">{st.v.km} km</b>
          <button className="rd" onClick={() => st.set({ ...st.v, km: st.v.km + 1 })}>+</button></div></Card>
      <Btn v="pri" onClick={() => go('minhasFilas')}>Salvar e ver minha posição</Btn>
    </Layout>
  ),
  minhasFilas: (go) => (
    <Layout title="Minhas filas" sub={`${paciente.codigo} · ${paciente.unidade}`} tab="filas">
      <Card><div className="pos"><span>Paciente {paciente.codigo}<br />Fila F-01 · 4 pessoas à frente</span><b>5ª</b></div></Card>
      <Card><h3>Seu lugar está preservado</h3>
        <p>Liberar uma consulta não faz você perder sua posição na fila.</p></Card>
      <Card><h3>Fila F-02</h3><p>Quer aproveitar uma vaga liberada nesta unidade?</p>
        <Btn v="pri" onClick={() => go('liberada')}>Entrar nesta fila</Btn></Card>
    </Layout>
  ),
  cancelamento: (go, st) => (
    <Layout title={`Olá, ${paciente.codigo}!`} tab="inicio">
      <Card><h3>O que aconteceu?</h3><p>Sua resposta ajuda a unidade a reaproveitar a vaga.</p>
        {motivos.map((m) => (
          <div key={m} className={`opt ${st.v.motivo === m ? 'on' : ''}`} onClick={() => st.set({ ...st.v, motivo: m })}>
            {st.v.motivo === m ? '●' : '○'} {m}</div>))}
        <Btn v="red" onClick={() => go('mantido')}>Cancelar consulta</Btn>
        <Btn onClick={() => go('inicio')}>Voltar sem cancelar</Btn></Card>
    </Layout>
  ),
  liberada: (go) => (
    <Layout title={'Uma vaga foi\nliberada'} tab="filas">
      <Card><h3>Vaga {vaga.id} · {vaga.hora}</h3><p>{vaga.data} · {vaga.unidade}<br />Simular liberação por falta</p></Card>
      {fila.map((f) => (
        <div key={f.codigo} className={`pos ${f.eu ? 'me' : ''}`} style={{ marginBottom: 8 }}>
          <span>Paciente {f.codigo}<br />{f.info}</span><b>{f.dias}d</b></div>))}
      <Btn v="pri" onClick={() => go('oferta')}>Simular envio da oferta</Btn>
    </Layout>
  ),
  oferta: (go) => (
    <Layout title={'Uma nova\noportunidade'} sub="Aceitar ainda depende da validação da unidade." tab="filas">
      <Card v="pu"><p>Nova vaga disponível</p><h3>Vaga {vaga.id}</h3>
        <p>{vaga.unidade} · paciente {paciente.codigo}</p><Data d={vaga.data} h={vaga.hora} /></Card>
      <Card v="warn"><h3>⚠ Responda em <Timer onEnd={() => go('passou')} /></h3>
        <p>Toque para simular o fim do prazo.</p></Card>
      <Btn v="pri" onClick={() => go('aguardando')}>Quero a vaga</Btn>
      <Btn onClick={() => go('aguardando')}>Preciso de transporte</Btn>
      <Btn v="red" onClick={() => go('passou')}>Não posso</Btn>
    </Layout>
  ),
  aguardando: (go) => (
    <Layout title={'Aguardando\na unidade'} sub="Seu aceite foi recebido." tab="filas">
      <Card v="warn"><h3>⚠ Aceite em validação</h3>
        <p>A vaga só será confirmada depois que a unidade validar a substituição.</p></Card>
      <Card><h3>Vaga {vaga.id} · {paciente.codigo}</h3><p>{vaga.data.split(' ·')[0]} · {vaga.hora}<br />{vaga.unidade}</p></Card>
      <Btn onClick={() => go('minhasFilas')}>Acompanhar minha fila</Btn>
      <p className="c">Demonstração da unidade</p>
      <Btn v="pri" onClick={() => go('confirmado')}>Simular validação da UBS</Btn>
      <Btn onClick={() => go('passou')}>Simular não validação</Btn>
    </Layout>
  ),
  confirmado: (go) => (
    <Layout title="Tudo pronto." sub="Seu agendamento está confirmado." tab="inicio">
      <Card v="ok"><h3>✓ Vaga confirmada</h3><p>Ótimo. Enviamos o endereço e o horário de chegada.</p></Card>
      <Card v="pu"><p>Agendamento confirmado</p><h3>Paciente {paciente.codigo}</h3>
        <p>{paciente.unidade}</p><Data d={vaga.data} h={vaga.hora} /></Card>
      <Btn v="pri" onClick={() => go('inicio')}>Voltar ao início</Btn>
      <Btn onClick={() => go('minhasFilas')}>Ver minha fila</Btn>
    </Layout>
  ),
  passou: (go) => (
    <Layout title={'A oferta passou\nadiante'} sub={`Fila ${consulta.fila} · ${paciente.unidade}`} tab="filas">
      <Card><h3>ⓘ A vaga não fica parada</h3><p>Você recusou esta oferta.</p></Card>
      <Card><div className="pos"><span>Paciente P-1004<br />Próxima pessoa compatível</span><b>30d</b></div></Card>
      <Card><h3>Você continua na fila</h3>
        <p>Recusar ou deixar o prazo vencer não confirma a vaga. Aguarde outra oferta.</p></Card>
      <Btn v="pri" onClick={() => go('minhasFilas')}>Ver minha fila</Btn>
      <Btn onClick={() => go('inicio')}>Voltar ao início</Btn>
    </Layout>
  ),
  mantido: (go) => (
    <Layout title={'Seu lugar está\nmantido'} sub="Fila F-01 · UBS Setor Sul" tab="filas">
      <Card v="ok"><h3>✓ Vaga liberada</h3><p>Sua consulta será reaproveitada por outra pessoa da fila.</p></Card>
      <Card><div className="pos"><span>Paciente {paciente.codigo}<br />Fila F-01 · 4 pessoas à frente</span><b>5ª</b></div></Card>
      <Card><h3>Aguarde uma nova oferta</h3><p>Seu lugar não mudou. Nenhuma nova consulta está confirmada ainda.</p></Card>
      <Btn v="pri" onClick={() => go('minhasFilas')}>Acompanhar minha fila</Btn>
      <Btn onClick={() => go('inicio')}>Voltar ao início</Btn>
    </Layout>
  ),
  lembretes: (go, st) => (
    <Layout title="Lembretes" sub="No dia da consulta · 19 de novembro" tab="lembretes">
      <Card><h3>Até três horários</h3>
        {st.v.horas.map((h, i) => (
          <div className="row" key={i}>
            <Btn v={h.on ? 'on' : ''} onClick={() => st.setHora(i, { on: !h.on })}>{h.on ? 'Ativo' : 'Inativo'}</Btn>
            <button className="rd" onClick={() => st.setHora(i, { h: Math.max(0, h.h - 1) })}>−</button>
            <b className="c">{h.h}h</b>
            <button className="rd" onClick={() => st.setHora(i, { h: Math.min(23, h.h + 1) })}>+</button>
          </div>))}</Card>
      <Card><h3>Onde você quer receber?</h3>
        <div className="row">{['App', 'WhatsApp', 'Ambos'].map((c) => (
          <Btn key={c} v={st.v.canal === c ? 'grn' : ''} onClick={() => st.set({ ...st.v, canal: c })}>{c}</Btn>))}</div></Card>
      <Btn v="pri" onClick={() => go('inicio')}>Salvar lembretes</Btn>
    </Layout>
  ),
  ajuda: () => (
    <Layout title="Ajuda" tab="ajuda"><Card><h3>Dúvidas?</h3><p>Fale com a sua unidade de saúde.</p></Card></Layout>
  ),
}

export default function App() {
  const [screen, setScreen] = useState('login')
  const [v, set] = useState({
    km: 5, presenca: false, motivo: 'Não tenho transporte', canal: 'Ambos',
    horas: [{ on: true, h: 8 }, { on: true, h: 12 }, { on: true, h: 18 }],
  })
  const setHora = (i, patch) =>
    set({ ...v, horas: v.horas.map((x, j) => (j === i ? { ...x, ...patch } : x)) })
  return <Nav.Provider value={setScreen}>{screens[screen](setScreen, { v, set, setHora })}</Nav.Provider>
}
