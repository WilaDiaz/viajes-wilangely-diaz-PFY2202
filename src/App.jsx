import { useEffect } from 'react'
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import TripOptions from './TripOptions'
import { useDestinos } from './useDestinos'

function Actividades({ items }) {
  return <ul className="actividades" aria-label="Actividades populares">
    {items.map(actividad => <li key={actividad}>{actividad}</li>)}
  </ul>
}

function Catalogo({ destinos }) {
  return <>
    <header className="portada">
      <p className="zona">Sudamérica</p>
      <h1>¿Adónde vamos?</h1>
      <p>Explora destinos y compara vuelos y hoteles para tu próximo viaje.</p>
    </header>
    <section aria-labelledby="destinos">
      <h2 id="destinos">Destinos disponibles</h2>
      {destinos.length ? <div className="tarjetas">{destinos.map(destino =>
        <article key={destino.id} className="tarjeta">
          <div className={`paisaje ${destino.id}`} aria-hidden="true" />
          <div className="tarjeta-cuerpo">
            <p className="zona">{destino.pais} · {destino.zona}</p>
            <h3>{destino.nombre}</h3>
            <Actividades items={destino.actividades} />
            <Link className="boton" to={`/destinos/${destino.id}`}>Explorar {destino.nombre}</Link>
          </div>
        </article>
      )}</div> : <p className="aviso">Por ahora no hay destinos disponibles.</p>}
    </section>
  </>
}

function NoEncontrado() {
  return <section><h1>Página no encontrada</h1><Link to="/">Volver a destinos</Link></section>
}

function Detalle({ destinos }) {
  const { id } = useParams()
  const destino = destinos.find(item => item.id === id)
  if (!destino) return <NoEncontrado />

  return <>
    <Link className="volver" to="/">← Todos los destinos</Link>
    <header className={`portada detalle ${destino.id}`}>
      <p className="zona">{destino.pais} · {destino.zona}</p>
      <h1>{destino.nombre}</h1>
      <Actividades items={destino.actividades} />
    </header>
    <TripOptions key={id} destinoId={id} />
  </>
}

export default function App() {
  const { cargando, destinos, error, reintentar } = useDestinos()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return <>
    <nav className="barra" aria-label="Navegación principal">
      <div className="contenedor barra-interior">
        <Link className="marca" to="/">Ruta Sur</Link>
        <Link to="/" aria-current={pathname === '/' ? 'page' : undefined}>Destinos</Link>
      </div>
    </nav>
    <main className="contenedor">
      {cargando ? <p className="aviso" role="status">Cargando destinos…</p>
        : error ? <div className="aviso"><p role="alert">{error}</p><button onClick={reintentar}>Reintentar</button></div>
        : <Routes>
            <Route path="/" element={<Catalogo destinos={destinos} />} />
            <Route path="/destinos/:id" element={<Detalle destinos={destinos} />} />
            <Route path="*" element={<NoEncontrado />} />
          </Routes>}
    </main>
    <footer className="contenedor pie">Ruta Sur · Destinos, precios y disponibilidad simulados</footer>
  </>
}
