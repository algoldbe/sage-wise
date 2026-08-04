/* =============================================================================
   MODELO OCTAGRAMAL - Sage-Wise
   Datos oficiales tomados de:
     · TEXTOS OCTAGRAMA DE VALOR.pptx   (octágono superior)
     · TEXTOS OCTAGRAMA CEREBRAL.pptx   (octágono inferior)

   Nombres de los procesos y correcciones de los lados tomados de:
     · PROCESOS EN EL OCTAGRAMA DE VALOR.pptx  (Guillermo, 29-jul-2026)

   Geometría (confirmada con los diagramas de los PPT):
     · El vértice 1 ocupa el extremo inferior del lado vertical derecho.
     · La numeración avanza en sentido ANTIHORARIO.
     · El lado N conecta el vértice N con el vértice N+1.
     · El proceso N cruza el octágono entre el vértice N y el vértice N+3.
       Los ocho cruces trazan la estrella {8/3} de un solo trazo, que es lo
       que convierte al octágono en octagrama.
     · En el Octagrama de Valor los 8 lados y los 8 cruces son, todos, PROCESOS,
       y se agrupan en cuatro ciclos cerrados de cuatro procesos cada uno.
     · Un lado no se dibuja tendido entre dos vértices sino como «semi lado»:
       media arista rematada en punta, apuntando al vértice que le corresponde.
       En el de Valor, aquél al que va el proceso; en el Cerebral, el gerente
       dueño de ese mercado, porque el mercado es de uno solo.
     · En el Octagrama Cerebral no hay procesos: los lados son los MERCADOS de
       cada gerente y los cruces son RELACIONES entre las personas, que conectan
       a todos con todos.
   ========================================================================== */

// ─── Perfiles MBTI (modal) ───────────────────────────────────────────────────
const mbtiInfo = {
    'ENFJ': {
        nombre: 'El Protagonista',
        descripcion: 'Líderes carismáticos e inspiradores que guían mediante el ejemplo. Son empáticos, organizados y orientados a las personas, con una habilidad natural para comunicar y motivar equipos hacia una visión compartida.',
        fortalezas: 'Liderazgo empático · Comunicación efectiva · Orientación a metas · Construcción de relaciones',
        desafios: 'Puede ser demasiado altruista · Dificultad para tomar decisiones impopulares'
    },
    'ESTJ': {
        nombre: 'El Ejecutivo',
        descripcion: 'Organizadores eficientes y directivos naturales. Valoran el orden, la tradición y la eficiencia. Son decisivos, confiables y excelentes para implementar procesos y sistemas que funcionen.',
        fortalezas: 'Organización · Liderazgo directivo · Cumplimiento · Eficiencia operativa',
        desafios: 'Puede ser inflexible · Dificultad para considerar perspectivas no convencionales'
    },
    'INTP': {
        nombre: 'El Lógico',
        descripcion: 'Pensadores analíticos con una sed insaciable de conocimiento. Brillan en el análisis de sistemas complejos y la generación de ideas innovadoras. Prefieren la lógica y la objetividad sobre las emociones.',
        fortalezas: 'Análisis profundo · Pensamiento original · Resolución de problemas complejos · Objetividad',
        desafios: 'Puede parecer distante · Dificultad para comunicar ideas a audiencias no técnicas'
    },
    'INFP': {
        nombre: 'El Mediador',
        descripcion: 'Idealistas creativos guiados por sus valores. Son empáticos, adaptables y apasionados por causas que les importan. Tienen una visión única y profunda de las personas y situaciones.',
        fortalezas: 'Creatividad · Empatía · Adaptabilidad · Valores sólidos · Visión humanista',
        desafios: 'Puede ser demasiado idealista · Dificultad con el pensamiento práctico a corto plazo'
    },
    'ESTP': {
        nombre: 'El Emprendedor',
        descripcion: 'Pragmáticos y orientados a la acción inmediata. Son observadores agudos, hábiles negociadores y brillan en situaciones de crisis. Prefieren la acción sobre la teoría.',
        fortalezas: 'Acción rápida · Negociación · Adaptabilidad · Pensamiento práctico · Energía',
        desafios: 'Puede ser impulsivo · Dificultad para planificación a largo plazo'
    },
    'ISTJ': {
        nombre: 'El Logístico',
        descripcion: 'Prácticos y metódicos, son el pilar de la confiabilidad organizacional. Tienen un fuerte sentido del deber, son detallistas y excelentes para mantener sistemas y procesos funcionando correctamente.',
        fortalezas: 'Confiabilidad · Atención al detalle · Metodología · Compromiso · Análisis',
        desafios: 'Puede resistir el cambio · Dificultad con situaciones ambiguas'
    },
    'ENFP': {
        nombre: 'El Activista',
        descripcion: 'Espíritus libres creativos y sociables. Ven el potencial en cada persona y situación. Son entusiastas, imaginativos y conectan ideas y personas de formas únicas e inesperadas.',
        fortalezas: 'Creatividad · Entusiasmo · Conexión interpersonal · Visión optimista · Comunicación',
        desafios: 'Puede dispersarse · Dificultad para mantener foco en detalles rutinarios'
    },
    'ISTP': {
        nombre: 'El Virtuoso',
        descripcion: 'Artesanos ingeniosos que aprenden haciendo. Son observadores calmos, excelentes en resolver problemas prácticos y en el análisis de cómo funcionan los sistemas desde adentro.',
        fortalezas: 'Resolución práctica · Análisis técnico · Independencia · Adaptabilidad · Lógica',
        desafios: 'Puede ser reservado · Dificultad para comprometerse con estructuras rígidas'
    }
};

/* ─── Perfiles caracterológicos: el círculo partido en cuadrantes ─────────────
   Guillermo pidió que en el plano del Octagrama Cerebral el círculo de cada
   vértice se divida en cuadrantes coloreados, uno por cada rasgo del perfil
   caracterológico, para que los ocho perfiles se distingan de un vistazo.

   Cada cuadrante corresponde a una de las cuatro preguntas que ya trae cada
   gerente en su ficha (`qa`), y toma color según su respuesta. Las cuatro
   letras salen del código de cuatro caracteres del perfil: la primera dice de
   dónde saca su energía, la segunda con qué elementos resuelve, la tercera qué
   resultados valora y la cuarta qué modo de vivir prefiere.

   Se leen en el sentido de las manecillas empezando arriba a la izquierda, en
   el mismo orden en que aparecen las preguntas en la ficha.
   -------------------------------------------------------------------------- */
const CUADRANTES = [
    {
        clave: 'Energía', pregunta: '¿De dónde extrae su energía?',
        polos: {
            E: { nombre: 'Exterior', color: '#e07b39' },
            I: { nombre: 'Interior', color: '#f3c9a6' }
        }
    },
    {
        clave: 'Elementos', pregunta: '¿Con qué elementos resuelve?',
        polos: {
            S: { nombre: 'Datos duros', color: '#2f9e8f' },
            N: { nombre: 'Ideas', color: '#a3d9d1' }
        }
    },
    {
        clave: 'Resultados', pregunta: '¿Qué resultados valora?',
        polos: {
            T: { nombre: 'Racionalidad', color: '#7b5ea7' },
            F: { nombre: 'Empatía', color: '#c8b6e2' }
        }
    },
    {
        clave: 'Modo de vivir', pregunta: '¿Qué modo de vivir prefiere?',
        polos: {
            J: { nombre: 'Orden', color: '#4f9d5d' },
            P: { nombre: 'Apertura', color: '#aed6b4' }
        }
    }
];

// Los cuatro cuadrantes de un gerente, ya resueltos a letra, nombre y color
function cuadrantesDe(datos) {
    const codigo = (datos && datos.mbti) || '';
    return CUADRANTES.map(function (c, k) {
        const letra = codigo.charAt(k);
        const polo = c.polos[letra] || { nombre: '', color: '#d5dbe4' };
        return { letra: letra, clave: c.clave, pregunta: c.pregunta, nombre: polo.nombre, color: polo.color };
    });
}

// Tinta legible sobre un fondo dado (los polos claros piden texto oscuro)
function tintaSobre(hex) {
    const n = parseInt(hex.slice(1), 16);
    const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
    return lum > 0.62 ? '#2b3a4d' : '#ffffff';
}

