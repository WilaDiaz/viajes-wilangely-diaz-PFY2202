import { delay, graphql, http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { destinationsUrl, graphqlUrl } from '../api'
import { destinos, opciones } from './data'

export const worker = setupWorker(
  http.get(destinationsUrl, async () => {
    await delay(350)
    return HttpResponse.json(destinos)
  }),
  graphql.link(graphqlUrl).query('OpcionesDeViaje', async ({ variables }) => {
    await delay(400)
    const destinoId = variables.destinoId
    if (!Object.hasOwn(opciones, destinoId)) {
      return HttpResponse.json({ errors: [{ message: 'El destino solicitado no existe.' }] })
    }
    return HttpResponse.json({ data: { opciones: opciones[destinoId] } })
  })
)
