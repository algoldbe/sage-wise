/* ─────────────────────────────────────────────────────────────────────────────
   Infografías del modelo octagramal
   ─────────────────────────────────────────────────────────────────────────────
   Las 7 infografías de Guillermo, cada una con sus temas. Un tema son dos
   láminas de la misma figura: el lado POSITIVO, a color y con las flechas de
   relación, y el lado NEGATIVO, en gris y con la clave de cada módulo al lado.

   Las láminas se exportaron a PNG desde los PowerPoint originales, que viven
   en `fuentes/infografias/`, fuera del repositorio. De cada clave del lado
   negativo se guardó su recuadro en porcentaje de la lámina (x, y, w, h), y
   con eso se dibuja encima un botón invisible: la imagen no se toca, los
   enlaces van montados sobre ella.

   Los datos van aquí adentro y no en un .json aparte porque el portal tiene
   que abrir también desde file://, donde fetch() está bloqueado. Es la misma
   razón por la que quizData está incrustado en main.js.

   Los módulos van llegando por remesas. Los que ya están se listan en MODULOS,
   más abajo, y se abren en el mismo visor de PDF de Génesis del Octagrama. Los
   que faltan siguen abriendo la ventanita que dice que están por venir.
   ───────────────────────────────────────────────────────────────────────────── */