// ─── Datos del modelo ────────────────────────────────────────────────────────
const OCTAGRAMAS = {
    1: {
        id: 1,
        key: 'valor',
        nombre: 'Octagrama de Valor',
        subtitulo: 'Procesos que generan valor',
        centro: 'VALOR',
        color: '#c0392b',
        colorSuave: '#f6e4e1',
        hex: 0xc0392b,
        hexOscuro: 0x7d1f14,
        vertices: [
            {
                n: 1, nombre: 'Satisfacción',
                pregunta: '¿Cuáles son las expectativas y/o especificaciones del cliente?',
                escala: ['Provecho utilitario: necesidad básica.', 'Provecho suntuario: necesidad de estatus.'],
                gradiente: 'Más deseable → Más valor',
                desc: 'La <strong>satisfacción</strong> la experimenta un cliente deleitado que ha maximizado su provecho con el goce del producto o servicio que se le han suministrado. Al cumplirse sus expectativas, el cliente que goza del bien seguramente estará dispuesto a pagar un sobreprecio por el <em>usufructo de su valor</em>.'
            },
            {
                n: 2, nombre: 'Personalización',
                pregunta: '¿Qué tan específica es la necesidad?',
                escala: ['NICHO: Muy específica, casi individualizada.', 'AMPLIADA: Generalizada, casi global.'],
                gradiente: 'Más específica → Más valor',
                desc: 'La <strong>personalización</strong> es la individualización de la necesidad, es decir, que un segmento de clientes pueda ordenar un producto o servicio que se ajuste perfectamente a sus preferencias. Los sectores de negocios, por tanto, serán distintos según el <em>segmento</em>.'
            },
            {
                n: 3, nombre: 'Exclusividad',
                pregunta: '¿Qué tan diferenciado está el satisfactor?',
                escala: ['ESPECIALIDAD: Muchos atributos novedosos.', 'COMMODITY: Todos son iguales.'],
                gradiente: 'Más diferenciado → Más valor',
                desc: 'La <strong>exclusividad</strong> es el resultado de una tecnología o <em>know how</em>, con los que se han desarrollado productos o procesos innovadores y servicios de difícil imitación con los que puede lograrse una <em>diferenciación</em> ventajosa de la oferta de los competidores.'
            },
            {
                n: 4, nombre: 'Prestigio',
                pregunta: '¿Qué tan reconocida es la marca?',
                escala: ['Conocimiento de la marca.'],
                gradiente: 'Más conocida → Más valor',
                desc: 'El <strong>prestigio</strong> es la buena reputación que se logra por la confianza y credibilidad en la marca. Es también un factor de diferenciación y se alcanza en la medida que se cumple cabal y sostenidamente una <em>promesa de valor</em>.'
            },
            {
                n: 5, nombre: 'Logística',
                pregunta: '¿Qué tan efectivos son los canales?',
                escala: ['Relación costo-beneficio.'],
                gradiente: 'Más efectivos → Más valor',
                desc: 'Una <strong>logística</strong> efectiva se basa en una cadena de suministro que garantiza el abasto de los satisfactores y <em>entrega el valor</em> en el menor tiempo y en las mejores condiciones.'
            },
            {
                n: 6, nombre: 'Informática',
                pregunta: '¿Cómo están los sistemas de información?',
                escala: ['ESTRUCTURAS INDIVIDUALIZADAS: PC’s.', 'ESTRUCTURAS COMPARTIDAS: Redes.'],
                gradiente: 'Más compartidas → Más valor',
                desc: 'Una <strong>informática</strong> efectiva pone a la disposición del cliente <em>información</em> veraz y oportuna para ubicar sus pedidos, y proporciona a la organización los datos necesarios para monitorear el desempeño del negocio y tomar decisiones.'
            },
            {
                n: 7, nombre: 'Talento',
                pregunta: '¿Cómo se aprovecha el talento?',
                escala: ['ORGANIZACIÓN INDIVIDUALISTA: Expertos.', 'ORGANIZACIÓN COOPERADORA: Aprendices.'],
                gradiente: 'Más aprendizaje → Más valor',
                desc: 'El <strong>talento</strong> es contar con un capital humano capaz y comprometido con el aprendizaje continuo. El recurso humano es prestado y el valor que agrega al combinarse con otros recursos puede ser inmenso si se traduce en <em>inteligencia colectiva</em> por medio del aprendizaje continuo.'
            },
            {
                n: 8, nombre: 'Rendimiento',
                pregunta: '¿Qué tan productivos son los recursos?',
                escala: ['Rendimiento de la inversión (ROI).'],
                gradiente: 'Más productivos → Más valor',
                desc: 'El <strong>rendimiento de la inversión</strong> es haber alcanzado una tasa de uso muy alta de los recursos empleados, al aplicar aquéllas palancas financieras y operativas que balancean perfectamente riesgo y rentabilidad. Con un bajo costo y un alto precio, se <em>captura</em> el mayor valor posible.'
            }
        ],
        lados: [
            {
                n: 1, nombre: 'Experiencia del cliente', ciclo: 3, de: 2, a: 1,
                desc: 'El <strong>vínculo</strong> entre personalización y satisfacción es la <em>experiencia del cliente</em>, quien goza del bien suministrado y ve cumplidas sus expectativas.'
            },
            {
                n: 2, nombre: 'Creación de cuasi-monopolios temporales', alias: 'Portafolio de negocios', ciclo: 2, de: 2, a: 3,
                desc: 'Un sector de negocio emerge cuando se empata una necesidad segmentada con un satisfactor diferenciado, y mientras nadie lo imita la empresa goza de un <strong>cuasi-monopolio temporal</strong>. El conjunto de esos sectores forma el <em>portafolio de negocios</em>, que conviene mantener bien posicionado en mercados atractivos.'
            },
            {
                n: 3, nombre: 'Desarrollo de prototipos', ciclo: 4, de: 3, a: 4,
                desc: 'El <strong>vínculo</strong> entre innovación (I&amp;D) y prestigio (MKT) es el <em>desarrollo de prototipos</em> que prueben ser comercialmente viables.'
            },
            {
                n: 4, nombre: 'Contratación del valor', alias: 'Propuesta de valor', ciclo: 1, de: 5, a: 4,
                desc: 'Una negociación ganar-ganar alinea la promesa y la entrega de valor por medio de un <strong>contrato</strong> de compra-venta en el que se especifican los requisitos de calidad y costo que han de cumplirse. La negociación se lleva a cabo no sólo con los clientes, sino con <em>todos los grupos de interés</em> que aportan sus recursos.'
            },
            {
                n: 5, nombre: 'Abastecimiento de insumos', ciclo: 3, de: 6, a: 5,
                desc: 'El <strong>vínculo</strong> entre logística e informática son los procesos de <em>abastecimiento de los insumos</em> que requiere la empresa para cumplir con su misión. Este proceso capta asimismo la retroalimentación de los clientes para optimizar la cadena de suministro de valor.'
            },
            {
                n: 6, nombre: 'Generación de competencias organizacionales', alias: 'Organización competente', ciclo: 2, de: 6, a: 7,
                desc: 'Las <strong>competencias organizacionales</strong> emergen cuando se conecta la información con el conocimiento: sistemas de información efectivos que apoyan a gente capacitada. Se provee de información oportuna y confiable a personas y equipos de trabajo dispuestos a aprender.'
            },
            {
                n: 7, nombre: 'Asignación de recursos', ciclo: 4, de: 7, a: 8,
                desc: 'El <strong>vínculo</strong> entre rendimiento y talento es la <em>asignación de recursos</em> por medio de presupuestos realistas que especifican quién aporta las capacidades y en qué se aplican.'
            },
            {
                n: 8, nombre: 'Captura del valor', ciclo: 1, de: 1, a: 8,
                desc: 'La <strong>captura</strong> del mayor valor posible para el inversionista depende no sólo del valor agregado, sino también de las palancas que se han aplicado, equilibrando riesgo y rentabilidad. El cliente ya ha experimentado el valor prometido y ha satisfecho sus expectativas.'
            }
        ],
        procesos: [
            {
                n: 1, nombre: 'Apreciación del valor', ciclo: 1, de: 4, a: 1,
                desc: 'La <strong>apreciación del valor</strong> ocurre cuando el cliente confronta la promesa de la marca con el provecho que realmente obtuvo. Cruza del <em>prestigio</em> a la <em>satisfacción</em>: mientras mejor se cumple la promesa, mayor es el sobreprecio que el cliente está dispuesto a pagar.'
            },
            {
                n: 2, nombre: 'Gestión del suministro de valor', ciclo: 3, de: 5, a: 2,
                desc: 'La <strong>gestión del suministro de valor</strong> lleva el satisfactor desde la cadena de abasto hasta el segmento que lo pidió. Cruza de la <em>logística</em> a la <em>personalización</em> y es el proceso que asegura que lo entregado corresponda con lo que cada cliente ordenó.'
            },
            {
                n: 3, nombre: 'Identificación de oportunidades', ciclo: 2, de: 3, a: 6,
                desc: 'La <strong>identificación de oportunidades</strong> convierte la vigilancia tecnológica y de mercado en información aprovechable. Cruza de la <em>exclusividad</em> a la <em>informática</em>: lo que la empresa sabe hacer de manera distintiva se contrasta con los datos del entorno para descubrir dónde competir.'
            },
            {
                n: 4, nombre: 'Diseño de proyectos', ciclo: 4, de: 4, a: 7,
                desc: 'El <strong>diseño de proyectos</strong> traduce la promesa de valor en iniciativas con alcance, tiempos y responsables. Cruza del <em>prestigio</em> al <em>talento</em>: lo que la marca ofrece determina qué proyectos hay que emprender y qué capacidades hay que reunir para lograrlos.'
            },
            {
                n: 5, nombre: 'Costeo del valor', ciclo: 1, de: 8, a: 5,
                desc: 'El <strong>costeo del valor</strong> pone precio a cada eslabón de la cadena. Cruza del <em>rendimiento</em> a la <em>logística</em>: la exigencia de rentabilidad se traduce en una estructura de costos que la operación debe respetar para que el negocio cierre.'
            },
            {
                n: 6, nombre: 'Gestión de relaciones con los clientes', ciclo: 3, de: 1, a: 6,
                desc: 'La <strong>gestión de relaciones con los clientes</strong> recoge la experiencia del cliente y la devuelve a la organización. Cruza de la <em>satisfacción</em> a la <em>informática</em>: la retroalimentación se vuelve dato, y el dato, criterio para decidir.'
            },
            {
                n: 7, nombre: 'Desarrollo de capacidades', ciclo: 2, de: 7, a: 2,
                desc: 'El <strong>desarrollo de capacidades</strong> convierte el conocimiento de la gente en habilidad para atender necesidades cada vez más específicas. Cruza del <em>talento</em> a la <em>personalización</em>: sin capacidades desarrolladas no hay oferta que se ajuste a cada segmento.'
            },
            {
                n: 8, nombre: 'Organización de proyectos', ciclo: 4, de: 8, a: 3,
                desc: 'La <strong>organización de proyectos</strong> asigna equipos, plazos y recursos a los desarrollos en marcha. Cruza del <em>rendimiento</em> a la <em>exclusividad</em>: es el proceso que convierte el presupuesto aprobado en tecnología propia y en una oferta difícil de imitar.'
            }
        ],
        ciclos: [
            {
                n: 1, nombre: 'Ciclo de comercialización creativa', color: '#e67e22',
                desc: 'Cierra el trato con el cliente y recupera el valor: se costea lo que cuesta producirlo, se contrata lo que se promete, el cliente aprecia lo que recibió y la empresa captura el excedente.',
                ruta: [
                    { tipo: 'proceso', idx: 4 }, { tipo: 'lado', idx: 3 },
                    { tipo: 'proceso', idx: 0 }, { tipo: 'lado', idx: 7 }
                ]
            },
            {
                n: 2, nombre: 'Ciclo de inteligencia competitiva', color: '#8e44ad',
                desc: 'Explora el entorno y construye la ventaja: se identifican oportunidades, se generan competencias organizacionales, se desarrollan capacidades y se crean cuasi-monopolios temporales.',
                ruta: [
                    { tipo: 'proceso', idx: 2 }, { tipo: 'lado', idx: 5 },
                    { tipo: 'proceso', idx: 6 }, { tipo: 'lado', idx: 1 }
                ]
            },
            {
                n: 3, nombre: 'Ciclo de operación del negocio', color: '#2980b9',
                desc: 'Hace que el valor fluya día con día: se abastecen los insumos, se gestiona el suministro, el cliente vive la experiencia y su retroalimentación regresa por la relación con los clientes.',
                ruta: [
                    { tipo: 'lado', idx: 4 }, { tipo: 'proceso', idx: 1 },
                    { tipo: 'lado', idx: 0 }, { tipo: 'proceso', idx: 5 }
                ]
            },
            {
                n: 4, nombre: 'Ciclo de renovación del negocio', color: '#16a085',
                desc: 'Reinventa la oferta: se desarrollan prototipos, se diseñan los proyectos, se asignan los recursos y se organiza su ejecución.',
                ruta: [
                    { tipo: 'lado', idx: 2 }, { tipo: 'proceso', idx: 3 },
                    { tipo: 'lado', idx: 6 }, { tipo: 'proceso', idx: 7 }
                ]
            }
        ]
    },

    2: {
        id: 2,
        key: 'cerebral',
        nombre: 'Octagrama Cerebral',
        subtitulo: 'Roles que toman decisiones',
        centro: 'CEREBRAL',
        color: '#2563eb',
        colorSuave: '#e2ebfd',
        hex: 0x2563eb,
        hexOscuro: 0x14307d,
        vertices: [
            {
                n: 1, nombre: 'CSO', personaje: 'Vendedor', cargo: 'Chief Sales Officer',
                mbti: 'ENFJ', interes: 'Influencia', formula: 'E (4) R (2)', modo: 'Audaz',
                rasgo: 'Orientado por metas, solícito. Hábil comunicador.',
                qa: [
                    ['¿De dónde extrae su energía?', 'Del exterior.'],
                    ['¿Qué elementos usa para resolver problemas?', 'Elementos intangibles, datos suaves, ideas.'],
                    ['¿Qué resultados valora?', 'Expresar sus sentimientos y ayudar a otros. Usa la empatía.'],
                    ['¿Qué modo de vivir prefiere?', 'El orden y las cosas resueltas. Lo angustia la incongruencia.']
                ]
            },
            {
                n: 2, nombre: 'COO', personaje: 'Operador', cargo: 'Chief Operating Officer',
                mbti: 'ESTJ', interes: 'Afiliación', formula: 'E (3) R (4)', modo: 'Apasionado',
                rasgo: 'Decisivo, eficiente, a cargo del espectáculo.',
                qa: [
                    ['¿De dónde extrae su energía?', 'Del exterior.'],
                    ['¿Qué elementos usa para resolver problemas?', 'Elementos tangibles, datos duros, hechos.'],
                    ['¿Qué resultados valora?', 'Quiere tomar decisiones lógicas usando su inteligencia. Usa la racionalidad.'],
                    ['¿Qué modo de vivir prefiere?', 'El orden y las cosas resueltas. Lo angustia la incongruencia.']
                ]
            },
            {
                n: 3, nombre: 'CTO', personaje: 'Tecnólogo', cargo: 'Chief Technology Officer',
                mbti: 'INTP', interes: 'Investigación', formula: 'E (2) R (4)', modo: 'Sereno',
                rasgo: 'Imaginativo. Pensador original. Creativo.',
                qa: [
                    ['¿De dónde extrae su energía?', 'Del interior.'],
                    ['¿Qué elementos usa para resolver problemas?', 'Elementos intangibles, datos suaves, ideas.'],
                    ['¿Qué resultados valora?', 'Quiere tomar decisiones lógicas usando su inteligencia. Usa la racionalidad.'],
                    ['¿Qué modo de vivir prefiere?', 'Las opciones abiertas y las cosas desordenadas. Tolera un poco de caos.']
                ]
            },
            {
                n: 4, nombre: 'CMO', personaje: 'Mercadólogo', cargo: 'Chief Marketing Officer',
                mbti: 'INFP', interes: 'Investigación', formula: 'E (2) R (1)', modo: 'Afable',
                rasgo: 'Sensitivo, perceptivo, creativo, leal.',
                qa: [
                    ['¿De dónde extrae su energía?', 'Del interior.'],
                    ['¿Qué elementos usa para resolver problemas?', 'Elementos intangibles, datos suaves, ideas.'],
                    ['¿Qué resultados valora?', 'Expresar sus sentimientos y ayudar a otros. Usa la empatía.'],
                    ['¿Qué modo de vivir prefiere?', 'Las opciones abiertas y las cosas desordenadas. Tolera un poco de caos.']
                ]
            },
            {
                n: 5, nombre: 'CPO', personaje: 'Comprador', cargo: 'Chief Procurement Officer',
                mbti: 'ESTP', interes: 'Influencia', formula: 'E (3) R (1)', modo: 'Audaz',
                rasgo: 'Bombero. Hábil negociador.',
                qa: [
                    ['¿De dónde extrae su energía?', 'Del exterior.'],
                    ['¿Qué elementos usa para resolver problemas?', 'Elementos tangibles, datos duros, hechos.'],
                    ['¿Qué resultados valora?', 'Quiere tomar decisiones lógicas usando su inteligencia. Usa la racionalidad.'],
                    ['¿Qué modo de vivir prefiere?', 'Las opciones abiertas y las cosas desordenadas. Tolera un poco de caos.']
                ]
            },
            {
                n: 6, nombre: 'CIO', personaje: 'Informático', cargo: 'Chief Information Officer',
                mbti: 'ISTJ', interes: 'Análisis', formula: 'E (1) R (3)', modo: 'Sereno',
                rasgo: 'Práctico, analítico, reservado.',
                qa: [
                    ['¿De dónde extrae su energía?', 'Del interior.'],
                    ['¿Qué elementos usa para resolver problemas?', 'Elementos tangibles, datos duros, hechos.'],
                    ['¿Qué resultados valora?', 'Quiere tomar decisiones lógicas usando su inteligencia. Usa la racionalidad.'],
                    ['¿Qué modo de vivir prefiere?', 'El orden y las cosas resueltas. Lo angustia la incongruencia.']
                ]
            },
            {
                n: 7, nombre: 'CHO', personaje: 'Entrenador', cargo: 'Chief Human Resources Officer',
                mbti: 'ENFP', interes: 'Afiliación', formula: 'E (4) R (3)', modo: 'Apasionado',
                rasgo: 'Optimista, apoyador. Ve el potencial de otros.',
                qa: [
                    ['¿De dónde extrae su energía?', 'Del exterior.'],
                    ['¿Qué elementos usa para resolver problemas?', 'Elementos intangibles, datos suaves, ideas.'],
                    ['¿Qué resultados valora?', 'Expresar sus sentimientos y ayudar a otros. Usa la empatía.'],
                    ['¿Qué modo de vivir prefiere?', 'Las opciones abiertas y las cosas desordenadas. Tolera un poco de caos.']
                ]
            },
            {
                n: 8, nombre: 'CFO', personaje: 'Planificador', cargo: 'Chief Financial Officer',
                mbti: 'ISTP', interes: 'Análisis', formula: 'E (1) R (2)', modo: 'Afable',
                rasgo: 'Orientado por la acción. Lógico, independiente.',
                qa: [
                    ['¿De dónde extrae su energía?', 'Del interior.'],
                    ['¿Qué elementos usa para resolver problemas?', 'Elementos tangibles, datos duros, hechos.'],
                    ['¿Qué resultados valora?', 'Quiere tomar decisiones lógicas usando su inteligencia. Usa la racionalidad.'],
                    ['¿Qué modo de vivir prefiere?', 'Las opciones abiertas y las cosas desordenadas. Tolera un poco de caos.']
                ]
            }
        ],
        // Los «lados» del Cerebral no unen dos vértices: son el mercado propio de
        // cada gerente. Se dibujan como una flecha que sale de su vértice (`vertice`)
        // hacia afuera, y forman parte de su perfil funcional.
        lados: [
            {
                n: 1, nombre: 'Mercados de clientes', rol: 'CSO', vertice: 1,
                desc: 'El <strong>CSO</strong> interviene en los mercados de clientes, consumidores finales o intermedios, donde identifica las necesidades que la empresa puede atender y negocia los términos y condiciones para atenderlas. Obtiene retroalimentación de sus clientes para mejorar los procesos de suministro de valor.'
            },
            {
                n: 2, nombre: 'Mercados fabriles', rol: 'COO', vertice: 2,
                desc: 'El <strong>COO</strong> es el encargado de que las cosas sucedan en la organización. Si bien permanece la mayor parte del tiempo dentro de la empresa liderando grupos de trabajo, ocasionalmente atiende los mercados fabriles para conseguir equipo o refacciones y contratar el mantenimiento de los activos fijos de la empresa.'
            },
            {
                n: 3, nombre: 'Mercados tecnológicos', rol: 'CTO', vertice: 3,
                desc: 'El <strong>CTO</strong> interviene en los mercados tecnológicos, donde identifica las tecnologías de vanguardia aplicables a los prototipos que desarrolla la empresa o a sus procesos. Negocia acuerdos de licencia tecnológica, adjudicación de patentes, desarrollos de productos innovadores, entre otros.'
            },
            {
                n: 4, nombre: 'Mercados de medios', rol: 'CMO', vertice: 4,
                desc: 'El <strong>CMO</strong> interviene en los mercados de medios publicitarios, donde identifica la mejor manera de promover los productos y servicios de la empresa y de desarrollar una buena imagen de sus marcas. Lleva a cabo estudios de mercado para formular e implementar las estrategias de precio y cobertura de clientes.'
            },
            {
                n: 5, nombre: 'Mercados de proveedores', rol: 'CPO', vertice: 5,
                desc: 'El <strong>CPO</strong> interviene en los mercados de proveedores de insumos para la empresa. Es responsable de la estructura de costos primarios y negocia con los proveedores las mejores condiciones de entrega y plazos de pago.'
            },
            {
                n: 6, nombre: 'Mercados de TIC’s', rol: 'CIO', vertice: 6,
                desc: 'El <strong>CIO</strong> interviene en los mercados de tecnologías de información y comunicaciones para adquirir los sistemas informáticos que brinden las mejores herramientas para la toma de decisiones y el aprendizaje organizacional.'
            },
            {
                n: 7, nombre: 'Mercados laborales', rol: 'CHO', vertice: 7,
                desc: 'El <strong>CHO</strong> interviene en los mercados laborales para seleccionar y contratar a la mejor gente para la empresa. Es responsable de establecer los medios para aprovechar el talento del personal y de capacitarlo, así como de establecer métricas adecuadas para la evaluación del desempeño.'
            },
            {
                n: 8, nombre: 'Mercados financieros', rol: 'CFO', vertice: 8,
                desc: 'El <strong>CFO</strong> interviene en los mercados financieros, sea de capitales o de deuda, para obtener en las mejores condiciones posibles el dinero que requiere la empresa para financiar sus inversiones fijas y en capital de trabajo. Es responsable también de la cobranza.'
            }
        ]
    }
};

