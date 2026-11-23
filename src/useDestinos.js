import { useEffect, useState } from 'react'
import { destinationsUrl } from './api'

export function useDestinos() {
  const [intento, setIntento] = useState(0)
  const [estado, setEstado] = useState({ cargando: true, destinos: [], error: '' })

  useEffect(() => {
    const controller = new AbortController()

    async function cargar() {
      try {
        const respuesta = await fetch(destinationsUrl, { signal: controller.signal })
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
        const destinos = await respuesta.json()
        if (!controller.signal.aborted) setEstado({ cargando: false, destinos, error: '' })
      } catch (error) {
        if (!controller.signal.aborted) {
          setEstado({ cargando: false, destinos: [], error: 'No pudimos cargar los destinos.' })
        }
      }
    }

    cargar()
    return () => controller.abort()
  }, [intento])

  function reintentar() {
    setEstado({ cargando: true, destinos: [], error: '' })
    setIntento(anterior => anterior + 1)
  }

  return { ...estado, reintentar }
}
