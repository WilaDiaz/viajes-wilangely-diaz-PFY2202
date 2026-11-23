import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client/react'
import { HashRouter } from 'react-router-dom'
import { client, workerUrl } from './api'
import { worker } from './mocks/browser'
import App from './App'
import './styles.css'

const root = createRoot(document.getElementById('root'))

async function iniciar() {
  try {
    await worker.start({ serviceWorker: { url: workerUrl }, onUnhandledRequest: 'bypass' })
    root.render(
      <ApolloProvider client={client}>
        <HashRouter><App /></HashRouter>
      </ApolloProvider>
    )
  } catch (error) {
    console.error(error)
    root.render(<main className="contenedor"><p role="alert">No se pudo iniciar el catálogo de prueba.</p>
      <button onClick={() => window.location.reload()}>Recargar la página</button></main>)
  }
}

iniciar()