/* ─── Cruces del Octagrama Cerebral: relaciones, no procesos ──────────────────
   En el Cerebral los conectores no representan procesos, sino relaciones entre
   las personas que trabajan en la empresa. Pueden ser formales (las del
   organigrama) o informales, y en la práctica conectan a todos con todos: la
   malla completa se dibuja de fondo y estos ocho cruces son los seleccionables.
   -------------------------------------------------------------------------- */
OCTAGRAMAS[2].procesos = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    const i = n - 1;
    const a = OCTAGRAMAS[2].vertices[i];
    const b = OCTAGRAMAS[2].vertices[(i + 3) % 8];
    return {
        n: n,
        nombre: 'Relación ' + a.nombre + ' ↔ ' + b.nombre,
        desc: 'En el Octagrama Cerebral los cruces no son procesos, sino <strong>relaciones</strong> ' +
            'entre las personas que trabajan en la empresa. Éste enlaza al <strong>' + a.nombre +
            '</strong> (' + a.personaje.toLowerCase() + ') con el <strong>' + b.nombre +
            '</strong> (' + b.personaje.toLowerCase() + '). Las relaciones pueden ser <em>formales</em> ' +
            ', las que marca el organigrama, o <em>informales</em>, y en los hechos conectan a todos ' +
            'con todos: por ellas fluye la información con la que se toman las decisiones.'
    };
});

// Nombre corto de un vértice (en el Cerebral incluye el personaje)
function nombreVertice(cfg, i) {
    const v = cfg.vertices[i];
    return cfg.id === 2 ? v.nombre + ' · ' + v.personaje : v.nombre;
}

// Nombre a mostrar de un proceso / relación
function nombreProceso(cfg, i) {
    const pr = cfg.procesos[i];
    return pr.nombre || ('Proceso ' + pr.n);
}

// Descripción a mostrar de un proceso / relación
function descProceso(cfg, i) {
    return cfg.procesos[i].desc || '';
}

/* ─── Cómo se llama cada cosa en cada octagrama ───────────────────────────────
   El de Valor tiene lados y cruces, y ambos son procesos. El Cerebral tiene
   mercados (medio lado, con la punta en el gerente dueño) y relaciones.
   -------------------------------------------------------------------------- */
const TERMINOS = {
    1: {
        vertice: 'Vértice', vertices: 'Vértices', verticesSub: 'resultados',
        lado: 'Lado', lados: 'Lados', ladosSub: 'procesos entre vértices contiguos',
        proceso: 'Proceso', procesos: 'Procesos', procesosSub: 'cruces del octagrama'
    },
    2: {
        vertice: 'Vértice', vertices: 'Vértices', verticesSub: 'quienes deciden',
        lado: 'Mercado', lados: 'Mercados', ladosSub: 'de qué gerente es cada uno',
        proceso: 'Relación', procesos: 'Relaciones', procesosSub: 'todos con todos'
    }
};
function terminoDe(oct, tipo) { return TERMINOS[oct][tipo]; }

// Ciclo (del Octagrama de Valor) al que pertenece un lado o un proceso
function cicloDe(cfg, tipo, i) {
    if (!cfg.ciclos) return null;
    const d = (tipo === 'proceso' ? cfg.procesos : cfg.lados)[i];
    return d && d.ciclo ? cfg.ciclos[d.ciclo - 1] : null;
}

// Etiquetas cortas (compatibilidad con el resto del sitio)
const vertexLabelsValor = OCTAGRAMAS[1].vertices.map(v => v.nombre);
const sideLabelsValor = OCTAGRAMAS[1].lados.map(l => l.nombre);
const vertexLabelsCerebral = OCTAGRAMAS[2].vertices.map(v => v.nombre + ' / ' + v.personaje);
const sideLabelsCerebral = OCTAGRAMAS[2].lados.map(l => l.nombre);

// ─── Geometría compartida ────────────────────────────────────────────────────
const OCT_R = 1.28;                       // circunradio
const OCT_SEP = 0.92;                     // separación vertical entre octágonos
const OCT_ESPESOR = 0.10;

// Ángulo (plano X-Z) del vértice i (0-based). Vértice 1 → extremo inferior del
// lado vertical derecho; numeración antihoraria vista desde el frente.
function anguloVertice(i) { return Math.PI / 8 - i * Math.PI / 4; }
// Punto medio del lado i, que une los vértices i e i+1.
function anguloLado(i) { return -i * Math.PI / 4; }

/* ─── El lado como «semi lado»: media arista rematada en punta ────────────────
   Un lado no se dibuja como una barra tendida entre dos vértices, sino como una
   flecha que ocupa la mitad de la arista y apunta al vértice que le corresponde:
   en el de Valor, aquél al que va el proceso; en el Cerebral, el gerente dueño
   de ese mercado, porque el mercado es de uno solo y no de los dos vecinos.
   -------------------------------------------------------------------------- */
const LADO_LARGO = 0.42;      // largo de la flecha
const LADO_PUNTA = 0.15;      // parte de ese largo que es cono

// Vértice (0-based) al que apunta el lado i
function verticeDestinoLado(cfg, i) {
    const l = cfg.lados[i];
    return (l.a || l.vertice) - 1;
}

// Centro, dirección y posición angular de la flecha del lado i. Va centrada en
// la arista; lo que la orienta es a cuál de sus dos vértices apunta.
function geometriaLado(cfg, i) {
    const dest = verticeDestinoLado(cfg, i);
    const otro = dest === i ? (i + 1) % 8 : i;
    const pt = k => {
        const a = anguloVertice(k);
        return { x: Math.cos(a) * OCT_R, z: Math.sin(a) * OCT_R };
    };
    const A = pt(dest), B = pt(otro);
    const dx = A.x - B.x, dz = A.z - B.z;
    const len = Math.hypot(dx, dz);
    return {
        x: (A.x + B.x) / 2, z: (A.z + B.z) / 2, dest,
        ang: Math.atan2(dz / len, dx / len),
        angCentro: anguloLado(i)
    };
}

// ─── Estado global del visor ─────────────────────────────────────────────────
let octaViewer = null;

/* =============================================================================
   VISOR 3D
   ========================================================================== */
