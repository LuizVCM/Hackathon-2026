const { test } = require('node:test')
const assert = require('node:assert/strict')
const base = process.env.API_URL || 'http://localhost:3000/api'

async function request(path, { token, method = 'GET', body } = {}) {
  const response = await fetch(`${base}${path}`, { method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}) })
  return { status: response.status, body: await response.json() }
}

test('fluxo SQL: autenticação, isolamento, filas, preferências e ofertas', async () => {
  assert.equal((await request('/consultas')).status, 401)
  const login = await request('/auth/login', { method: 'POST', body: { cpf: '12345678901', senha: 'Consulta123!' } })
  assert.equal(login.status, 200)
  const token = login.body.token
  assert.equal(login.body.paciente.senha, undefined)
  const cpf = String(Date.now()).slice(-11)
  const dados = { nome: 'Teste Integração', cpf, telefone: '11988887777', senha: 'Teste123!' }
  assert.equal((await request('/auth/cadastro', { method: 'POST', body: dados })).status, 201)
  assert.equal((await request('/auth/cadastro', { method: 'POST', body: dados })).status, 400)
  assert.equal((await request('/auth/login', { method: 'POST', body: { cpf, senha: 'incorreta' } })).status, 401)
  const outro = (await request('/auth/login', { method: 'POST', body: dados })).body.token
  assert.deepEqual((await request('/consultas', { token: outro })).body, [])
  const consultas = (await request('/consultas', { token })).body
  assert.ok(consultas.length)
  const consulta = consultas[0]
  assert.equal((await request(`/consultas/${consulta.id}`, { token: outro, method: 'PATCH', body: { status: 'CANCELADA' } })).status, 400)
  assert.equal((await request(`/consultas/${consulta.id}`, { token, method: 'PATCH', body: { status: 'CONFIRMADA' } })).status, 200)
  assert.equal((await request('/consultas', { token })).body[0].status, 'CONFIRMADA')
  const filas = (await request('/filas', { token: outro })).body
  const inscricao = { filaId: filas[0].id, distanciaMaximaKm: 7, possuiTransporte: true, disponibilidade: 'MANHA' }
  const concorrentes = await Promise.all([1, 2].map(() => request('/filas/entrar', { token: outro, method: 'POST', body: inscricao })))
  assert.deepEqual(concorrentes.map(r => r.status).sort(), [201, 400])
  const minhas = (await request('/filas/minhas', { token: outro })).body
  assert.equal(minhas.length, 1)
  assert.ok(minhas[0].posicao >= 1)
  assert.equal(minhas[0].distanciaMaximaKm, 7)
  assert.equal(minhas[0].possuiTransporte, true)
  const preferencias = { canal: 'ambos', horarios: [{ hora: 9, ativo: true }, { hora: 14, ativo: false }] }
  assert.equal((await request('/lembretes/preferencias', { token: outro, method: 'PUT', body: preferencias })).status, 200)
  const salvas = (await request('/lembretes/preferencias', { token: outro })).body
  assert.equal(salvas.canal, 'ambos')
  assert.deepEqual(salvas.horarios, preferencias.horarios)
  assert.equal((await request('/lembretes/preferencias', { token: outro, method: 'PUT', body: { ...preferencias, horarios: [{ hora: 99, ativo: true }] } })).status, 400)
  const ofertas = (await request('/ofertas', { token })).body
  const oferta = ofertas.find(o => o.status === 'PENDENTE' && new Date(o.expiraEm) > new Date())
  if (oferta) {
    assert.equal((await request(`/ofertas/${oferta.id}/responder`, { token: outro, method: 'POST', body: { resposta: 'ACEITAR' } })).status, 400)
    const respostas = await Promise.all([1, 2].map(() => request(`/ofertas/${oferta.id}/responder`, { token, method: 'POST', body: { resposta: 'ACEITAR' } })))
    assert.deepEqual(respostas.map(r => r.status).sort(), [200, 400])
    assert.ok((await request('/filas/minhas', { token })).body.some(p => p.status === 'AGUARDANDO_VALIDACAO'))
  }
  assert.equal((await request(`/consultas/${consulta.id}`, { token, method: 'PATCH', body: { status: 'CANCELADA', motivo: 'horario' } })).status, 200)
  const cancelada = (await request('/consultas', { token })).body[0]
  assert.equal(cancelada.status, 'CANCELADA')
  assert.equal(cancelada.motivoCancelamento, 'horario')
})
