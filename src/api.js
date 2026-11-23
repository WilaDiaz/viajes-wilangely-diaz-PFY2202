import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'

const base = new URL(import.meta.env.BASE_URL, document.baseURI)
export const destinationsUrl = new URL('api/destinos', base).href
export const graphqlUrl = new URL('graphql', base).href
export const workerUrl = new URL('mockServiceWorker.js', base).href

export const client = new ApolloClient({
  link: new HttpLink({ uri: graphqlUrl }),
  cache: new InMemoryCache()
})

export const TRIP_OPTIONS = gql`
  query OpcionesDeViaje($destinoId: ID!) {
    opciones(destinoId: $destinoId) {
      vuelos { id nombre origen salida regreso precio disponibles }
      hoteles { id nombre entrada salida precio disponibles }
    }
  }
`
