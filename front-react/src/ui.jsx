import { createContext, useContext } from 'react'

export const Nav = createContext(() => {})
export const useGo = () => useContext(Nav)

const tabs = [['inicio', 'Início', '🏠'], ['filas', 'Minhas filas', '☰'], ['lembretes', 'Lembretes', '🔔'], ['ajuda', 'Ajuda', '?']]

export function Layout({ title, sub, tab, nav = true, children }) {
  const go = useGo()
  return (
    <div className="app">
      <header className="hd"><small>consulta+</small><h1>{title}</h1>{sub && <p>{sub}</p>}</header>
      {children}
      {nav && (
        <nav className="nav">
          {tabs.map(([k, l, i]) => (
            <button key={k} className={tab === k ? 'on' : ''} onClick={() => go(k === 'filas' ? 'minhasFilas' : k)}>
              <span>{i}</span>{l}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}

export const Btn = ({ v = '', ...p }) => <button className={`btn ${v}`} {...p} />
export const Card = ({ v = '', children }) => <div className={`card ${v}`}>{children}</div>
export const Slot = ({ icon, children }) => <div className="chip">{icon} {children}</div>