const INFOGRAFIAS = [
 {
  "id": 0,
  "titulo": "Presentación",
  "temas": [
   {
    "n": 1,
    "titulo": "Introducción a la modelación",
    "pos": "infografias/img/i0-t1-pos.png",
    "neg": "infografias/img/i0-t1-neg.png",
    "claves": [
     {
      "c": "PR 00",
      "t": "Diseño de empresas y organizaciones",
      "x": 28.06,
      "y": 18.73,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "PR 01",
      "t": "Elementos para modelar empresas",
      "x": 9.18,
      "y": 47.16,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "PR 02",
      "t": "Recursos para modelar organizaciones",
      "x": 52.99,
      "y": 47.16,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "OV 00",
      "t": "Octagrama de valor",
      "x": 10.5,
      "y": 74.92,
      "w": 6.85,
      "h": 4.49
     },
     {
      "c": "OC 00",
      "t": "Octagrama cerebral",
      "x": 52.8,
      "y": 74.92,
      "w": 7.13,
      "h": 5.51
     }
    ]
   },
   {
    "n": 2,
    "titulo": "Teorías de negocio",
    "pos": "infografias/img/i0-t2-pos.png",
    "neg": "infografias/img/i0-t2-neg.png",
    "claves": [
     {
      "c": "PR 03",
      "t": "Bases teóricas para modelar",
      "x": 28.19,
      "y": 18.14,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "TV 00",
      "t": "Teoría del valor",
      "x": 8.65,
      "y": 39.14,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "TI 00",
      "t": "Teoría de la Información",
      "x": 53.81,
      "y": 39.14,
      "w": 5.91,
      "h": 4.49
     }
    ]
   },
   {
    "n": 3,
    "titulo": "Filosofías de negocio",
    "pos": "infografias/img/i0-t3-pos.png",
    "neg": "infografias/img/i0-t3-neg.png",
    "claves": [
     {
      "c": "PR 04",
      "t": "Bases filosóficas para modelar",
      "x": 28.1,
      "y": 17.64,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "PR 05",
      "t": "Concepción de un modelo",
      "x": 28.53,
      "y": 38.14,
      "w": 6.54,
      "h": 4.49
     }
    ]
   }
  ]
 },
 {
  "id": 1,
  "titulo": "Dinámica del entorno",
  "temas": [
   {
    "n": 1,
    "titulo": "Evolución de estructuras y cambio de paradigmas",
    "pos": "infografias/img/i1-t1-pos.png",
    "neg": "infografias/img/i1-t1-neg.png",
    "claves": [
     {
      "c": "EV 00",
      "t": "Evolución de las estructuras económicas y sociales",
      "x": 9.97,
      "y": 36.09,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "CP 00",
      "t": "Cambio de paradigmas tecnológicos e ideológicos",
      "x": 42.31,
      "y": 50.47,
      "w": 6.52,
      "h": 4.49
     },
     {
      "c": "EV 01",
      "t": "Políticas económicas",
      "x": 9.97,
      "y": 50.93,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "EV 02",
      "t": "Políticas sociales",
      "x": 9.97,
      "y": 64.04,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "EV 03",
      "t": "Conciencia social",
      "x": 9.97,
      "y": 77.93,
      "w": 6.54,
      "h": 4.49
     }
    ]
   },
   {
    "n": 2,
    "titulo": "Revoluciones tecnológicas y crisis ideológicas",
    "pos": "infografias/img/i1-t2-pos.png",
    "neg": "infografias/img/i1-t2-neg.png",
    "claves": [
     {
      "c": "RT 01",
      "t": "Progreso de la humanidad en dos pasos",
      "x": 7.13,
      "y": 32.45,
      "w": 6.47,
      "h": 4.49
     },
     {
      "c": "CI 01",
      "t": "El drama de la humanidad en tres actos",
      "x": 52.39,
      "y": 32.67,
      "w": 6.0,
      "h": 4.49
     },
     {
      "c": "RT 02",
      "t": "Batallas tecnológicas del s XX",
      "x": 6.65,
      "y": 42.7,
      "w": 6.47,
      "h": 4.49
     },
     {
      "c": "CI 02",
      "t": "Familias seculares",
      "x": 52.4,
      "y": 43.32,
      "w": 6.0,
      "h": 4.49
     },
     {
      "c": "RT 03",
      "t": "Guerras tecnológicas del s XXI",
      "x": 6.65,
      "y": 53.07,
      "w": 6.47,
      "h": 4.49
     },
     {
      "c": "CI 03",
      "t": "Proliferación de ideas y creencias",
      "x": 53.01,
      "y": 53.96,
      "w": 6.0,
      "h": 4.49
     },
     {
      "c": "RT 04",
      "t": "Convergencia de energía y datos",
      "x": 6.73,
      "y": 62.53,
      "w": 6.47,
      "h": 4.49
     },
     {
      "c": "CI 04",
      "t": "Nuevo orden mundial",
      "x": 53.22,
      "y": 64.2,
      "w": 6.0,
      "h": 4.49
     },
     {
      "c": "RT 05",
      "t": "El triunfo del algoritmo",
      "x": 6.73,
      "y": 72.93,
      "w": 6.47,
      "h": 4.49
     },
     {
      "c": "CI 05",
      "t": "Información es poder",
      "x": 53.4,
      "y": 77.15,
      "w": 6.0,
      "h": 4.49
     },
     {
      "c": "RT 06",
      "t": "Educación en ciencias",
      "x": 6.65,
      "y": 83.32,
      "w": 6.47,
      "h": 4.49
     }
    ]
   }
  ]
 },
 {
  "id": 2,
  "titulo": "Ingeniería empresarial",
  "temas": [
   {
    "n": 1,
    "titulo": "Modelación empresarial",
    "pos": "infografias/img/i2-t1-pos.png",
    "neg": "infografias/img/i2-t1-neg.png",
    "claves": [
     {
      "c": "PR 00",
      "t": "Diseño de empresas y organizaciones",
      "x": 24.62,
      "y": 13.21,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "OV 00",
      "t": "Octagrama de valor",
      "x": 17.27,
      "y": 38.82,
      "w": 6.85,
      "h": 4.49
     },
     {
      "c": "OC 00",
      "t": "Octagrama cerebral",
      "x": 53.46,
      "y": 39.15,
      "w": 6.81,
      "h": 4.49
     },
     {
      "c": "ME 00",
      "t": "Misión empresarial",
      "x": 13.85,
      "y": 60.55,
      "w": 7.1,
      "h": 4.49
     },
     {
      "c": "PE 00",
      "t": "Principios empresariales",
      "x": 14.37,
      "y": 71.84,
      "w": 6.44,
      "h": 4.49
     },
     {
      "c": "CE 00",
      "t": "Ciclos empresariales",
      "x": 14.37,
      "y": 82.63,
      "w": 6.47,
      "h": 4.49
     }
    ]
   },
   {
    "n": 2,
    "titulo": "Fundamentos y principios para la modelación empresarial",
    "pos": "infografias/img/i2-t2-pos.png",
    "neg": "infografias/img/i2-t2-neg.png",
    "claves": [
     {
      "c": "OV 00",
      "t": "Octagrama de valor",
      "x": 30.85,
      "y": 14.2,
      "w": 6.85,
      "h": 4.49
     },
     {
      "c": "PE 00",
      "t": "Principios empresariales",
      "x": 51.64,
      "y": 40.29,
      "w": 6.44,
      "h": 4.49
     },
     {
      "c": "ME 00",
      "t": "Misión empresarial",
      "x": 7.38,
      "y": 41.03,
      "w": 7.1,
      "h": 4.49
     },
     {
      "c": "PE 01",
      "t": "Capacidad para sobrevivir",
      "x": 51.74,
      "y": 52.38,
      "w": 6.44,
      "h": 4.49
     },
     {
      "c": "ME 01",
      "t": "Elemento de la misión: propósito",
      "x": 7.67,
      "y": 54.11,
      "w": 7.1,
      "h": 4.49
     },
     {
      "c": "PE 02",
      "t": "Capacidad para crecer",
      "x": 51.6,
      "y": 65.46,
      "w": 6.44,
      "h": 4.49
     },
     {
      "c": "ME 02",
      "t": "Elemento de la misión: alcance",
      "x": 7.67,
      "y": 69.49,
      "w": 7.1,
      "h": 4.49
     },
     {
      "c": "PE 03",
      "t": "Capacidad para rentar",
      "x": 51.52,
      "y": 78.33,
      "w": 6.44,
      "h": 4.49
     }
    ]
   },
   {
    "n": 3,
    "titulo": "Elementos para la planificación y diseño de empresas",
    "pos": "infografias/img/i2-t3-pos.png",
    "neg": "infografias/img/i2-t3-neg.png",
    "claves": [
     {
      "c": "CE 00",
      "t": "Ciclos empresariales",
      "x": 24.8,
      "y": 29.57,
      "w": 6.47,
      "h": 4.49
     },
     {
      "c": "RV 00",
      "t": "Rastreo del flujo de valor",
      "x": 5.83,
      "y": 40.57,
      "w": 6.62,
      "h": 4.49
     },
     {
      "c": "SG 00",
      "t": "Conectores sinérgicos",
      "x": 50.46,
      "y": 40.89,
      "w": 6.6,
      "h": 4.49
     },
     {
      "c": "RV 01",
      "t": "Valor segmentado",
      "x": 5.83,
      "y": 50.42,
      "w": 6.62,
      "h": 4.49
     },
     {
      "c": "SG 01",
      "t": "El valor de la innovación",
      "x": 50.07,
      "y": 52.15,
      "w": 6.6,
      "h": 4.49
     },
     {
      "c": "RV 02",
      "t": "Valor diferenciado",
      "x": 5.83,
      "y": 57.45,
      "w": 6.62,
      "h": 4.49
     },
     {
      "c": "SG 02",
      "t": "El valor del prestigio",
      "x": 50.34,
      "y": 61.84,
      "w": 6.6,
      "h": 4.49
     },
     {
      "c": "RV 03",
      "t": "Valor prometido",
      "x": 5.83,
      "y": 65.17,
      "w": 6.62,
      "h": 4.49
     },
     {
      "c": "RV 04",
      "t": "Valor suministrado",
      "x": 5.8,
      "y": 72.54,
      "w": 6.62,
      "h": 4.49
     },
     {
      "c": "SG 03",
      "t": "Procesos efectivos",
      "x": 49.95,
      "y": 72.74,
      "w": 6.6,
      "h": 4.49
     },
     {
      "c": "RV 05",
      "t": "Valor aprovechado",
      "x": 5.86,
      "y": 80.53,
      "w": 6.62,
      "h": 4.49
     },
     {
      "c": "SG 04",
      "t": "Mecánica financiera",
      "x": 49.84,
      "y": 82.72,
      "w": 6.6,
      "h": 4.49
     },
     {
      "c": "RV 06",
      "t": "Valor capturado",
      "x": 5.83,
      "y": 87.77,
      "w": 6.62,
      "h": 4.49
     }
    ]
   }
  ]
 },
 {
  "id": 3,
  "titulo": "Teoría y filosofía empresarial",
  "temas": [
   {
    "n": 1,
    "titulo": "Bases teóricas y filosóficas para la modelación",
    "pos": "infografias/img/i3-t1-pos.png",
    "neg": "infografias/img/i3-t1-neg.png",
    "claves": [
     {
      "c": "TV 00",
      "t": "Teoría del valor",
      "x": 11.7,
      "y": 24.05,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "TI 00",
      "t": "Teoría de la Información",
      "x": 52.67,
      "y": 24.05,
      "w": 5.91,
      "h": 4.49
     }
    ]
   },
   {
    "n": 2,
    "titulo": "Teoría del valor",
    "pos": "infografias/img/i3-t2-pos.png",
    "neg": "infografias/img/i3-t2-neg.png",
    "claves": [
     {
      "c": "TV 00",
      "t": "Teoría del valor",
      "x": 11.7,
      "y": 24.05,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "TV 01",
      "t": "Propósito universal de las empresas",
      "x": 8.46,
      "y": 38.6,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "TV 02",
      "t": "Valor primordial",
      "x": 9.07,
      "y": 48.35,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "TV 03",
      "t": "Ausencia de valor",
      "x": 9.07,
      "y": 58.09,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "TV 04",
      "t": "Valoración de la necesidad",
      "x": 9.3,
      "y": 67.52,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "TV 05",
      "t": "Valoración del recurso",
      "x": 9.3,
      "y": 77.77,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "TV 06",
      "t": "Cuantificación del valor económico",
      "x": 9.3,
      "y": 87.69,
      "w": 6.54,
      "h": 4.49
     }
    ]
   },
   {
    "n": 3,
    "titulo": "Teoría de la información",
    "pos": "infografias/img/i3-t3-pos.png",
    "neg": "infografias/img/i3-t3-neg.png",
    "claves": [
     {
      "c": "TI 00",
      "t": "Teoría de la Información",
      "x": 11.7,
      "y": 24.05,
      "w": 5.91,
      "h": 4.49
     },
     {
      "c": "TI 01",
      "t": "Acceso a la información",
      "x": 9.55,
      "y": 38.6,
      "w": 5.91,
      "h": 4.49
     },
     {
      "c": "TI 02",
      "t": "La nueva división del trabajo",
      "x": 9.07,
      "y": 48.35,
      "w": 5.91,
      "h": 4.49
     },
     {
      "c": "TI 03",
      "t": "Veracidad de la información",
      "x": 9.07,
      "y": 58.09,
      "w": 5.91,
      "h": 4.49
     },
     {
      "c": "TI 04",
      "t": "Uso de la información",
      "x": 9.3,
      "y": 67.52,
      "w": 5.91,
      "h": 4.49
     },
     {
      "c": "TI 05",
      "t": "La tiranía de las creencias",
      "x": 9.3,
      "y": 77.77,
      "w": 5.91,
      "h": 4.49
     },
     {
      "c": "TI 06",
      "t": "Creencias falsas",
      "x": 9.3,
      "y": 87.69,
      "w": 5.91,
      "h": 4.49
     }
    ]
   },
   {
    "n": 4,
    "titulo": "Bases filosóficas para la modelación de negocios",
    "pos": "infografias/img/i3-t4-pos.png",
    "neg": "infografias/img/i3-t4-neg.png",
    "claves": [
     {
      "c": "TE 01",
      "t": "Capacidad para realizar un trabajo",
      "x": 8.86,
      "y": 52.48,
      "w": 6.38,
      "h": 4.49
     },
     {
      "c": "XC 01",
      "t": "Capacidad para sufrir",
      "x": 50.45,
      "y": 52.82,
      "w": 7.19,
      "h": 4.49
     },
     {
      "c": "TE 02",
      "t": "Energizando el planeta",
      "x": 8.09,
      "y": 64.79,
      "w": 6.38,
      "h": 4.49
     },
     {
      "c": "XC 02",
      "t": "Concientizando el planeta",
      "x": 50.08,
      "y": 65.08,
      "w": 7.19,
      "h": 4.49
     },
     {
      "c": "TE 03",
      "t": "Conversión de los recursos",
      "x": 8.09,
      "y": 76.39,
      "w": 6.38,
      "h": 4.49
     },
     {
      "c": "XC 03",
      "t": "La persona consciente",
      "x": 50.45,
      "y": 76.64,
      "w": 7.19,
      "h": 4.49
     }
    ]
   }
  ]
 },
 {
  "id": 4,
  "titulo": "Ingeniería organizacional",
  "temas": [
   {
    "n": 1,
    "titulo": "Modelación organizacional",
    "pos": "infografias/img/i4-t1-pos.png",
    "neg": "infografias/img/i4-t1-neg.png",
    "claves": [
     {
      "c": "PR 00",
      "t": "Diseño de empresas y organizaciones",
      "x": 25.7,
      "y": 16.84,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "OV 00",
      "t": "Octagrama de valor",
      "x": 17.27,
      "y": 38.82,
      "w": 6.85,
      "h": 4.49
     },
     {
      "c": "OC 00",
      "t": "Octagrama cerebral",
      "x": 53.46,
      "y": 39.15,
      "w": 6.81,
      "h": 4.49
     },
     {
      "c": "OV 01",
      "t": "Econograma",
      "x": 11.12,
      "y": 69.79,
      "w": 6.85,
      "h": 4.49
     },
     {
      "c": "OC 01",
      "t": "Sociograma",
      "x": 57.76,
      "y": 69.79,
      "w": 6.81,
      "h": 4.49
     },
     {
      "c": "OC 02",
      "t": "Psicograma",
      "x": 58.22,
      "y": 80.09,
      "w": 6.81,
      "h": 4.49
     }
    ]
   },
   {
    "n": 2,
    "titulo": "Fundamentos y principios de los modelos organizacionales",
    "pos": "infografias/img/i4-t2-pos.png",
    "neg": "infografias/img/i4-t2-neg.png",
    "claves": [
     {
      "c": "SO 00",
      "t": "Sistema organizacional",
      "x": 50.81,
      "y": 40.29,
      "w": 6.65,
      "h": 4.49
     },
     {
      "c": "CO 00",
      "t": "Cultura organizacional",
      "x": 7.38,
      "y": 41.03,
      "w": 6.79,
      "h": 4.49
     },
     {
      "c": "SO 01",
      "t": "Diferenciación",
      "x": 51.52,
      "y": 52.29,
      "w": 6.65,
      "h": 4.49
     },
     {
      "c": "CO 01",
      "t": "Organización con propósito",
      "x": 7.38,
      "y": 53.15,
      "w": 6.79,
      "h": 4.49
     },
     {
      "c": "CO 02",
      "t": "Organización altruista",
      "x": 7.96,
      "y": 65.22,
      "w": 6.79,
      "h": 4.49
     },
     {
      "c": "SO 02",
      "t": "Interdependencia",
      "x": 51.6,
      "y": 65.46,
      "w": 6.65,
      "h": 4.49
     },
     {
      "c": "SO 03",
      "t": "Auto-organización",
      "x": 51.75,
      "y": 78.03,
      "w": 6.65,
      "h": 4.49
     },
     {
      "c": "CO 03",
      "t": "Organización moral",
      "x": 7.96,
      "y": 79.27,
      "w": 6.79,
      "h": 4.49
     }
    ]
   },
   {
    "n": 3,
    "titulo": "Formación del individuo: capacidad para actuar",
    "pos": "infografias/img/i4-t3-pos.png",
    "neg": "infografias/img/i4-t3-neg.png",
    "claves": [
     {
      "c": "NC 00",
      "t": "Naturaleza o crianza",
      "x": 47.48,
      "y": 46.55,
      "w": 6.77,
      "h": 4.49
     },
     {
      "c": "FC 00",
      "t": "Forja del carácter",
      "x": 18.5,
      "y": 46.82,
      "w": 6.38,
      "h": 4.49
     },
     {
      "c": "FC 01",
      "t": "Volición",
      "x": 11.7,
      "y": 60.57,
      "w": 6.38,
      "h": 4.49
     },
     {
      "c": "NC 01",
      "t": "Capacidad para relacionarse",
      "x": 53.38,
      "y": 60.96,
      "w": 6.77,
      "h": 4.49
     },
     {
      "c": "FC 02",
      "t": "Vitalidad",
      "x": 11.7,
      "y": 71.89,
      "w": 6.38,
      "h": 4.49
     },
     {
      "c": "NC 02",
      "t": "Capacidad para aprender",
      "x": 53.5,
      "y": 72.24,
      "w": 6.77,
      "h": 4.49
     },
     {
      "c": "FC 03",
      "t": "Apaciguamiento",
      "x": 11.65,
      "y": 83.21,
      "w": 6.38,
      "h": 4.49
     },
     {
      "c": "NC 03",
      "t": "Capacidad para sufrir",
      "x": 53.5,
      "y": 83.21,
      "w": 6.77,
      "h": 4.49
     }
    ]
   },
   {
    "n": 4,
    "titulo": "Formación del individuo: capacidad para pensar",
    "pos": "infografias/img/i4-t4-pos.png",
    "neg": "infografias/img/i4-t4-neg.png",
    "claves": [
     {
      "c": "CV 00",
      "t": "Conocimiento verdadero",
      "x": 11.82,
      "y": 39.14,
      "w": 6.63,
      "h": 4.49
     },
     {
      "c": "CV 03",
      "t": "Pensamiento crítico",
      "x": 56.87,
      "y": 46.68,
      "w": 6.63,
      "h": 4.49
     },
     {
      "c": "CV 04",
      "t": "Pensamiento motivado",
      "x": 57.0,
      "y": 59.4,
      "w": 6.63,
      "h": 4.49
     },
     {
      "c": "CV 01",
      "t": "Aprehensión de la realidad",
      "x": 17.29,
      "y": 60.85,
      "w": 6.63,
      "h": 4.49
     },
     {
      "c": "CV 05",
      "t": "Pensamiento científico",
      "x": 56.87,
      "y": 72.85,
      "w": 6.63,
      "h": 4.49
     },
     {
      "c": "CV 02",
      "t": "La era de la posverdad",
      "x": 17.29,
      "y": 73.04,
      "w": 6.63,
      "h": 4.49
     }
    ]
   }
  ]
 },
 {
  "id": 5,
  "titulo": "Fenómenos empresariales",
  "temas": [
   {
    "n": 1,
    "titulo": "Fenómenos socio-económicos",
    "pos": "infografias/img/i5-t1-pos.png",
    "neg": "infografias/img/i5-t1-neg.png",
    "claves": [
     {
      "c": "FE 00",
      "t": "Fenómenos empresariales",
      "x": 26.97,
      "y": 22.0,
      "w": 6.31,
      "h": 4.49
     },
     {
      "c": "SE 01",
      "t": "Hábitos del pensamiento",
      "x": 11.45,
      "y": 48.63,
      "w": 6.31,
      "h": 4.49
     },
     {
      "c": "SE 02",
      "t": "Inteligencia empresarial",
      "x": 11.45,
      "y": 63.85,
      "w": 6.31,
      "h": 4.49
     },
     {
      "c": "SE 03",
      "t": "Inteligencia colectiva",
      "x": 11.45,
      "y": 78.13,
      "w": 6.31,
      "h": 4.49
     }
    ]
   },
   {
    "n": 2,
    "titulo": "Fenómenos psico-sociales",
    "pos": "infografias/img/i5-t2-pos.png",
    "neg": "infografias/img/i5-t2-neg.png",
    "claves": [
     {
      "c": "FE 00",
      "t": "Fenómenos empresariales",
      "x": 26.97,
      "y": 22.0,
      "w": 6.31,
      "h": 4.49
     },
     {
      "c": "PS 01",
      "t": "Estrategias de cooperación",
      "x": 11.33,
      "y": 40.29,
      "w": 6.37,
      "h": 4.49
     },
     {
      "c": "PS 02",
      "t": "Cohesión social",
      "x": 10.83,
      "y": 50.45,
      "w": 6.37,
      "h": 4.49
     },
     {
      "c": "PS 03",
      "t": "Confianza social",
      "x": 10.67,
      "y": 60.82,
      "w": 6.37,
      "h": 4.49
     },
     {
      "c": "PS 04",
      "t": "Teoría de la estupidez humana",
      "x": 10.83,
      "y": 71.46,
      "w": 6.37,
      "h": 4.49
     },
     {
      "c": "PS 05",
      "t": "Conformidad social",
      "x": 10.97,
      "y": 81.99,
      "w": 6.37,
      "h": 4.49
     }
    ]
   },
   {
    "n": 3,
    "titulo": "Fenómenos psico-económicos",
    "pos": "infografias/img/i5-t3-pos.png",
    "neg": "infografias/img/i5-t3-neg.png",
    "claves": [
     {
      "c": "FE 00",
      "t": "Fenómenos empresariales",
      "x": 27.06,
      "y": 26.12,
      "w": 6.31,
      "h": 4.49
     },
     {
      "c": "FE 01",
      "t": "Racionalización",
      "x": 11.33,
      "y": 53.3,
      "w": 6.44,
      "h": 4.49
     },
     {
      "c": "FE 02",
      "t": "Miopía probabilística",
      "x": 11.15,
      "y": 64.0,
      "w": 6.44,
      "h": 4.49
     },
     {
      "c": "FE 03",
      "t": "Sesgos cognitivos",
      "x": 11.15,
      "y": 74.5,
      "w": 6.44,
      "h": 4.49
     }
    ]
   }
  ]
 },
 {
  "id": 6,
  "titulo": "Fenómenos organizacionales",
  "temas": [
   {
    "n": 1,
    "titulo": "Fenómenos de concienciación",
    "pos": "infografias/img/i6-t1-pos.png",
    "neg": "infografias/img/i6-t1-neg.png",
    "claves": [
     {
      "c": "MC 00",
      "t": "Modelos conductuales",
      "x": 30.04,
      "y": 32.1,
      "w": 7.19,
      "h": 4.49
     },
     {
      "c": "MC 03",
      "t": "Paciencia",
      "x": 51.8,
      "y": 44.17,
      "w": 7.15,
      "h": 4.49
     },
     {
      "c": "MC 01",
      "t": "Focalización",
      "x": 15.36,
      "y": 44.66,
      "w": 7.19,
      "h": 4.49
     },
     {
      "c": "MC 02",
      "t": "Determinismo",
      "x": 15.36,
      "y": 55.59,
      "w": 7.19,
      "h": 4.49
     },
     {
      "c": "MC 04",
      "t": "Temeridad",
      "x": 51.8,
      "y": 55.59,
      "w": 7.19,
      "h": 4.49
     }
    ]
   },
   {
    "n": 2,
    "titulo": "Fenómenos de afiliación",
    "pos": "infografias/img/i6-t2-pos.png",
    "neg": "infografias/img/i6-t2-neg.png",
    "claves": [
     {
      "c": "RR 00",
      "t": "Relaciones de reciprocidad",
      "x": 53.58,
      "y": 42.44,
      "w": 6.6,
      "h": 4.49
     },
     {
      "c": "RC 00",
      "t": "Relaciones de civilidad",
      "x": 16.04,
      "y": 42.55,
      "w": 6.56,
      "h": 4.49
     },
     {
      "c": "RC 01",
      "t": "Condición de igualdad",
      "x": 15.59,
      "y": 58.81,
      "w": 6.56,
      "h": 4.49
     },
     {
      "c": "RR 01",
      "t": "Colaboración para el comercio",
      "x": 53.58,
      "y": 58.99,
      "w": 6.6,
      "h": 4.49
     },
     {
      "c": "RC 02",
      "t": "Condición de libertad",
      "x": 15.49,
      "y": 70.05,
      "w": 6.56,
      "h": 4.49
     },
     {
      "c": "RR 02",
      "t": "Colaboración para la sinergia",
      "x": 53.58,
      "y": 70.11,
      "w": 6.6,
      "h": 4.49
     },
     {
      "c": "RC 03",
      "t": "Condición de justicia",
      "x": 15.44,
      "y": 79.56,
      "w": 6.56,
      "h": 4.49
     }
    ]
   },
   {
    "n": 3,
    "titulo": "Fenómenos de influencia",
    "pos": "infografias/img/i6-t3-pos.png",
    "neg": "infografias/img/i6-t3-neg.png",
    "claves": [
     {
      "c": "RP 00",
      "t": "Relaciones de autoridad",
      "x": 32.23,
      "y": 43.61,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "RP 01",
      "t": "El problema del poder",
      "x": 13.55,
      "y": 56.99,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "RP 03",
      "t": "Liderazgo transformador",
      "x": 55.78,
      "y": 56.99,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "RP 02",
      "t": "Liderazgos extremos",
      "x": 13.71,
      "y": 70.19,
      "w": 6.54,
      "h": 4.49
     },
     {
      "c": "RP 04",
      "t": "Liderazgo para la colaboración",
      "x": 55.32,
      "y": 70.87,
      "w": 6.54,
      "h": 4.49
     }
    ]
   }
  ]
 }
];

