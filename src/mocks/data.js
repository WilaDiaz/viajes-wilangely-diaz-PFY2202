export const destinos = [
  { id: 'atacama', nombre: 'San Pedro de Atacama', pais: 'Chile', zona: 'Desierto', actividades: ['Valle de la Luna', 'Géiseres del Tatio', 'Observación de estrellas'] },
  { id: 'bariloche', nombre: 'Bariloche', pais: 'Argentina', zona: 'Montaña', actividades: ['Circuito Chico', 'Cerro Catedral', 'Lago Nahuel Huapi'] },
  { id: 'lima', nombre: 'Lima', pais: 'Perú', zona: 'Costa', actividades: ['Malecón de Miraflores', 'Barranco', 'Gastronomía peruana'] }
]

export const opciones = {
  atacama: {
    vuelos: [
      { id: 'v1', nombre: 'Santiago → Calama', origen: 'Santiago (SCL)', salida: '2027-02-05', regreso: '2027-02-10', precio: 89000, disponibles: 6 },
      { id: 'v2', nombre: 'Santiago → Calama', origen: 'Santiago (SCL)', salida: '2027-02-12', regreso: '2027-02-17', precio: 102000, disponibles: 0 }
    ],
    hoteles: [
      { id: 'h1', nombre: 'Posada del Desierto', entrada: '2027-02-05', salida: '2027-02-10', precio: 46000, disponibles: 3 }
    ]
  },
  bariloche: {
    vuelos: [
      { id: 'v3', nombre: 'Santiago → Bariloche', origen: 'Santiago (SCL)', salida: '2027-03-05', regreso: '2027-03-09', precio: 168000, disponibles: 8 }
    ],
    hoteles: [
      { id: 'h2', nombre: 'Refugio del Lago', entrada: '2027-03-05', salida: '2027-03-09', precio: 57000, disponibles: 2 }
    ]
  },
  lima: {
    vuelos: [],
    hoteles: [
      { id: 'h3', nombre: 'Casa del Malecón', entrada: '2027-04-09', salida: '2027-04-13', precio: 52000, disponibles: 4 }
    ]
  }
}
