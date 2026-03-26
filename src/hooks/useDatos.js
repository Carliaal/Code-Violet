import { useState, useEffect } from 'react'
import Papa from 'papaparse'

function normalizarRegistro(d) {
  const get = (texto) =>
    d[Object.keys(d).find(k => k.includes(texto))]

  return {
    id: d["ID de respuesta"],
    edad: Number(d["0.1. ¿Qué edad tiene?"]) || null,
    distrito: get("distrito de Madrid") || null,
    nacionalidad: get("nacionalidad") || null,
    estudios: get("nivel educativo") || null,

    trabaja: get("situación laboral") === "Trabaja",
    estadoCivil: get("estado civil") || null,
    viveSola: get("convivencia") === "Sola",
    tieneApoyo: get("persona cercana") === "Sí",

    victima: get("sentido obligada a realizar actos") === "Sí",
    conoceVictima: get("conoce a alguna mujer") === "Sí"
  }
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
    totalSurveyed > 0 ? ((victims / totalSurveyed) * 100).toFixed(2) : 0

  const trabajan = datos.filter(d => d.trabaja).length

  const vivenSolas = datos.filter(d => d.viveSola).length

  return {
    datos,
    loading,
    totalSurveyed,
    victims,
    porcentajeVictimas,
    trabajan,
    vivenSolas
  }
}