/* ─── Los módulos que ya llegaron ─────────────────────────────────────────────
   La clave manda, no la infografía: un módulo que sale en varias infografías,
   como PR 00, se abre igual desde todas. Cada PowerPoint de Guillermo se
   convierte a PDF y se agrega aquí; los que todavía no llegan simplemente no
   están en la lista.
   ───────────────────────────────────────────────────────────────────────────── */

const INFO_VERSION = '20260830a';

const MODULOS = {
 "PR 00": { "pdf": "infografias/modulos/pr-00.pdf", "titulo": "Diseño de empresas y organizaciones", "laminas": 29 },
 "PR 01": { "pdf": "infografias/modulos/pr-01.pdf", "titulo": "Elementos para modelar empresas",     "laminas": 45 },
 "PR 02": { "pdf": "infografias/modulos/pr-02.pdf", "titulo": "Recursos para modelar organizaciones", "laminas": 36 }
};

/* Cuántos módulos de un tema ya se pueden abrir. */
function infoListos(tema) {
    return tema.claves.filter(function (k) { return MODULOS[k.c]; }).length;
}

/* Lo mismo para una infografía entera, sin contar dos veces un módulo que sale
   en varios de sus temas. */
function infoListosInfografia(inf) {
    var vistos = {};
    inf.temas.forEach(function (t) {
        t.claves.forEach(function (k) { if (MODULOS[k.c]) vistos[k.c] = 1; });
    });
    return Object.keys(vistos).length;
}

