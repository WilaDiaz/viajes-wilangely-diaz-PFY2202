# Ruta Sur

Proyecto de Desarrollo Frontend II, PFY2202, semana 5, forma B. Agencia de viajes con catálogo de destinos, actividades, vuelos y hoteles de prueba. Precios en pesos chilenos.

## Ejecutar en local

Con Node.js 24, abre una terminal en esta carpeta:

```sh
npm ci
npm run dev
```

Abre la dirección que imprime Vite. La instalación genera `public/mockServiceWorker.js`. Para probar la versión de publicación, ejecuta `npm run build` y luego `npm run preview`.

## Cómo viajan los datos

1. `useDestinos.js` usa `useEffect` y `fetch` para pedir el catálogo por REST a `GET api/destinos`, y usa `useState` para guardar datos, carga y error.
2. Al elegir un destino, React Router abre `#/destinos/:id`. La ruta conserva el destino al copiar el enlace o recargar.
3. `TripOptions.jsx` usa Apollo Client para enviar `OpcionesDeViaje` al endpoint `graphql`, pasando el ID como variable. Muestra precio, fechas y disponibilidad. Apollo conserva las consultas en caché por destino.
4. `src/mocks/browser.js` intercepta ambas solicitudes con MSW. Los datos de prueba están en `src/mocks/data.js`. El mock se inicia antes de montar React, también en la versión compilada.

## Pruebas de la pauta

Repite estos recorridos en dos navegadores y anota el navegador, su versión, la fecha y el resultado comprobado.

| Recorrido | Resultado esperado |
| --- | --- |
| Abrir el catálogo | Aparece un aviso de carga y luego tres destinos con país y actividades. |
| Elegir San Pedro de Atacama | Dos vuelos, uno agotado, y un hotel. |
| Volver y elegir Bariloche | Aparecen el vuelo y el hotel de Bariloche. |
| Elegir Lima | Se muestra un mensaje de vuelos vacíos y sigue disponible el hotel. |
| Recargar un detalle y usar Atrás | Se conserva el detalle al recargar y el navegador permite retroceder. |
| Abrir una ruta desconocida | Se informa que la página no existe y se ofrece volver al catálogo. |
| Reducir la ventana a 375 px | Las tarjetas y ofertas se leen sin desplazamiento horizontal. |
| Bloquear temporalmente una petición de API en DevTools | Aparece un mensaje de error. Desbloquea y pulsa Reintentar. Para GraphQL, elige primero un destino que todavía no esté en caché. |

En la pestaña Red puedes observar el GET de destinos y el POST GraphQL con el ID del destino en sus variables.

### Resultado de las pruebas

El 22 de noviembre de 2026 probé Ruta Sur en Google Chrome,
Microsoft Edge, Mozilla Firefox y Opera. La aplicación funcionó
en los cuatro navegadores.

En Lima se mostró el aviso de que no había vuelos disponibles
y la sección de hoteles siguió visible.