function initialize3DOctagon() {
    const container = document.getElementById('octagon-container');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    // updateStyle = false: el tamaño en pantalla lo fija el CSS (canvas absoluto),
    // así el <canvas> nunca empuja el ancho de su contenedor al redimensionar.
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    // Vista de arranque: el vértice 1 queda de frente y el modelo quieto;
    // girarlo es cosa de quien lo mira.
    const VISTA = {
        rx: 0.50,
        ry: anguloVertice(0) - Math.PI / 2,   // deja el vértice 1 hacia el frente
        zoom: 6.9
    };

    /* ─── La vista plana ──────────────────────────────────────────────────────
       En 2D el modelo deja de ser una maqueta y se lee como diagrama: los dos
       octagramas se separan y quedan uno junto al otro sobre el mismo plano,
       Valor a la izquierda y Cerebral a la derecha, cada uno con todas sus
       piezas. La cámara mira la cara del plano de frente (rx = 90°) y el giro
       propio se fija en 0, que es donde el lado 1 queda vertical a la derecha,
       igual que en los diagramas del modelo.
       En un recuadro angosto no caben lado a lado, así que se acomodan uno
       encima del otro.
       ---------------------------------------------------------------------- */
    const VISTA2D = { rx: Math.PI / 2, ry: 0, sep: 2.0 };

    // Tope del cabeceo: de mirar la cara de arriba de frente a mirar la de
    // abajo, y ni un grado más.
    const TOPE_RX = Math.PI / 2;

    // Estado de interacción
    const state = {
        drag: false, lastX: 0, lastY: 0,
        targetRX: VISTA.rx, targetRY: VISTA.ry,
        rx: VISTA.rx, ry: VISTA.ry,
        zoom: VISTA.zoom, targetZoom: VISTA.zoom,
        panX: 0, panY: 0, targetPanX: 0, targetPanY: 0,
        modo: '3d',
        mezcla: 0, targetMezcla: 0,     // 0 = maqueta 3D, 1 = diagrama plano
        volteo: 0,                      // 0 = piezas arriba, 1 = piezas abajo
        guard3d: null,                  // desde dónde se dejó el 3D al aplanar
        autoRotate: false,
        hovered: null,
        seleccionado: null
    };

    const piezas = [];      // elementos interactivos (vértices y lados)
    const ruedas = [];      // círculos de perfil caracterológico (sólo Cerebral)
    const cabezas = [];     // esferas de vértice que hay que despegar (sólo Cerebral)

    // Esfera del vértice, igual en los dos octagramas. Antes era casi el doble
    // de ancha; se achicó para que en el Cerebral quepa dentro del círculo del
    // perfil sin comerse los cuadrantes.
    const R_NUCLEO = 0.062;
    const R_AURA = 0.085;

    // ── Materiales base ──────────────────────────────────────────────────────
    const COL = {
        marca: 0xe8eef5,
        marcaEmissive: 0x2c3742,
        hoverVertice: 0xffc233,
        hoverLado: 0xff8a2b,
        activo: 0x00c2a8
    };

    // ── Construcción de un octágono ──────────────────────────────────────────
    function construirOctagono(cfg, yBase) {
        const grupo = new THREE.Group();
        grupo.position.y = yBase;
        root.add(grupo);

        const yTop = OCT_ESPESOR / 2;

        /* La carga: todo lo que va apoyado sobre la cara de la placa, en un
           grupo aparte. La placa y su marco quedan fuera, colgados del grupo
           del octagrama, y por eso no se mueven nunca de donde los deja el
           ratón. La carga sí: es la que cambia de cara. Ver aplicarVolteo(). */
        const carga = new THREE.Group();
        grupo.add(carga);

        // Placa: cilindro de 8 segmentos girado para que el lado 1 quede vertical
        const placaGeo = new THREE.CylinderGeometry(OCT_R, OCT_R, OCT_ESPESOR, 8, 1);
        const placaMat = new THREE.MeshPhongMaterial({
            color: cfg.hex,
            transparent: true,
            opacity: 0.42,
            shininess: 90,
            specular: 0x8899aa,
            flatShading: true,
            side: THREE.DoubleSide
        });
        const placa = new THREE.Mesh(placaGeo, placaMat);
        placa.rotation.y = -Math.PI / 8;
        grupo.add(placa);

        // Puntos de los vértices
        const P = [];
        for (let i = 0; i < 8; i++) {
            const a = anguloVertice(i);
            P.push(new THREE.Vector3(Math.cos(a) * OCT_R, yTop, Math.sin(a) * OCT_R));
        }

        // Perímetro (marco superior e inferior)
        const marcoMat = new THREE.LineBasicMaterial({
            color: cfg.hexOscuro, transparent: true, opacity: 0.85
        });
        [yTop, -yTop].forEach(y => {
            const pts = P.map(p => new THREE.Vector3(p.x, y, p.z));
            pts.push(pts[0].clone());
            const geo = new THREE.BufferGeometry().setFromPoints(pts);
            grupo.add(new THREE.Line(geo, marcoMat));
        });

        // ── Cruces: las líneas que cruzan entre vértices ──────────────────────
        // El cruce N enlaza el vértice N con el vértice N+3. Los ocho trazan la
        // estrella {8/3}, que es la que convierte al octágono en octagrama.
        const yEstrella = yTop + 0.016;

        // En el Cerebral, malla de fondo: las relaciones conectan a todos con
        // todos, así que se insinúan también los cruces cortos y las diagonales
        // largas que no son seleccionables.
        if (cfg.id === 2) {
            const mallaMat = new THREE.LineBasicMaterial({
                color: cfg.hex, transparent: true, opacity: 0.16
            });
            const par = (i, j) => {
                const geo = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(P[i].x, yEstrella, P[i].z),
                    new THREE.Vector3(P[j].x, yEstrella, P[j].z)
                ]);
                carga.add(new THREE.Line(geo, mallaMat));
            };
            for (let i = 0; i < 8; i++) par(i, (i + 2) % 8);   // cruces cortos
            for (let i = 0; i < 4; i++) par(i, i + 4);         // diagonales largas
        }

        cfg.procesos.forEach((pr, i) => {
            const a = P[i], b = P[(i + 3) % 8];
            const g = crearProceso(a, b, yEstrella, cfg, i, pr);
            carga.add(g);
            piezas.push(g);

            // La insignia no va al centro de la cuerda, donde se amontonarían las
            // ocho sobre el título, sino cerca del vértice del que arranca.
            const t = 0.24;
            const badge = crearInsignia(String(pr.n), cfg.color, '#ffffff', 'rombo');
            badge.position.set(
                a.x + (b.x - a.x) * t, yEstrella + 0.06, a.z + (b.z - a.z) * t);
            carga.add(badge);
            g.userData.badge = badge;
        });

        // ── Aristas del octágono (barra fina de referencia) ───────────────────
        const aristaMat = new THREE.MeshBasicMaterial({
            color: cfg.hexOscuro, transparent: true, opacity: 0.35
        });
        for (let i = 0; i < 8; i++) {
            carga.add(viga(P[i], P[(i + 1) % 8], 0.012, aristaMat, yTop + 0.006));
        }

        // ── Vértices ─────────────────────────────────────────────────────────
        cfg.vertices.forEach((v, i) => {
            const a = anguloVertice(i);
            const pos = new THREE.Vector3(Math.cos(a) * OCT_R, yTop + 0.02, Math.sin(a) * OCT_R);
            const g = crearVertice(pos, cfg, i, v);
            carga.add(g);
            piezas.push(g);

            // Insignia numérica siempre legible. En el Cerebral se corre hacia
            // afuera para librar el círculo del perfil, que es mucho más ancho.
            const r = OCT_R + (cfg.id === 2 ? 0.32 : 0.17);
            const badge = crearInsignia(String(v.n), cfg.color, '#ffffff');
            badge.position.set(Math.cos(a) * r, yTop + 0.08, Math.sin(a) * r);
            carga.add(badge);
            g.userData.badge = badge;
        });

        // ── Lados: media arista rematada en punta, apuntando a su vértice ─────
        cfg.lados.forEach((l, i) => {
            const gl = geometriaLado(cfg, i);
            const pos = new THREE.Vector3(gl.x, yTop + 0.02, gl.z);
            const g = crearLado(pos, gl.ang, cfg, i, l);
            carga.add(g);
            piezas.push(g);

            // La insignia acompaña a la flecha, un poco hacia el interior
            const r = Math.hypot(gl.x, gl.z), k = (r - 0.19) / r;
            const badge = crearInsignia(String(l.n), '#ffffff', cfg.color, 'anillo');
            badge.position.set(gl.x * k, yTop + 0.07, gl.z * k);
            carga.add(badge);
            g.userData.badge = badge;
        });

        // Título al centro de la placa, justo sobre la cara superior.
        const titulo = crearTituloCentral(cfg.centro, cfg.color);
        titulo.position.set(0, yTop + 0.20, 0);
        carga.add(titulo);

        return { grupo, carga, placaMat, titulo, yTitulo3D: yTop + 0.20, yTitulo2D: yTop + 0.03 };
    }

    // ── Helpers de geometría ─────────────────────────────────────────────────
    // Barra cilíndrica entre dos puntos, elevada a la altura y.
    function viga(a, b, radio, material, y) {
        const p1 = new THREE.Vector3(a.x, y, a.z);
        const p2 = new THREE.Vector3(b.x, y, b.z);
        const dir = new THREE.Vector3().subVectors(p2, p1);
        const len = dir.length();
        const geo = new THREE.CylinderGeometry(radio, radio, len, 8, 1);
        const m = new THREE.Mesh(geo, material);
        m.position.copy(p1).add(p2).multiplyScalar(0.5);
        m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
        return m;
    }

    function crearVertice(pos, cfg, i, datos) {
        const g = new THREE.Group();

        // La esfera va en su propio grupo, la «cabeza», porque en el Cerebral
        // hay que despegarla hacia la cámara para que no se la trague el
        // círculo del perfil. Es la misma en los dos octagramas: chica, para
        // que en el Cerebral quepa en el ojo del círculo sin taparle los
        // cuadrantes ni las letras.
        const cabeza = new THREE.Group();
        g.add(cabeza);

        const nucleoMat = new THREE.MeshPhongMaterial({
            color: COL.marca, emissive: cfg.hexOscuro, emissiveIntensity: 0.35, shininess: 120
        });
        cabeza.add(new THREE.Mesh(new THREE.SphereGeometry(R_NUCLEO, 24, 24), nucleoMat));

        // Burbuja discreta: apenas sobresale del núcleo y pulsa suave
        const auraMat = new THREE.MeshBasicMaterial({
            color: cfg.hex, transparent: true, opacity: 0.12, depthWrite: false
        });
        const aura = new THREE.Mesh(new THREE.SphereGeometry(R_AURA, 20, 20), auraMat);
        cabeza.add(aura);

        // En el Cerebral, el círculo de perfil es mucho más ancho que el núcleo.
        // Esta esfera invisible hace que casi todo el círculo sea sensible al
        // ratón. No se agranda más porque la punta de la flecha del mercado
        // llega hasta muy cerca del vértice y le quitaría sus clics.
        if (cfg.id === 2) {
            const zona = new THREE.Mesh(
                new THREE.SphereGeometry(0.18, 12, 12),
                new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
            );
            g.add(zona);
        }

        g.position.copy(pos);
        g.userData = {
            tipo: 'vertice', idx: i, oct: cfg.id, datos: datos, cfg: cfg,
            nucleoMat, auraMat, aura, activo: false,
            colorNormal: COL.marca, opacidadNormal: 1,
            auraNormal: 0.12, auraHover: 0.30, auraActivo: 0.26,
            titulo: cfg.id === 2 ? datos.nombre + ' · ' + datos.personaje : datos.nombre
        };

        // Perfil caracterológico: sólo lo llevan los vértices del Cerebral, y se
        // ve en las dos vistas. Como es sprite, siempre mira a la cámara. Va
        // clavado en el vértice: el bucle de animación lo despega hacia la
        // cámara lo justo para que el núcleo no lo perfore, de modo que en
        // pantalla queda siempre centrado en su vértice, se mire desde donde se
        // mire. (Antes se despegaba hacia arriba y en la maqueta se veía
        // corrido, con las letras perdidas detrás del canto.)
        if (cfg.id === 2) {
            const rueda = crearRuedaPerfil(datos, cfg);
            g.add(rueda);
            g.userData.rueda = rueda;
            ruedas.push(rueda);

            // La cabeza se despega un pelo más que el círculo, así la esfera
            // queda posada en el centro del perfil y no detrás de él. El aura
            // se pinta después del sprite para que el resalte del ratón se vea
            // sobre el círculo (el sprite no escribe profundidad).
            cabezas.push(cabeza);
            aura.renderOrder = 7;
        }
        return g;
    }

    // Lado: «semi lado», media arista rematada en punta. El vástago arranca en el
    // centro de la arista y el cono llega junto al vértice al que apunta.
    function crearLado(pos, ang, cfg, i, datos) {
        const g = new THREE.Group();
        const vastago = LADO_LARGO - LADO_PUNTA;

        const nucleoMat = new THREE.MeshPhongMaterial({
            color: COL.marca, emissive: cfg.hexOscuro, emissiveIntensity: 0.35, shininess: 120
        });

        const barra = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, vastago, 16), nucleoMat);
        barra.rotation.z = -Math.PI / 2;              // eje largo sobre +X local
        barra.position.x = -LADO_PUNTA / 2;
        g.add(barra);

        // Remate redondeado en la cola
        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.042, 16, 16), nucleoMat);
        cap.position.x = -LADO_LARGO / 2;
        g.add(cap);

        const cono = new THREE.Mesh(new THREE.ConeGeometry(0.082, LADO_PUNTA, 18), nucleoMat);
        cono.rotation.z = -Math.PI / 2;
        cono.position.x = vastago / 2;
        g.add(cono);

        // Cilindro invisible: sólo zona sensible al ratón. La flecha no lleva
        // burbuja; junto a la del vértice se veía sucio y encimado.
        const auraMat = new THREE.MeshBasicMaterial({
            color: cfg.hex, transparent: true, opacity: 0, depthWrite: false
        });
        const aura = new THREE.Mesh(
            new THREE.CylinderGeometry(0.088, 0.088, LADO_LARGO * 1.05, 16), auraMat);
        aura.rotation.z = Math.PI / 2;
        g.add(aura);

        g.position.copy(pos);
        // +X local apunta al vértice de destino
        g.rotation.y = -ang;

        const dest = verticeDestinoLado(cfg, i);
        g.userData = {
            tipo: 'lado', idx: i, oct: cfg.id, datos: datos, cfg: cfg,
            nucleoMat, auraMat, aura, activo: false,
            colorNormal: COL.marca, opacidadNormal: 1,
            auraNormal: 0, auraHover: 0, auraActivo: 0,
            titulo: datos.nombre,
            detalle: cfg.id === 2
                ? 'Mercado del ' + datos.rol + ' · ' + cfg.vertices[dest].personaje
                : 'Hacia ' + (dest + 1) + ' · ' + cfg.vertices[dest].nombre
        };
        return g;
    }

    // Cruce: barra que cruza entre dos vértices no contiguos
    function crearProceso(a, b, y, cfg, i, datos) {
        const p1 = new THREE.Vector3(a.x, y, a.z);
        const p2 = new THREE.Vector3(b.x, y, b.z);
        const dirV = new THREE.Vector3().subVectors(p2, p1);
        const largo = dirV.length();
        const q = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0), dirV.clone().normalize());

        const g = new THREE.Group();

        const nucleoMat = new THREE.MeshBasicMaterial({
            color: cfg.hex, transparent: true, opacity: 0.6
        });
        const barra = new THREE.Mesh(new THREE.CylinderGeometry(0.019, 0.019, largo, 8), nucleoMat);
        barra.quaternion.copy(q);
        g.add(barra);

        // Cilindro ancho semitransparente: sirve de halo y de zona sensible al ratón
        const auraMat = new THREE.MeshBasicMaterial({
            color: cfg.hex, transparent: true, opacity: 0.07, depthWrite: false
        });
        const aura = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, largo, 8), auraMat);
        aura.quaternion.copy(q);
        g.add(aura);

        g.position.copy(p1).add(p2).multiplyScalar(0.5);
        g.userData = {
            tipo: 'proceso', idx: i, oct: cfg.id, datos: datos, cfg: cfg,
            nucleoMat, auraMat, aura, activo: false,
            colorNormal: cfg.hex, opacidadNormal: 0.6,
            auraNormal: 0.07, auraHover: 0.34, auraActivo: 0.3,
            titulo: nombreProceso(cfg, i),
            detalle: nombreVertice(cfg, i) + ' ✕ ' + nombreVertice(cfg, (i + 3) % 8)
        };
        return g;
    }

    // ── Sprites de texto ─────────────────────────────────────────────────────
    /* Círculo del perfil caracterológico: cuatro cuadrantes coloreados, uno por
       rasgo, con la letra de cada polo. Sólo lo llevan los vértices del
       Cerebral y sólo se ve en la vista plana, donde el modelo se lee como
       diagrama. Va como sprite, así siempre mira a la cámara. */
    function crearRuedaPerfil(datos, cfg) {
        const S = 256, k = S / 2, R = k - 12;
        const cv = document.createElement('canvas');
        cv.width = cv.height = S;
        const c = cv.getContext('2d');

        // Arriba izquierda, arriba derecha, abajo derecha, abajo izquierda:
        // el mismo orden en que se leen las cuatro preguntas de la ficha.
        const desde = [Math.PI, -Math.PI / 2, 0, Math.PI / 2];
        cuadrantesDe(datos).forEach(function (q, i) {
            c.beginPath();
            c.moveTo(k, k);
            c.arc(k, k, R, desde[i], desde[i] + Math.PI / 2);
            c.closePath();
            c.fillStyle = q.color;
            c.fill();

            const a = desde[i] + Math.PI / 4;
            c.font = '700 46px "Segoe UI", Arial, sans-serif';
            c.textAlign = 'center';
            c.textBaseline = 'middle';
            c.fillStyle = tintaSobre(q.color);
            c.fillText(q.letra, k + Math.cos(a) * R * 0.56, k + Math.sin(a) * R * 0.56);
        });

        c.strokeStyle = 'rgba(255,255,255,0.92)';
        c.lineWidth = 7;
        c.beginPath();
        c.moveTo(k - R, k); c.lineTo(k + R, k);
        c.moveTo(k, k - R); c.lineTo(k, k + R);
        c.stroke();

        c.strokeStyle = cfg.color;
        c.lineWidth = 11;
        c.beginPath();
        c.arc(k, k, R - 4, 0, Math.PI * 2);
        c.stroke();

        const tex = new THREE.CanvasTexture(cv);
        tex.minFilter = THREE.LinearFilter;
        // Con `depthTest` puesto, el círculo se deja tapar por lo que quede
        // delante: en la maqueta no flota por encima del otro octagrama.
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({
            map: tex, transparent: true, depthTest: true, depthWrite: false
        }));
        sp.scale.set(0.42, 0.42, 1);
        sp.renderOrder = 6;
        return sp;
    }

    function crearInsignia(texto, fondo, tinta, forma) {
        const S = 128;
        const cv = document.createElement('canvas');
        cv.width = cv.height = S;
        const c = cv.getContext('2d');

        c.beginPath();
        if (forma === 'rombo') {
            const m = 8, k = S / 2;
            c.moveTo(k, m); c.lineTo(S - m, k); c.lineTo(k, S - m); c.lineTo(m, k);
            c.closePath();
        } else {
            c.arc(S / 2, S / 2, S / 2 - 6, 0, Math.PI * 2);
        }
        c.fillStyle = fondo;
        c.fill();
        if (forma === 'anillo') { c.lineWidth = 6; c.strokeStyle = tinta; c.stroke(); }
        if (forma === 'rombo') { c.lineWidth = 5; c.strokeStyle = '#ffffff'; c.stroke(); }

        c.font = '700 68px "Segoe UI", Arial, sans-serif';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillStyle = tinta;
        c.fillText(texto, S / 2, S / 2 + (forma === 'rombo' ? 2 : 3));

        const tex = new THREE.CanvasTexture(cv);
        tex.minFilter = THREE.LinearFilter;
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({
            map: tex, transparent: true, depthTest: false, depthWrite: false
        }));
        sp.scale.set(0.155, 0.155, 1);
        sp.renderOrder = 20;
        return sp;
    }

    function crearTituloCentral(texto, color) {
        const escala = 3, fs = 40;
        const medidor = document.createElement('canvas').getContext('2d');
        medidor.font = `800 ${fs}px "Segoe UI", Arial, sans-serif`;
        const w = Math.ceil(medidor.measureText(texto).width) + 30;
        const h = 58;

        const cv = document.createElement('canvas');
        cv.width = w * escala; cv.height = h * escala;
        const c = cv.getContext('2d');
        c.scale(escala, escala);
        c.font = `800 ${fs}px "Segoe UI", Arial, sans-serif`;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.lineWidth = 5;
        c.strokeStyle = 'rgba(255,255,255,0.9)';
        c.strokeText(texto, w / 2, h / 2);
        c.fillStyle = color;
        c.fillText(texto, w / 2, h / 2);

        const tex = new THREE.CanvasTexture(cv);
        tex.minFilter = THREE.LinearFilter;
        // El nombre es una pieza más de su octágono: se dibuja antes que las
        // placas (renderOrder -1) y escribe profundidad, así la placa del otro
        // octagrama lo cubre translúcida, se sigue leyendo por detrás, y la
        // suya propia, que queda atrás, no lo empaña. El alphaTest evita que el
        // rectángulo del sprite escriba profundidad donde no hay letra.
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({
            map: tex, transparent: true, depthTest: true, depthWrite: true,
            alphaTest: 0.05, opacity: 0.9
        }));
        const k = 0.0037;
        sp.scale.set(w * k, h * k, 1);
        sp.renderOrder = -1;
        return sp;
    }

    function redondeado(c, x, y, w, h, r) {
        c.beginPath();
        c.moveTo(x + r, y);
        c.lineTo(x + w - r, y); c.quadraticCurveTo(x + w, y, x + w, y + r);
        c.lineTo(x + w, y + h - r); c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        c.lineTo(x + r, y + h); c.quadraticCurveTo(x, y + h, x, y + h - r);
        c.lineTo(x, y + r); c.quadraticCurveTo(x, y, x + r, y);
        c.closePath();
    }

    // ── Montaje ──────────────────────────────────────────────────────────────
    const octValor = construirOctagono(OCTAGRAMAS[1], OCT_SEP);
    const octCerebral = construirOctagono(OCTAGRAMAS[2], -OCT_SEP);

    // ── Aprendizaje: los ocho vínculos entre un octagrama y el otro ───────────
    // Cada gerente tiene su perfil funcional arriba y su perfil caracterológico
    // abajo; los une el proceso de aprendizaje que desarrolla sus competencias
    // individuales. En los diagramas del modelo son las flechas anaranjadas.
    const aprendizajeMat = new THREE.MeshBasicMaterial({
        color: 0xe67e22, transparent: true, opacity: 0.5
    });
    const yArriba = OCT_SEP - OCT_ESPESOR / 2;
    const yAbajo = -OCT_SEP + OCT_ESPESOR / 2;
    const aprendizaje = [];
    for (let i = 0; i < 8; i++) {
        const a = anguloVertice(i);
        const x = Math.cos(a) * OCT_R, z = Math.sin(a) * OCT_R;
        const barra = new THREE.Mesh(
            new THREE.CylinderGeometry(0.014, 0.014, yArriba - yAbajo, 6), aprendizajeMat);
        barra.position.set(x, (yArriba + yAbajo) / 2, z);
        root.add(barra);
        aprendizaje.push(barra);
    }

    /* ─── Acomodo de los dos octagramas según la vista ────────────────────────
       En 3D van apilados, Valor arriba y Cerebral abajo, unidos por las barras
       de aprendizaje. Al aplanar se separan sobre el mismo plano y las barras
       se desvanecen, porque irían de un dibujo al otro cruzando todo.
       ---------------------------------------------------------------------- */
    const TAN_MEDIO_FOV = Math.tan(camera.fov * Math.PI / 360);
    // Radio que ocupa un octagrama con lo que le sobresale: la insignia del
    // vértice, ya corrida, y el círculo del perfil.
    const R_UTIL = OCT_R + 0.36;

    const POS3D = {
        valor: new THREE.Vector3(0, OCT_SEP, 0),
        cerebral: new THREE.Vector3(0, -OCT_SEP, 0)
    };
    const POS2D = {
        valor: new THREE.Vector3(-VISTA2D.sep, 0, 0),
        cerebral: new THREE.Vector3(VISTA2D.sep, 0, 0)
    };
    let zoom2D = 8.6;      // lo recalcula redimensionar() según la forma del recuadro

    // Con rx = 90° y ry = 0, la X del modelo cae horizontal en pantalla y la Z
    // vertical e invertida; por eso la columna pone a Valor en z negativa.
    function acomodar2D(aspect) {
        const t = TAN_MEDIO_FOV;
        container.classList.toggle('plano-columna', aspect < 1.05);
        if (aspect >= 1.05) {                       // recuadro ancho: lado a lado
            const sep = VISTA2D.sep;
            POS2D.valor.set(-sep, 0, 0);
            POS2D.cerebral.set(sep, 0, 0);
            zoom2D = Math.max((sep + R_UTIL) / (t * aspect), R_UTIL / t) * 1.06;
        } else {                                    // recuadro angosto: en columna
            const sep = 1.95;
            POS2D.valor.set(0, 0, -sep);
            POS2D.cerebral.set(0, 0, sep);
            zoom2D = Math.max((sep + R_UTIL) / t, R_UTIL / (t * aspect)) * 1.06;
        }
        zoom2D = Math.max(5.2, Math.min(18, zoom2D));
    }

    /* ─── El volteo: las piezas siempre en la cara que se está mirando ────────
       Las piezas de cada octagrama van montadas sobre la cara de arriba de su
       placa. Al girar el modelo para ver una placa por debajo, la placa misma
       las tapaba y el octagrama quedaba mudo. La solución es que la carga dé
       media vuelta sobre el eje horizontal de su placa: nombres, insignias,
       flechas, cruces y círculos se despegan de la cara de arriba y aterrizan
       en la de abajo, que es la que se está mirando.

       Media vuelta y no un espejo: así, visto desde abajo, el octagrama se lee
       igual que desde arriba, con el mismo sentido de giro de los ciclos. Un
       espejo invertiría el orden de los vértices.

       Lo que no se toca es la placa: la media vuelta se le aplica sólo al grupo
       de la carga, y placa, marco y modelo entero se quedan girando con el
       ratón y nada más. Se puede porque el juego de vértices del octágono es
       simétrico bajo z → -z: la placa volteada se ve idéntica a la placa
       quieta, y las barras de aprendizaje siguen cayendo en un vértice. Antes
       se volteaba el grupo entero y el octagrama pegaba el brinco.

       El truco para voltear la carga es la escala, no el giro: `(1, c, c)` con
       c de +1 a -1. En c = -1 eso es exactamente media vuelta sobre X, porque
       invertir dos ejes es un giro, no un espejo. Y de paso da el camino
       bueno: en vez de que las piezas salgan volando por fuera de la placa
       describiendo su arco, toda la carga se recoge sobre el diámetro de la
       placa y vuelve a abrirse del otro lado. Girándola de verdad, las barras
       largas de los cruces se paraban de punta y era un desastre.

       El avance sale directo del ángulo de la vista, sin destino ni animación
       aparte: se adelanta y se devuelve con la mano, al mismo ritmo que el
       giro, y cae en la franja en que el modelo queda de canto, que es cuando
       no hay nada que leer.
       ---------------------------------------------------------------------- */
    const ejeCamara = new THREE.Vector3();
    const giroAux = new THREE.Quaternion();
    const qVolteo = new THREE.Quaternion();
    const EJE_VOLTEO = new THREE.Vector3(1, 0, 0);
    const DESPEGUE_RUEDA = 0.14;      // lo justo para librar el canto de la placa
    // La esfera del vértice va un poco por delante del círculo, de modo que se
    // vea posada en su centro. Basta con que su cara de atrás libre el sprite.
    const DESPEGUE_NUCLEO = DESPEGUE_RUEDA + R_NUCLEO + 0.01;
    // Franja de canto, medida sobre el seno del cabeceo, en la que la carga
    // cambia de cara. Angosta, para que el cambio caiga donde el modelo está de
    // filo y no se vea la carga recogida sobre una placa bien visible.
    const BANDA_VOLTEO = 0.20;
    // Con la carga recogida del todo la matriz se vuelve degenerada, así que en
    // ese pelo de camino se apaga: de canto no hay nada que ver ahí.
    const CARGA_MINIMA = 0.03;

    // Curva en ese, para que el cruce entre y salga sin tirones en los bordes.
    function suavizar(x) {
        const k = x < 0 ? 0 : x > 1 ? 1 : x;
        return k * k * (3 - 2 * k);
    }

    function aplicarVolteo(f) {
        const c = 1 - 2 * f;                       // +1 cara de arriba, -1 la de abajo
        const visible = Math.abs(c) > CARGA_MINIMA;
        const k = c < 0 ? Math.min(c, -CARGA_MINIMA) : Math.max(c, CARGA_MINIMA);
        [octValor, octCerebral].forEach(o => {
            o.carga.visible = visible;
            o.carga.scale.set(1, k, k);
        });

        // Los círculos de perfil se despegan hacia la cámara, no hacia arriba,
        // para que en pantalla no se corran de su vértice. Van colgados del
        // vértice, así que el eje de la cámara hay que traerlo hasta ahí
        // deshaciendo el giro del modelo y el volteo de la carga.
        qVolteo.setFromAxisAngle(EJE_VOLTEO, Math.PI * f);
        giroAux.copy(root.quaternion).multiply(qVolteo).invert();
        ejeCamara.set(0, 0, 1).applyQuaternion(giroAux);
        ruedas.forEach(r => r.position.copy(ejeCamara).multiplyScalar(DESPEGUE_RUEDA));
        cabezas.forEach(c => c.position.copy(ejeCamara).multiplyScalar(DESPEGUE_NUCLEO));
    }

    function aplicarAcomodo(m) {
        octValor.grupo.position.lerpVectors(POS3D.valor, POS2D.valor, m);
        octCerebral.grupo.position.lerpVectors(POS3D.cerebral, POS2D.cerebral, m);

        // Se apagan al aplanar: irían de un dibujo al otro cruzando todo. Ya no
        // hace falta apagarlas por el volteo, porque las placas se quedan
        // quietas y las barras siguen uniendo canto con canto todo el tiempo.
        const opAp = 0.5 * Math.max(0, 1 - m * 2.4);
        aprendizajeMat.opacity = opAp;
        if (aprendizaje[0].visible !== opAp > 0.01) {
            aprendizaje.forEach(b => { b.visible = opAp > 0.01; });
        }

        /* El título va flotando sobre la placa en la maqueta, que es lo que le
           da relieve. Puesto en plano ese vuelo lo descentra: el nombre queda
           más cerca de la cámara que su placa y, como cada octagrama está fuera
           del eje, la perspectiva lo corre hacia afuera. Al aplanar se baja casi
           hasta la placa y se corre hacia adentro lo que la perspectiva lo va a
           correr hacia afuera, de modo que caiga clavado en el centro. */
        // El nombre va dentro de la carga, así que cambia de cara solo.
        [octValor, octCerebral].forEach(o => {
            const y0 = o.yTitulo3D - (o.yTitulo3D - o.yTitulo2D) * m;
            const k = m * y0 / Math.max(1, state.zoom);
            o.titulo.position.set(-o.grupo.position.x * k, y0, -o.grupo.position.z * k);
        });
    }

    /* Nota sobre los nombres en la vista plana: se probaron los dieciséis
       rótulos alrededor de los dos octagramas y no caben. Al hacerles lugar,
       cada dibujo se encoge a la mitad y los círculos de perfil dejan de
       leerse, que es justo lo que hay que ver. Se quedan los números, que son
       el índice del modelo, y el nombre aparece en el rótulo del cursor, en el
       índice y en la ficha. Si algún día el diagrama ocupa el ancho completo
       de la página, ahí sí caben. */

    // ── Luces ────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.72));
    const key = new THREE.DirectionalLight(0xffffff, 0.75);
    key.position.set(3, 5, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdfe9ff, 0.35);
    fill.position.set(-4, -2, -3);
    scene.add(fill);

    camera.position.set(0, 0, state.zoom);
    camera.lookAt(0, 0, 0);

    // ── Interacción ──────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const puntero = new THREE.Vector2();

    // Rótulo HTML que sigue al cursor: siempre nítido y por encima de todo,
    // sin los problemas de oclusión de un sprite dentro de la escena.
    const tip = document.createElement('div');
    tip.className = 'oct-tip';
    container.appendChild(tip);

    function mostrarTip(p, ev) {
        const u = p.userData;
        const etiquetaN = terminoDe(u.oct, u.tipo) + ' ' + (u.idx + 1);
        // Mientras un proceso no tenga nombre propio se muestran los vértices que cruza
        const generico = u.titulo === etiquetaN;
        tip.innerHTML = '<span class="oct-tip-tag" style="background:' + u.cfg.color + '">' +
            etiquetaN + '</span>' +
            (generico ? '' : u.titulo) +
            (u.detalle ? '<span class="oct-tip-sub">' + u.detalle + '</span>' : '');
        tip.classList.add('visible');
        moverTip(ev);
    }

    function moverTip(ev) {
        if (!tip.classList.contains('visible') || !ev) return;
        const r = container.getBoundingClientRect();
        let x = ev.clientX - r.left + 16;
        let y = ev.clientY - r.top - 14;
        x = Math.max(8, Math.min(r.width - tip.offsetWidth - 8, x));
        y = Math.max(8, Math.min(r.height - tip.offsetHeight - 8, y));
        tip.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    }

    function ocultarTip() { tip.classList.remove('visible'); }

    function mallasInteractivas() {
        const out = [];
        piezas.forEach(p => p.children.forEach(ch => {
            if (!ch.isMesh) return;
            ch.userData.pieza = p;
            out.push(ch);
        }));
        return out;
    }

    // Pinta una pieza en un color dado; los procesos usan material sin emisión.
    function pintar(u, hex, intensidad, opacidadNucleo) {
        u.nucleoMat.color.setHex(hex);
        if (u.nucleoMat.emissive) {
            u.nucleoMat.emissive.setHex(hex);
            u.nucleoMat.emissiveIntensity = intensidad;
        }
        if (u.nucleoMat.transparent) u.nucleoMat.opacity = opacidadNucleo;
    }

    function resaltar(p) {
        const u = p.userData;
        pintar(u, u.tipo === 'vertice' ? COL.hoverVertice : COL.hoverLado, 0.75, 1);
        u.auraMat.opacity = u.auraHover;
        if (u.tipo !== 'proceso') p.scale.setScalar(1.35);
        if (u.badge) u.badge.scale.setScalar(0.21);
    }

    function normalizar(p) {
        const u = p.userData;
        if (u.activo) return activar(p);
        pintar(u, u.colorNormal, 0.35, u.opacidadNormal);
        u.auraMat.opacity = u.auraNormal;
        p.scale.setScalar(1);
        if (u.badge) u.badge.scale.setScalar(u.tipo === 'proceso' ? 0.14 : 0.155);
    }

    function activar(p) {
        const u = p.userData;
        pintar(u, COL.activo, 0.85, 1);
        u.auraMat.opacity = u.auraActivo;
        if (u.tipo !== 'proceso') p.scale.setScalar(1.25);
    }

    function seleccionar(p) {
        if (state.seleccionado && state.seleccionado !== p) {
            state.seleccionado.userData.activo = false;
            normalizar(state.seleccionado);
        }
        state.seleccionado = p;
        p.userData.activo = true;
        activar(p);
        mostrarInfoOctagrama(p.userData.oct, p.userData.tipo, p.userData.idx);
        marcarIndice(p.userData.oct, p.userData.tipo, p.userData.idx);
    }

    function actualizarPuntero(ev) {
        const r = container.getBoundingClientRect();
        puntero.x = ((ev.clientX - r.left) / r.width) * 2 - 1;
        puntero.y = -((ev.clientY - r.top) / r.height) * 2 + 1;
    }

    function detectarHover(ev) {
        raycaster.setFromCamera(puntero, camera);
        const hits = raycaster.intersectObjects(mallasInteractivas(), false);
        const nueva = hits.length ? hits[0].object.userData.pieza : null;

        if (nueva !== state.hovered) {
            if (state.hovered) normalizar(state.hovered);
            state.hovered = nueva;
            if (nueva) {
                resaltar(nueva);
                mostrarTip(nueva, ev);
                container.style.cursor = 'pointer';
            } else {
                ocultarTip();
                container.style.cursor = state.drag ? 'grabbing' : 'grab';
            }
        } else if (nueva) {
            moverTip(ev);
        }
    }

    container.addEventListener('pointerdown', ev => {
        // Los mandos que van encima del lienzo se atienden solos. Si no se sale
        // aquí, el lienzo captura el puntero para el arrastre y el clic del
        // botón nunca llega a dispararse.
        if (ev.target.closest && ev.target.closest('.oct-modo')) return;
        state.drag = true;
        state.lastX = ev.clientX; state.lastY = ev.clientY;
        state.movio = false;
        container.setPointerCapture(ev.pointerId);
        container.style.cursor = 'grabbing';
    });

    container.addEventListener('pointermove', ev => {
        if (state.drag) {
            const dx = ev.clientX - state.lastX;
            const dy = ev.clientY - state.lastY;
            if (Math.abs(dx) + Math.abs(dy) > 3) state.movio = true;
            if (state.modo === '2d') {
                // Puesto en plano no se gira: se arrastra el diagrama
                const k = 2 * state.zoom * TAN_MEDIO_FOV / Math.max(1, container.clientHeight);
                state.targetPanX = Math.max(-4, Math.min(4, state.targetPanX + dx * k));
                state.targetPanY = Math.max(-4, Math.min(4, state.targetPanY - dy * k));
            } else {
                // Giro libre en redondo, y cabeceo hasta el tope de mirar la
                // cara de arriba o la de abajo de frente. Pasarse de ahí sólo
                // servía para poner el modelo de cabeza y para que el arrastre
                // horizontal se invirtiera, que era buena parte del brinco.
                state.targetRY += dx * 0.008;
                state.targetRX = Math.max(-TOPE_RX,
                    Math.min(TOPE_RX, state.targetRX + dy * 0.006));
            }
            state.lastX = ev.clientX; state.lastY = ev.clientY;
            state.autoRotate = false;
        }
        actualizarPuntero(ev);
        detectarHover(ev);
    });

    container.addEventListener('pointerup', ev => {
        state.drag = false;
        try { container.releasePointerCapture(ev.pointerId); } catch (e) { }
        container.style.cursor = state.hovered ? 'pointer' : 'grab';
        if (!state.movio && state.hovered) seleccionar(state.hovered);
    });

    container.addEventListener('pointerleave', () => {
        state.drag = false;
        if (state.hovered) { normalizar(state.hovered); state.hovered = null; }
        ocultarTip();
        container.style.cursor = 'grab';
    });

    container.addEventListener('wheel', ev => {
        ev.preventDefault();
        const cerca = state.modo === '2d' ? zoom2D * 0.45 : 4.2;
        const lejos = state.modo === '2d' ? zoom2D * 1.30 : 9.5;
        state.targetZoom = Math.max(cerca, Math.min(lejos, state.targetZoom + ev.deltaY * 0.0025));
    }, { passive: false });

    // ── API pública del visor ────────────────────────────────────────────────
    function piezaDe(oct, tipo, idx) {
        return piezas.find(p => p.userData.oct === oct && p.userData.tipo === tipo && p.userData.idx === idx);
    }

    // Equivalente de `destino` (módulo 2π) más próximo a `referencia`, para que el
    // giro tome siempre la vuelta más corta.
    function masCercano(destino, referencia) {
        let d = destino;
        while (d - referencia > Math.PI) d -= Math.PI * 2;
        while (d - referencia < -Math.PI) d += Math.PI * 2;
        return d;
    }

    /* ─── El conmutador 3D / 2D ───────────────────────────────────────────────
       Una misma escena en dos lecturas: la maqueta, que se gira, y el diagrama
       plano, que se arrastra. El cambio se anima, no se salta, para que se vea
       de dónde sale cada cosa.
       ---------------------------------------------------------------------- */
    const botonesModo = Array.prototype.slice.call(
        container.querySelectorAll('.oct-modo-btn'));
    const pista = container.querySelector('.octagon-hint-txt');

    function fijarModo(m) {
        if (m === state.modo) return;
        state.modo = m;

        if (m === '2d') {
            state.guard3d = { rx: state.targetRX, ry: state.targetRY, zoom: state.targetZoom };
            state.targetRX = masCercano(VISTA2D.rx, state.rx);
            state.targetRY = masCercano(VISTA2D.ry, state.ry);
            state.targetZoom = zoom2D;
            state.targetMezcla = 1;
        } else {
            const g = state.guard3d || VISTA;
            state.targetRX = masCercano(g.rx, state.rx);
            state.targetRY = masCercano(g.ry, state.ry);
            state.targetZoom = g.zoom;
            state.targetMezcla = 0;
            state.targetPanX = 0;
            state.targetPanY = 0;
        }
        state.autoRotate = false;

        container.classList.toggle('modo-2d', m === '2d');
        botonesModo.forEach(b => {
            const on = b.dataset.modo === m;
            b.classList.toggle('activo', on);
            b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        if (pista) {
            pista.textContent = m === '2d'
                ? 'Arrastre para mover · clic en cualquier elemento'
                : 'Arrastre para girar · clic en cualquier elemento';
        }
    }

    botonesModo.forEach(b => b.addEventListener('click', () => fijarModo(b.dataset.modo)));

    // Doble seguro: nada de lo que pase sobre el conmutador llega al lienzo
    const mandoModo = container.querySelector('.oct-modo');
    if (mandoModo) {
        ['pointerdown', 'pointerup', 'wheel'].forEach(t =>
            mandoModo.addEventListener(t, ev => ev.stopPropagation()));
    }

    octaViewer = {
        modo: fijarModo,
        enfocar(oct, tipo, idx) {
            const p = piezaDe(oct, tipo, idx);
            if (!p) return;
            // En plano el dibujo ya está de frente: no hay nada que girar
            if (state.modo === '2d') { seleccionar(p); return; }
            // El punto medio del cruce cae sobre la bisectriz del lado idx+1; el
            // lado, corrido hacia el vértice al que apunta.
            const ang = tipo === 'vertice' ? anguloVertice(idx)
                : tipo === 'proceso' ? anguloLado(idx + 1)
                : geometriaLado(OCTAGRAMAS[oct], idx).angCentro;
            // Deja el elemento al frente (dirección +Z), por la vuelta más corta
            state.targetRY = masCercano(ang - Math.PI / 2, state.targetRY);
            state.targetRX = tipo === 'proceso' ? 0.62 : (oct === 1 ? 0.55 : 0.34);
            state.autoRotate = false;
            seleccionar(p);
        },
        destacar(oct, tipo, idx, on) {
            const p = piezaDe(oct, tipo, idx);
            if (!p) return;
            if (on) resaltar(p); else normalizar(p);
        },
        reiniciar() {
            const V = state.modo === '2d' ? VISTA2D : VISTA;
            state.targetRX = masCercano(V.rx, state.targetRX);
            state.targetRY = masCercano(V.ry, state.targetRY);       // vuelta más corta
            state.targetZoom = state.modo === '2d' ? zoom2D : VISTA.zoom;
            state.targetPanX = 0;
            state.targetPanY = 0;
            state.autoRotate = false;
            if (state.seleccionado) { state.seleccionado.userData.activo = false; normalizar(state.seleccionado); state.seleccionado = null; }
            limpiarIndice();
            infoInicial();
        }
    };

    // ── Bucle de animación ───────────────────────────────────────────────────
    let t = 0;
    function animar() {
        requestAnimationFrame(animar);
        t += 0.016;

        if (state.autoRotate && !state.drag && state.modo === '3d') state.targetRY += 0.0022;

        state.rx += (state.targetRX - state.rx) * 0.08;
        state.ry += (state.targetRY - state.ry) * 0.08;
        state.zoom += (state.targetZoom - state.zoom) * 0.1;
        state.mezcla += (state.targetMezcla - state.mezcla) * 0.075;
        state.panX += (state.targetPanX - state.panX) * 0.12;
        state.panY += (state.targetPanY - state.panY) * 0.12;

        // ¿Qué cara de las placas está mirando la cámara? La normal de la placa
        // apunta hacia el objetivo cuando sen(rx) es positivo. El paso de una
        // cara a la otra se lee directo de ese seno, sin destino ni animación
        // aparte: así la carga avanza y se devuelve con el ratón, al mismo
        // ritmo que el giro, y no hay un movimiento suelto que dé el brinco.
        state.volteo = suavizar(0.5 - Math.sin(state.rx) / (2 * BANDA_VOLTEO));

        root.rotation.x = state.rx;
        root.rotation.y = state.ry;
        root.position.set(state.panX, state.panY, 0);
        camera.position.z = state.zoom;

        aplicarVolteo(state.volteo);
        aplicarAcomodo(state.mezcla);

        // Pulso sutil en las auras no resaltadas
        const pulso = 1 + Math.sin(t * 1.6) * 0.03;
        piezas.forEach(p => {
            if (!p.userData.activo && p !== state.hovered) p.userData.aura.scale.setScalar(pulso);
        });

        renderer.render(scene, camera);
    }

    function redimensionar() {
        const w = container.clientWidth, h = container.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        acomodar2D(w / h);
        if (state.modo === '2d') state.targetZoom = zoom2D;
    }
    window.addEventListener('resize', redimensionar);
    redimensionar();
    animar();
}

/* =============================================================================
   PANEL DE INFORMACIÓN E ÍNDICE HTML
   ========================================================================== */
function infoInicial() {
    const panel = document.getElementById('octagon-info');
    if (!panel) return;
    panel.classList.remove('selected');
    panel.innerHTML = `
        <div class="oct-info-vacio">
            <h3>El Modelo del Octagrama</h3>
            <p>Dos octágonos superpuestos explican la dinámica de la empresa. El
            <strong style="color:#c0392b">Octagrama de Valor</strong> reúne los resultados que
            la empresa persigue (vértices) y los <strong>procesos</strong> por los que fluye el
            valor: ocho corren por los lados y ocho cruzan el octágono, y los dieciséis se
            agrupan en <strong>cuatro ciclos cerrados</strong>.</p>
            <p>El <strong style="color:#2563eb">Octagrama Cerebral</strong> reúne a quienes
            deciden (vértices). Cada <strong>mercado</strong> apunta al gerente que interviene
            en él, y los cruces no son procesos sino <strong>relaciones</strong> entre las
            personas, formales o informales, que conectan a todos con todos.</p>
            <p>Las líneas anaranjadas que van de un octagrama al otro son los procesos de
            aprendizaje que desarrollan las competencias individuales de cada gerente.</p>
            <p class="oct-info-cta">Gire el modelo y seleccione cualquier elemento, o elíjalo
            en el índice.</p>
        </div>`;
}

// Bloque del ciclo al que pertenece un proceso del Octagrama de Valor
function bloqueCiclo(cfg, tipo, idx) {
    const c = cicloDe(cfg, tipo, idx);
    if (!c) return '';
    const eslabones = c.ruta.map(e => {
        const el = (e.tipo === 'proceso' ? cfg.procesos : cfg.lados)[e.idx];
        const actual = e.tipo === tipo && e.idx === idx;
        return `<li${actual ? ' class="actual"' : ''}>
            <a href="#" onclick="octIr(${cfg.id},'${e.tipo}',${e.idx});return false;">${el.nombre}</a>
        </li>`;
    }).join('');
    return `
        <div class="oct-caja oct-ciclo" style="--cc:${c.color};">
            <div class="oct-caja-tit"><span class="oct-ciclo-punto"></span>${c.nombre}</div>
            <p class="oct-ciclo-desc">${c.desc}</p>
            <ol class="oct-ciclo-ruta">${eslabones}</ol>
        </div>`;
}

function mostrarInfoOctagrama(oct, tipo, idx) {
    const panel = document.getElementById('octagon-info');
    if (!panel) return;
    const cfg = OCTAGRAMAS[oct];
    const otro = OCTAGRAMAS[oct === 1 ? 2 : 1];
    const coleccion = tipo === 'vertice' ? 'vertices' : tipo === 'proceso' ? 'procesos' : 'lados';
    const d = cfg[coleccion][idx];
    const etiquetaTipo = terminoDe(oct, tipo);

    // Nombre corto de un vértice (en el Cerebral incluye el personaje)
    const nomV = (c, k) => c.id === 2
        ? `${c.vertices[k].nombre} · ${c.vertices[k].personaje}`
        : c.vertices[k].nombre;

    // Línea «va de … a …» cuando el proceso tiene sentido dentro de su ciclo
    const flujo = (el, verbo) => {
        if (!el.de || !el.a) return '';
        const i = el.de - 1, j = el.a - 1;
        return `
            <div class="oct-vincula">${verbo}
                <a href="#" onclick="octIr(${oct},'vertice',${i});return false;">${el.de} · ${nomV(cfg, i)}</a>
                <span>→</span>
                <a href="#" onclick="octIr(${oct},'vertice',${j});return false;">${el.a} · ${nomV(cfg, j)}</a>
            </div>`;
    };

    let titulo, cuerpo = '';

    if (tipo === 'proceso') {
        // El cruce N enlaza los vértices N y N+3
        const j = (idx + 3) % 8;
        titulo = nombreProceso(cfg, idx);
        cuerpo = (oct === 1 ? flujo(d, 'Va de') : `
            <div class="oct-vincula">Enlaza a
                <a href="#" onclick="octIr(${oct},'vertice',${idx});return false;">${idx + 1} · ${nomV(cfg, idx)}</a>
                <span>↔</span>
                <a href="#" onclick="octIr(${oct},'vertice',${j});return false;">${j + 1} · ${nomV(cfg, j)}</a>
            </div>`) +
            `<p class="oct-p">${descProceso(cfg, idx)}</p>` +
            bloqueCiclo(cfg, tipo, idx);
    } else if (oct === 2 && tipo === 'lado') {
        // El mercado es de un solo gerente: no une dos vértices
        titulo = d.nombre;
        cuerpo = `
            <div class="oct-vincula">Mercado del
                <a href="#" onclick="octIr(2,'vertice',${idx});return false;">${idx + 1} · ${nomV(cfg, idx)}</a>
                <span class="oct-vincula-nota">(parte de su perfil funcional)</span>
            </div>
            <p class="oct-p">${d.desc}</p>`;
    } else if (oct === 1 && tipo === 'lado') {
        titulo = d.nombre;
        cuerpo = flujo(d, 'Va de') +
            (d.alias ? `<div class="oct-alias">También llamado <b>${d.alias}</b></div>` : '') +
            `<p class="oct-p">${d.desc}</p>` +
            bloqueCiclo(cfg, tipo, idx);
    } else if (oct === 1 && tipo === 'vertice') {
        titulo = d.nombre;
        cuerpo = `
            <p class="oct-p">${d.desc}</p>
            <div class="oct-caja" style="border-color:${cfg.color}22;">
                <div class="oct-caja-tit">${d.pregunta}</div>
                <ul class="oct-lista">${d.escala.map(e => `<li>${e}</li>`).join('')}</ul>
                <div class="oct-grad" style="background:${cfg.color}12; color:${cfg.color};">${d.gradiente}</div>
            </div>`;
    } else {
        // Las cuatro letras del código son los cuatro cuadrantes de su círculo
        const cuads = cuadrantesDe(d);
        titulo = `${d.nombre} · ${d.personaje}`;
        cuerpo = `
            <div class="oct-sub">${d.cargo}</div>
            <p class="oct-p">${d.rasgo}</p>
            <div class="oct-chips">
                <span class="oct-chip" onclick="showMBTIInfo('${d.mbti}',${idx})" title="Ver perfil MBTI">${d.mbti}</span>
                <span class="oct-chip lisa">Interés vital: <b>${d.interes}</b></span>
                <span class="oct-chip lisa">Fórmula: <b>${d.formula}</b></span>
                <span class="oct-chip lisa">Modo de ser: <b>${d.modo}</b></span>
            </div>
            <div class="oct-caja" style="border-color:${cfg.color}22;">
                <div class="oct-caja-tit">Perfil caracterológico: las cuatro letras de
                    <b>${d.mbti}</b> son los cuatro cuadrantes de su círculo en el modelo</div>
                ${d.qa.map((q, k) => `
                    <div class="oct-qa cuad">
                        <i style="background:${cuads[k].color}; color:${tintaSobre(cuads[k].color)};"
                           title="${cuads[k].clave}: ${cuads[k].nombre}">${cuads[k].letra}</i>
                        <span>${q[0]}</span><b>${q[1]}</b>
                    </div>`).join('')}
                <div class="oct-nota">En la fórmula, E es Empatía y R es Racionalidad.</div>
            </div>`;
    }

    const otroNombre = tipo === 'proceso'
        ? nombreProceso(otro, idx)
        : tipo === 'vertice' ? nomV(otro, idx) : otro.lados[idx].nombre;

    panel.classList.add('selected');
    panel.style.setProperty('--oct-color', cfg.color);
    panel.innerHTML = `
        <div class="oct-info-cab">
            <span class="oct-info-tag" style="background:${cfg.color};">${cfg.nombre} · ${etiquetaTipo} ${idx + 1}</span>
            <h3>${titulo}</h3>
        </div>
        ${cuerpo}
        <div class="oct-info-pie">
            <span>${tipo === 'vertice'
                ? 'El mismo gerente en el otro octagrama, unido por su proceso de aprendizaje'
                : 'Elemento correspondiente'}</span>
            <button onclick="octIr(${otro.id},'${tipo}',${idx})" style="border-color:${otro.color}; color:${otro.color};">
                ${otro.nombre} · ${terminoDe(otro.id, tipo)} ${idx + 1}: ${otroNombre}
            </button>
        </div>`;
}

// Navegación desde el índice / enlaces del panel
function octIr(oct, tipo, idx) {
    if (octaViewer) octaViewer.enfocar(oct, tipo, idx);
    else { mostrarInfoOctagrama(oct, tipo, idx); marcarIndice(oct, tipo, idx); }
    const panel = document.getElementById('octagon-info');
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Compatibilidad con llamadas antiguas (index 0-based, octagon 1|2, type vertex|side)
function navigateToElement(index, octagon, type) {
    octIr(octagon, type === 'vertex' ? 'vertice' : 'lado', index);
}

// ─── Índice HTML ─────────────────────────────────────────────────────────────
function construirIndiceOctagrama() {
    const cont = document.getElementById('octagon-index');
    if (!cont) return;

    const bloque = (cfg) => `
        <div class="oct-idx-col" style="--c:${cfg.color};">
            <div class="oct-idx-cab">
                <span class="oct-idx-punto"></span>
                <div>
                    <strong>${cfg.nombre}</strong>
                    <em>${cfg.subtitulo}</em>
                </div>
            </div>
            <div class="oct-idx-grupo">
                <div class="oct-idx-tit">${TERMINOS[cfg.id].vertices} <span>${TERMINOS[cfg.id].verticesSub}</span></div>
                <ol class="oct-idx-lista">
                    ${cfg.vertices.map((v, i) => `
                        <li data-oct="${cfg.id}" data-tipo="vertice" data-idx="${i}">
                            <span class="oct-idx-num">${v.n}</span>
                            <span class="oct-idx-txt">${cfg.id === 2 ? v.nombre + ' · ' + v.personaje : v.nombre}</span>
                        </li>`).join('')}
                </ol>
            </div>
            <div class="oct-idx-grupo">
                <div class="oct-idx-tit">${TERMINOS[cfg.id].lados} <span>${TERMINOS[cfg.id].ladosSub}</span></div>
                <ol class="oct-idx-lista">
                    ${cfg.lados.map((l, i) => `
                        <li data-oct="${cfg.id}" data-tipo="lado" data-idx="${i}">
                            <span class="oct-idx-num cuadro">${l.n}</span>
                            <span class="oct-idx-txt">${l.nombre}
                                ${cfg.id === 1 ? `<em>${l.de} → ${l.a}</em>` : `<em>${l.rol}</em>`}</span>
                        </li>`).join('')}
                </ol>
            </div>
            <div class="oct-idx-grupo">
                <div class="oct-idx-tit">${TERMINOS[cfg.id].procesos} <span>${TERMINOS[cfg.id].procesosSub}</span></div>
                <ol class="oct-idx-lista">
                    ${cfg.procesos.map((pr, i) => `
                        <li data-oct="${cfg.id}" data-tipo="proceso" data-idx="${i}">
                            <span class="oct-idx-num rombo">${pr.n}</span>
                            <span class="oct-idx-txt">${nombreProceso(cfg, i)}
                                <em>${cfg.id === 1 ? pr.de + ' → ' + pr.a : (i + 1) + ' ✕ ' + ((i + 3) % 8 + 1)}</em></span>
                        </li>`).join('')}
                </ol>
            </div>
            ${cfg.ciclos ? `
            <div class="oct-idx-grupo">
                <div class="oct-idx-tit">Ciclos <span>los 16 procesos, en cuatro giros</span></div>
                <ul class="oct-idx-ciclos">
                    ${cfg.ciclos.map(c => `
                        <li style="--cc:${c.color};">
                            <strong>${c.nombre}</strong>
                            <span>${c.ruta.map(e =>
                                `<a href="#" onclick="octIr(${cfg.id},'${e.tipo}',${e.idx});return false;">${
                                    (e.tipo === 'proceso' ? cfg.procesos : cfg.lados)[e.idx].nombre}</a>`
                            ).join(' → ')} ↺</span>
                        </li>`).join('')}
                </ul>
            </div>` : ''}
        </div>`;

    cont.innerHTML = bloque(OCTAGRAMAS[1]) + bloque(OCTAGRAMAS[2]);

    cont.querySelectorAll('li[data-oct]').forEach(li => {
        const oct = +li.dataset.oct, tipo = li.dataset.tipo, idx = +li.dataset.idx;
        li.addEventListener('click', () => octIr(oct, tipo, idx));
        li.addEventListener('mouseenter', () => octaViewer && octaViewer.destacar(oct, tipo, idx, true));
        li.addEventListener('mouseleave', () => octaViewer && octaViewer.destacar(oct, tipo, idx, false));
    });
}

function marcarIndice(oct, tipo, idx) {
    document.querySelectorAll('#octagon-index li[data-oct]').forEach(li => {
        li.classList.toggle('activo',
            +li.dataset.oct === oct && li.dataset.tipo === tipo && +li.dataset.idx === idx);
    });
}

function limpiarIndice() {
    document.querySelectorAll('#octagon-index li.activo').forEach(li => li.classList.remove('activo'));
}

/* =============================================================================
   MODALES: perfil MBTI y rol C-suite
   ========================================================================== */
function showMBTIInfo(code, idx) {
    const info = mbtiInfo[code];
    if (!info) return;
    const v = OCTAGRAMAS[2].vertices[idx];
    const vValor = OCTAGRAMAS[1].vertices[idx];

    document.getElementById('oct-modal-title').textContent = `${code} - ${info.nombre}`;
    document.getElementById('oct-modal-body').innerHTML = `
        <div class="oct-modal-sub">${v ? v.nombre + ' · ' + v.personaje + ' · ' + v.cargo : ''}</div>
        <p style="margin-bottom:1rem; line-height:1.7;">${info.descripcion}</p>
        <div class="oct-modal-caja verde">
            <div class="oct-modal-cap">Fortalezas</div>
            <p>${info.fortalezas}</p>
        </div>
        <div class="oct-modal-caja rosa">
            <div class="oct-modal-cap">Áreas de desarrollo</div>
            <p>${info.desafios}</p>
        </div>`;
    document.getElementById('oct-modal-footer').innerHTML = `
        <button class="oct-modal-btn" style="--c:#c0392b" onclick="closeOctModal(); octIr(1,'vertice',${idx});">
            → Vértice ${idx + 1} de Valor: ${vValor.nombre}
        </button>
        <button class="oct-modal-btn" style="--c:#2563eb" onclick="closeOctModal(); octIr(2,'lado',${idx});">
            → Mercado ${idx + 1} Cerebral: ${OCTAGRAMAS[2].lados[idx].nombre}
        </button>`;
    document.getElementById('oct-modal').style.display = 'flex';
}

function showRoleInfo(role, idx) {
    const v = OCTAGRAMAS[2].vertices[idx];
    const l = OCTAGRAMAS[2].lados[idx];
    if (!v) return;

    document.getElementById('oct-modal-title').textContent = `${v.nombre} - ${v.cargo}`;
    document.getElementById('oct-modal-body').innerHTML = `
        <div class="oct-modal-sub">${v.personaje} · ${v.mbti}</div>
        <p style="line-height:1.7; margin-bottom:1rem;">${l.desc}</p>
        <div class="oct-modal-caja azul">
            <div class="oct-modal-cap">Perfil</div>
            <p>${v.rasgo}<br>Interés vital: <b>${v.interes}</b> · Fórmula: <b>${v.formula}</b> · Modo de ser: <b>${v.modo}</b></p>
        </div>`;
    document.getElementById('oct-modal-footer').innerHTML = `
        <button class="oct-modal-btn" style="--c:#2563eb" onclick="closeOctModal(); octIr(2,'vertice',${idx});">
            → Vértice ${idx + 1} Cerebral: ${v.nombre}
        </button>
        <button class="oct-modal-btn" style="--c:#c0392b" onclick="closeOctModal(); octIr(1,'lado',${idx});">
            → Lado ${idx + 1} de Valor: ${OCTAGRAMAS[1].lados[idx].nombre}
        </button>`;
    document.getElementById('oct-modal').style.display = 'flex';
}

function closeOctModal() {
    const m = document.getElementById('oct-modal');
    if (m) m.style.display = 'none';
}

// ─── Arranque ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    construirIndiceOctagrama();
    infoInicial();
    try { initialize3DOctagon(); } catch (e) { console.error('Octagrama 3D:', e); }

    const modal = document.getElementById('oct-modal');
    if (modal) {
        modal.addEventListener('click', function (e) { if (e.target === this) closeOctModal(); });
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeOctModal();
    });
});