/* Estado del visor: qué infografía está abierta, en qué tema y de qué lado. */
let infoAbierta = null;   // índice dentro de INFOGRAFIAS, o null si está el índice
let infoTema    = 0;      // índice del tema dentro de la infografía
let infoLado    = 'pos';  // 'pos' (a color) o 'neg' (con claves)

function infoTotalModulos(inf) {
    return inf.temas.reduce(function (n, t) { return n + t.claves.length; }, 0);
}

function infoPlural(n, uno, varios) {
    return n + ' ' + (n === 1 ? uno : varios);
}

/* ─── Índice: las 7 infografías ───────────────────────────────────────────── */

function infoPintarIndice() {
    infoAbierta = null;
    var cont = document.getElementById('info-cuerpo');
    if (!cont) return;

    cont.innerHTML =
        '<div class="info-rejilla">' +
        INFOGRAFIAS.map(function (inf, i) {
            return '<button type="button" class="info-tarjeta" onclick="infoAbrir(' + i + ')">' +
                       '<span class="info-tarjeta-lamina">' +
                           '<img src="' + inf.temas[0].pos + '" alt="" loading="lazy">' +
                       '</span>' +
                       '<span class="info-tarjeta-pie">' +
                           '<span class="info-tarjeta-num">' + inf.id + '</span>' +
                           '<span class="info-tarjeta-tit">' + inf.titulo + '</span>' +
                           '<span class="info-tarjeta-dato">' +
                               infoPlural(inf.temas.length, 'tema', 'temas') + ' · ' +
                               infoPlural(infoTotalModulos(inf), 'módulo', 'módulos') +
                               (infoListosInfografia(inf)
                                   ? '<b class="info-tarjeta-listos">' +
                                         infoListosInfografia(inf) +
                                         (infoListosInfografia(inf) === 1
                                             ? ' ya se abre' : ' ya se abren') +
                                     '</b>'
                                   : '') +
                           '</span>' +
                       '</span>' +
                   '</button>';
        }).join('') +
        '</div>';
}

