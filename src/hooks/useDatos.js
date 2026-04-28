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
  const chk = (texto) => get(texto) === 'Sí'

  return {
    // Perfil
    edad: Number(d["0.1. ¿Qué edad tiene?"]) || null,
    tramoEdad:       get('tramo de edad') || null,
    distrito:        get('distrito de Madrid') || null,
    estudios:        normalizarEstudios(get('nivel educativo')),
    situacionLaboral: get('situación laboral') || null,
    trabaja:         get('situación laboral') === 'Trabaja',
    estadoCivil:     get('estado civil') || null,
    convivencia:     get('convivencia') || null,
    viveSola:        get('convivencia') === 'Sola',
    tieneApoyo:      get('persona cercana') === 'Sí',

    // Violencia
    victima:       get('sentido obligada a realizar actos') === 'Sí',
    conoceVictima: get('conoce a alguna mujer') === 'Sí',
    segura:        get('siente segura') === 'Sí',

    // El episodio (solo víctimas)
    lugarHechos:    get('tuvieron lugar los hechos') || null,
    relacionAgresor: get('relación que tenía') || null,
    denuncia:       get('enunció') || null,

    // Secuelas
    secuelasF:  chk('Físicas]'),
    secuelasP:  chk('Psicológicas]'),
    secuelasFP: chk('Físicas y psicológicas]'),

    // Apoyo tras el episodio
    apoyoAmigaMujer:    chk('Amiga mujer]'),
    apoyoFamiliarMujer: chk('Familiar mujer]'),
    apoyoAmigoHombre:   chk('Amigo hombre]'),
    apoyoFamiliarHombre: chk('Familiar hombre]'),

    // Recursos (todos los encuestados)
    adondePolicia:    chk('Policía o a la Guardia Civil]'),
    adondeHospital:   chk('hospital o a un centro de salud]'),
    adondeCentro:     chk('centro especializado en violencia sexual]'),
    adondeAsociacion: chk('asociación de mujeres]'),
    adondeJuzgado:    chk('juzgado]'),

    // Prevención
    razonNoDenuncia: get('Ranking 1') || null,
    medidasPrev:     get('siguientes opciones considera') || null,
    opcionPrev:      get('entre las dos opciones') || null,
  }
}

function contarPor(datos, campo) {
  return datos.reduce((acc, d) => {
    const val = d[campo]
    if (val && val !== 'Nc') acc[val] = (acc[val] || 0) + 1
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
          setDatos(results.data.map(normalizarRegistro))
        } catch (err) {
          console.error('Error procesando datos:', err)
        } finally {
          setLoading(false)
        }
      },
      error: (err) => {
        console.error('Error cargando CSV:', err)
        setLoading(false)
      },
    })
  }, [])

  const total = datos.length
  const victims = datos.filter(d => d.victima).length
  const victimasData = datos.filter(d => d.victima)

  // ── Perfil ─────────────────────────────────────────────
  const porTramoEdad       = contarPor(datos, 'tramoEdad')
  const porDistrito        = contarPor(datos, 'distrito')
  const porSituacionLaboral = contarPor(datos, 'situacionLaboral')
  const porEstadoCivil     = contarPor(datos, 'estadoCivil')
  const porConvivencia     = contarPor(datos, 'convivencia')

  // ── El episodio (víctimas) ──────────────────────────────
  const porLugarHechos    = contarPor(victimasData, 'lugarHechos')
  const porRelacionAgresor = contarPor(victimasData, 'relacionAgresor')
  const porDenuncia       = contarPor(victimasData, 'denuncia')

  // ── Secuelas ────────────────────────────────────────────
  const secuelas = {
    'Psicológicas':           victimasData.filter(d => d.secuelasP).length,
    'Físicas y psicológicas': victimasData.filter(d => d.secuelasFP).length,
    'Físicas':                victimasData.filter(d => d.secuelasF).length,
  }

  // ── Apoyo buscado (todos los encuestados) ───────────────
  const apoyoBuscado = {
    'Amiga mujer':    datos.filter(d => d.apoyoAmigaMujer).length,
    'Familiar mujer': datos.filter(d => d.apoyoFamiliarMujer).length,
    'Amigo hombre':   datos.filter(d => d.apoyoAmigoHombre).length,
    'Familiar hombre': datos.filter(d => d.apoyoFamiliarHombre).length,
  }

  // ── Recursos ────────────────────────────────────────────
  const adondeAcudiria = {
    'Policía/Guardia Civil':  datos.filter(d => d.adondePolicia).length,
    'Centro especializado':   datos.filter(d => d.adondeCentro).length,
    'Hospital/Salud':         datos.filter(d => d.adondeHospital).length,
    'Asoc. de mujeres':       datos.filter(d => d.adondeAsociacion).length,
    'Juzgado':                datos.filter(d => d.adondeJuzgado).length,
  }

  // ── Prevención ──────────────────────────────────────────
  const porRazonNoDenuncia = contarPor(datos, 'razonNoDenuncia')
  const porMedidasPrev     = contarPor(datos, 'medidasPrev')
  const porOpcionPrev      = contarPor(datos, 'opcionPrev')

  return {
    loading,
    // resumen
    totalSurveyed: total,
    victims,
    porcentajeVictimas: total > 0 ? ((victims / total) * 100).toFixed(1) : 0,
    trabajan:      datos.filter(d => d.trabaja).length,
    tienenApoyo:   datos.filter(d => d.tieneApoyo).length,
    sientenSegura: datos.filter(d => d.segura).length,
    // perfil
    porTramoEdad, porDistrito, porSituacionLaboral, porEstadoCivil, porConvivencia,
    // episodio
    porLugarHechos, porRelacionAgresor, porDenuncia,
    // consecuencias
    secuelas, apoyoBuscado,
    // recursos / prevención
    adondeAcudiria, porRazonNoDenuncia, porMedidasPrev, porOpcionPrev,
  }
}
