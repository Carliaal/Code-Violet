import { useState, useEffect } from 'react'
import Papa from 'papaparse'

const EDU_MAP = {
  'superior': 'Superior/Universitario',
  'secundaria': 'Secundaria/Bachillerato',
  'primaria': 'Primaria',
  'Sin estudios': 'Sin estudios',
}

function normalizarEstudios(val) {
  if (!val) return null
  for (const [key, label] of Object.entries(EDU_MAP)) {
    if (val.includes(key)) return label
  }
  return val
}

function normalizarRegistro(d) {
  const get = (texto) =>
    d[Object.keys(d).find(k => k.includes(texto))]

  return {
    id: d["ID de respuesta"],
    edad: Number(d["0.1. ¿Qué edad tiene?"]) || null,
    tramoEdad: get("tramo de edad") || null,
    distrito: get("distrito de Madrid") || null,
    nacionalidad: get("nacionalidad") || null,
    estudios: normalizarEstudios(get("nivel educativo")),

    trabaja: get("situación laboral") === "Trabaja",
    situacionLaboral: get("situación laboral") || null,
    estadoCivil: get("estado civil") || null,
    viveSola: get("convivencia") === "Sola",
    tieneApoyo: get("persona cercana") === "Sí",

    victima: get("sentido obligada a realizar actos") === "Sí",
    conoceVictima: get("conoce a alguna mujer") === "Sí",
    segura: get("siente segura") === "Sí",
  }
}

function contarPor(datos, campo) {
  return datos.reduce((acc, d) => {
    const val = d[campo]
    if (val) acc[val] = (acc[val] || 0) + 1
    return acc
  }, {})
}

export function useDatos() {
  const [datos, setDatos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Papa.parse('/datos.csv', {
      download: true,
      header: true,
      delimiter: ';',
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const cleaned = results.data.map(normalizarRegistro)
          setDatos(cleaned)
        } catch (err) {
          console.error("Error procesando datos:", err)
        } finally {
          setLoading(false)
        }
      },
      error: (err) => {
        console.error("Error cargando CSV:", err)
        setLoading(false)
      }
    })
  }, [])

  const totalSurveyed = datos.length
  const victims = datos.filter(d => d.victima).length
  const porcentajeVictimas =
    totalSurveyed > 0 ? ((victims / totalSurveyed) * 100).toFixed(1) : 0
  const trabajan = datos.filter(d => d.trabaja).length
  const vivenSolas = datos.filter(d => d.viveSola).length
  const tienenApoyo = datos.filter(d => d.tieneApoyo).length
  const sientenSegura = datos.filter(d => d.segura).length

  const porDistrito = contarPor(datos, 'distrito')
  const porTramoEdad = contarPor(datos, 'tramoEdad')
  const porSituacionLaboral = contarPor(datos, 'situacionLaboral')
  const porEstudios = contarPor(datos, 'estudios')

  return {
    datos,
    loading,
    totalSurveyed,
    victims,
    porcentajeVictimas,
    trabajan,
    vivenSolas,
    tienenApoyo,
    sientenSegura,
    porDistrito,
    porTramoEdad,
    porSituacionLaboral,
    porEstudios,
  }
}