/* ─── Una infografía abierta ──────────────────────────────────────────────── */

function infoAbrir(i, tema) {
    infoAbierta = i;
    infoTema = tema || 0;
    infoLado = 'pos';
    infoPintarVisor();
    var cont = document.getElementById('info-cuerpo');
    if (cont) cont.scrollIntoView({ block: 'start', behavior: 'smooth' });
}

function infoPintarVisor() {
    var inf  = INFOGRAFIAS[infoAbierta];
    var tema = inf.temas[infoTema];
    var cont = document.getElementById('info-cuerpo');

    var pestanas = inf.temas.map(function (t, n) {
        return '<button type="button" class="info-pest' + (n === infoTema ? ' activa' : '') + '" ' +
                       'onclick="infoIrTema(' + n + ')">' +
                   '<span class="info-pest-num">' + (n + 1) + '</span>' + t.titulo +
               '</button>';
    }).join('');

    cont.innerHTML =
        '<div class="info-visor">' +
            '<button type="button" class="info-volver" onclick="infoPintarIndice()">' +
                '<i class="fas fa-arrow-left"></i> Las 7 infografías' +
            '</button>' +

            '<h3 class="info-visor-tit">' +
                '<span class="info-visor-num">' + inf.id + '</span>' + inf.titulo +
            '</h3>' +

            '<div class="info-pests">' + pestanas + '</div>' +

            '<div class="info-lamina-cab">' +
                '<div class="info-lamina-tit">' +
                    '<span class="info-lamina-etq">Tema ' + (infoTema + 1) + ' de ' + inf.temas.length + '</span>' +
                    tema.titulo +
                '</div>' +
                '<div class="info-lados" role="group" aria-label="Lado de la lámina">' +
                    '<button type="button" class="info-lado' + (infoLado === 'pos' ? ' activo' : '') + '" ' +
                            'onclick="infoIrLado(&quot;pos&quot;)">' +
                        '<i class="fas fa-diagram-project"></i> Relaciones' +
                    '</button>' +
                    '<button type="button" class="info-lado' + (infoLado === 'neg' ? ' activo' : '') + '" ' +
                            'onclick="infoIrLado(&quot;neg&quot;)">' +
                        '<i class="fas fa-list-ol"></i> Nomenclatura' +
                    '</button>' +
                '</div>' +
            '</div>' +

            '<div class="info-lamina' + (infoLado === 'neg' ? ' con-claves' : '') + '">' +
                '<img src="' + tema[infoLado] + '" alt="' + tema.titulo +
                     ', lado ' + (infoLado === 'pos' ? 'positivo' : 'negativo') + '">' +
                (infoLado === 'neg' ? infoHotspots(tema) : '') +
            '</div>' +

            '<p class="info-ayuda">' +
                (infoLado === 'pos'
                    ? '<i class="fas fa-palette"></i> Lado positivo: los módulos con sus relaciones ' +
                      'conceptuales, a color. Cambie a <b>Nomenclatura</b> para ver las claves y ' +
                      'abrir cada módulo.'
                    : '<i class="fas fa-hand-pointer"></i> Lado negativo: pique cualquier clave para ' +
                      'abrir su módulo. Este tema tiene ' +
                      infoPlural(tema.claves.length, 'módulo', 'módulos') + ', ' +
                      (infoListos(tema) === 0
                          ? 'todos por llegar.'
                          : infoListos(tema) + ' ya se ' +
                            (infoListos(tema) === 1 ? 'puede abrir' : 'pueden abrir') +
                            ' y se marcan en verde.')) +
            '</p>' +

            '<div class="info-pasos">' +
                '<button type="button" class="info-paso" onclick="infoSaltar(-1)"' +
                    (infoTema === 0 ? ' disabled' : '') + '>' +
                    '<i class="fas fa-chevron-left"></i> Tema anterior' +
                '</button>' +
                '<button type="button" class="info-paso" onclick="infoSaltar(1)"' +
                    (infoTema === inf.temas.length - 1 ? ' disabled' : '') + '>' +
                    'Tema siguiente <i class="fas fa-chevron-right"></i>' +
                '</button>' +
            '</div>' +
        '</div>';
}

