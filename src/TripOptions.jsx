import { useQuery } from '@apollo/client/react'
import { TRIP_OPTIONS } from './api'

const moneda = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })
const calendario = new Intl.DateTimeFormat('es-CL', { dateStyle: 'medium', timeZone: 'UTC' })

function Fecha({ valor }) {
  return <time dateTime={valor}>{calendario.format(new Date(valor))}</time>
}

function Oferta({ opcion, vuelo }) {
  return <li className="oferta">
    <div>
      <h3>{opcion.nombre}</h3>
      <p>{vuelo ? 'Ida' : 'Entrada'} <Fecha valor={vuelo ? opcion.salida : opcion.entrada} />
        {' · '}{vuelo ? 'Regreso' : 'Salida'} <Fecha valor={vuelo ? opcion.regreso : opcion.salida} /></p>
      <p className={opcion.disponibles ? 'disponible' : 'agotado'}>
        {opcion.disponibles ? `Disponibles: ${opcion.disponibles}` : 'Agotado'}
      </p>
    </div>
    <p className="precio"><strong>{moneda.format(opcion.precio)} CLP</strong><small>{vuelo ? 'por persona, ida y vuelta' : 'por noche'}</small></p>
  </li>
}

function Grupo({ titulo, opciones, vuelo = false }) {
  return <section>
    <h2>{titulo}</h2>
    {opciones.length ? <ul className="ofertas">{opciones.map(opcion =>
      <Oferta key={opcion.id} opcion={opcion} vuelo={vuelo} />
    )}</ul> : <p className="aviso">Por ahora no hay opciones de {titulo.toLowerCase()} para este destino.</p>}
  </section>
}

export default function TripOptions({ destinoId }) {
  const { loading, error, data, refetch } = useQuery(TRIP_OPTIONS, { variables: { destinoId } })

  if (loading) return <p className="aviso" role="status">Buscando vuelos y hoteles…</p>
  if (error || !data?.opciones) return <div className="aviso">
    <p role="alert">No pudimos cargar los vuelos y hoteles.</p>
    <button onClick={() => refetch().catch(() => {})}>Reintentar</button>
  </div>

  return <div className="resultados">
    <Grupo titulo="Vuelos" opciones={data.opciones.vuelos} vuelo />
    <Grupo titulo="Hoteles" opciones={data.opciones.hoteles} />
  </div>
}