/* Los botones invisibles que van encima de la lámina. El recuadro se ensancha
   un poco para que la clave sea fácil de picar también con el dedo. */
function infoHotspots(tema) {
    return tema.claves.map(function (k, n) {
        var x = Math.max(0, k.x - 0.6);
        var y = Math.max(0, k.y - 0.6);
        var w = Math.min(100 - x, k.w + 1.2);
        var h = Math.min(100 - y, k.h + 1.2);
        var listo = !!MODULOS[k.c];
        var rotulo = k.c + (k.t ? ' · ' + k.t : '');
        return '<button type="button" class="info-clave' + (listo ? ' listo' : '') + '" ' +
                       'style="left:' + x + '%;top:' + y + '%;width:' + w + '%;height:' + h + '%" ' +
                       'aria-label="' + (listo ? 'Abrir' : 'Ver') + ' el módulo ' + rotulo +
                           (listo ? '' : ', todavía por llegar') + '" ' +
                       'onclick="infoModulo(' + infoAbierta + ',' + infoTema + ',' + n + ')">' +
                   '<span class="info-clave-tip">' + rotulo + '</span>' +
               '</button>';
    }).join('');
}

function infoIrTema(n) {
    infoTema = n;
    infoLado = 'pos';
    infoPintarVisor();
}

function infoIrLado(lado) {
    infoLado = lado;
    infoPintarVisor();
}

function infoSaltar(paso) {
    var inf = INFOGRAFIAS[infoAbierta];
    var n = infoTema + paso;
    if (n < 0 || n >= inf.temas.length) return;
    infoIrTema(n);
}

/* ─── La ventanita del módulo ─────────────────────────────────────────────── */

function infoModulo(i, t, n) {
    var k = INFOGRAFIAS[i].temas[t].claves[n];

    /* Si el módulo ya llegó, se abre en el visor de PDF, el mismo de Génesis
       del Octagrama, sin salir del portal y sin descargar nada. */
    var mod = MODULOS[k.c];
    if (mod && typeof window.openPdfViewer === 'function') {
        openPdfViewer(mod.pdf + '?v=' + INFO_VERSION,
                      k.c + ' · ' + (mod.titulo || k.t || ''),
                      'fa-file-powerpoint');
        return;
    }

    var modal = document.getElementById('info-modal');
    document.getElementById('info-modal-clave').textContent = k.c;
    document.getElementById('info-modal-tit').textContent = k.t || ('Módulo ' + k.c);
    document.getElementById('info-modal-ruta').textContent =
        INFOGRAFIAS[i].titulo + ' · ' + INFOGRAFIAS[i].temas[t].titulo;
    modal.classList.add('abierto');
    document.body.style.overflow = 'hidden';
}

function infoCerrarModulo() {
    document.getElementById('info-modal').classList.remove('abierto');
    document.body.style.overflow = '';
}

/* ─── Arranque ────────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('info-cuerpo')) infoPintarIndice();

    document.addEventListener('keydown', function (e) {
        var modal = document.getElementById('info-modal');
        if (modal && modal.classList.contains('abierto')) {
            if (e.key === 'Escape') infoCerrarModulo();
            return;
        }
        var seccion = document.getElementById('infografias');
        if (!seccion || !seccion.classList.contains('active') || infoAbierta === null) return;
        if (e.key === 'ArrowRight') infoSaltar(1);
        if (e.key === 'ArrowLeft')  infoSaltar(-1);
    });
});
