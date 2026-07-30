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
     · En el Octagrama Cerebral no hay procesos: los lados son los MERCADOS de
       cada gerente (flechas que salen del vértice hacia su mercado) y los cruces
       son RELACIONES entre las personas, que conectan a todos con todos.
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
   mercados (flechas que salen de cada vértice) y relaciones (los cruces).
   -------------------------------------------------------------------------- */
const TERMINOS = {
    1: {
        vertice: 'Vértice', vertices: 'Vértices', verticesSub: 'resultados',
        lado: 'Lado', lados: 'Lados', ladosSub: 'procesos entre vértices contiguos',
        proceso: 'Proceso', procesos: 'Procesos', procesosSub: 'cruces del octagrama'
    },
    2: {
        vertice: 'Vértice', vertices: 'Vértices', verticesSub: 'quienes deciden',
        lado: 'Mercado', lados: 'Mercados', ladosSub: 'a dónde sale cada gerente',
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
const OCT_APOTEMA = OCT_R * Math.cos(Math.PI / 8);
const OCT_SEP = 0.92;                     // separación vertical entre octágonos
const OCT_ESPESOR = 0.10;

// Ángulo (plano X-Z) del vértice i (0-based). Vértice 1 → extremo inferior del
// lado vertical derecho; numeración antihoraria vista desde el frente.
function anguloVertice(i) { return Math.PI / 8 - i * Math.PI / 4; }
// Punto medio del lado i, que une los vértices i e i+1.
function anguloLado(i) { return -i * Math.PI / 4; }

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
        // Un poco más lejos que antes: las flechas de los mercados ensanchan el
        // Octagrama Cerebral y si no, se salen del cuadro.
        zoom: 7.5
    };

    // Estado de interacción
    const state = {
        drag: false, lastX: 0, lastY: 0,
        targetRX: VISTA.rx, targetRY: VISTA.ry,
        rx: VISTA.rx, ry: VISTA.ry,
        zoom: VISTA.zoom, targetZoom: VISTA.zoom,
        autoRotate: false,
        hovered: null,
        seleccionado: null
    };

    const piezas = [];      // elementos interactivos (vértices y lados)

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
                grupo.add(new THREE.Line(geo, mallaMat));
            };
            for (let i = 0; i < 8; i++) par(i, (i + 2) % 8);   // cruces cortos
            for (let i = 0; i < 4; i++) par(i, i + 4);         // diagonales largas
        }

        cfg.procesos.forEach((pr, i) => {
            const a = P[i], b = P[(i + 3) % 8];
            const g = crearProceso(a, b, yEstrella, cfg, i, pr);
            grupo.add(g);
            piezas.push(g);

            // La insignia no va al centro de la cuerda, donde se amontonarían las
            // ocho sobre el título, sino cerca del vértice del que arranca.
            const t = 0.24;
            const badge = crearInsignia(String(pr.n), cfg.color, '#ffffff', 'rombo');
            badge.position.set(
                a.x + (b.x - a.x) * t, yEstrella + 0.06, a.z + (b.z - a.z) * t);
            grupo.add(badge);
            g.userData.badge = badge;
        });

        // ── Aristas del octágono (barra fina de referencia) ───────────────────
        const aristaMat = new THREE.MeshBasicMaterial({
            color: cfg.hexOscuro, transparent: true, opacity: 0.35
        });
        for (let i = 0; i < 8; i++) {
            grupo.add(viga(P[i], P[(i + 1) % 8], 0.012, aristaMat, yTop + 0.006));
        }

        // ── Vértices ─────────────────────────────────────────────────────────
        cfg.vertices.forEach((v, i) => {
            const a = anguloVertice(i);
            const pos = new THREE.Vector3(Math.cos(a) * OCT_R, yTop + 0.02, Math.sin(a) * OCT_R);
            const g = crearVertice(pos, cfg, i, v);
            grupo.add(g);
            piezas.push(g);

            // Insignia numérica siempre legible. En el Cerebral se guarda hacia
            // adentro para dejarle sitio a la flecha del mercado.
            const rb = cfg.id === 2 ? OCT_R - 0.20 : OCT_R + 0.17;
            const badge = crearInsignia(String(v.n), cfg.color, '#ffffff');
            badge.position.set(Math.cos(a) * rb, yTop + 0.08, Math.sin(a) * rb);
            grupo.add(badge);
            g.userData.badge = badge;
        });

        // ── Lados ────────────────────────────────────────────────────────────
        // Valor: barrita conectora sobre la arista, entre dos vértices contiguos.
        // Cerebral: flecha que sale del vértice del gerente hacia su mercado.
        cfg.lados.forEach((l, i) => {
            const esMercado = cfg.id === 2;
            const a = esMercado ? anguloVertice(i) : anguloLado(i);
            const rPieza = esMercado ? OCT_R + 0.30 : OCT_APOTEMA;
            const pos = new THREE.Vector3(Math.cos(a) * rPieza, yTop + 0.02, Math.sin(a) * rPieza);
            const g = esMercado ? crearMercado(pos, a, cfg, i, l) : crearLado(pos, a, cfg, i, l);
            grupo.add(g);
            piezas.push(g);

            const rb = esMercado ? OCT_R + 0.66 : OCT_APOTEMA - 0.17;
            const badge = crearInsignia(String(l.n), '#ffffff', cfg.color, 'anillo');
            badge.position.set(Math.cos(a) * rb, yTop + 0.07, Math.sin(a) * rb);
            grupo.add(badge);
            g.userData.badge = badge;
        });

        // Título al centro de la placa, justo sobre la cara superior.
        const titulo = crearTituloCentral(cfg.centro, cfg.color);
        titulo.position.set(0, yTop + 0.20, 0);
        grupo.add(titulo);

        return { grupo, placaMat };
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

        const nucleoMat = new THREE.MeshPhongMaterial({
            color: COL.marca, emissive: cfg.hexOscuro, emissiveIntensity: 0.35, shininess: 120
        });
        g.add(new THREE.Mesh(new THREE.SphereGeometry(0.085, 24, 24), nucleoMat));

        const auraMat = new THREE.MeshBasicMaterial({
            color: cfg.hex, transparent: true, opacity: 0.22, depthWrite: false
        });
        const aura = new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 20), auraMat);
        g.add(aura);

        g.position.copy(pos);
        g.userData = {
            tipo: 'vertice', idx: i, oct: cfg.id, datos: datos, cfg: cfg,
            nucleoMat, auraMat, aura, activo: false,
            colorNormal: COL.marca, opacidadNormal: 1, auraNormal: 0.22,
            titulo: cfg.id === 2 ? datos.nombre + ' · ' + datos.personaje : datos.nombre
        };
        return g;
    }

    function crearLado(pos, ang, cfg, i, datos) {
        const g = new THREE.Group();
        const largo = 2 * OCT_R * Math.sin(Math.PI / 8) * 0.56;

        const nucleoMat = new THREE.MeshPhongMaterial({
            color: COL.marca, emissive: cfg.hexOscuro, emissiveIntensity: 0.35, shininess: 120
        });
        const barra = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, largo, 16), nucleoMat);
        barra.rotation.z = Math.PI / 2;
        g.add(barra);

        // Remates redondeados
        [-largo / 2, largo / 2].forEach(dx => {
            const cap = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), nucleoMat);
            cap.position.x = dx;
            g.add(cap);
        });

        const auraMat = new THREE.MeshBasicMaterial({
            color: cfg.hex, transparent: true, opacity: 0.20, depthWrite: false
        });
        const aura = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, largo * 1.05, 16), auraMat);
        aura.rotation.z = Math.PI / 2;
        g.add(aura);

        g.position.copy(pos);
        // Alinea el eje largo (X local) con la dirección de la arista
        g.rotation.y = -ang - Math.PI / 2;

        g.userData = {
            tipo: 'lado', idx: i, oct: cfg.id, datos: datos, cfg: cfg,
            nucleoMat, auraMat, aura, activo: false,
            colorNormal: COL.marca, opacidadNormal: 1, auraNormal: 0.20,
            titulo: datos.nombre
        };
        return g;
    }

    // Mercado (Cerebral): flecha que sale del vértice de un gerente hacia afuera.
    // No une dos vértices, porque el mercado es de un solo gerente, y por eso se dibuja
    // como «semi lado»: un vástago corto rematado en punta.
    function crearMercado(pos, ang, cfg, i, datos) {
        const g = new THREE.Group();
        const vastago = 0.20, punta = 0.16;

        const nucleoMat = new THREE.MeshPhongMaterial({
            color: COL.marca, emissive: cfg.hexOscuro, emissiveIntensity: 0.35, shininess: 120
        });

        const barra = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, vastago, 14), nucleoMat);
        barra.rotation.z = -Math.PI / 2;          // eje largo sobre +X local
        barra.position.x = -punta / 2;
        g.add(barra);

        const cono = new THREE.Mesh(new THREE.ConeGeometry(0.075, punta, 16), nucleoMat);
        cono.rotation.z = -Math.PI / 2;
        cono.position.x = vastago / 2;
        g.add(cono);

        const auraMat = new THREE.MeshBasicMaterial({
            color: cfg.hex, transparent: true, opacity: 0.20, depthWrite: false
        });
        const aura = new THREE.Mesh(
            new THREE.CylinderGeometry(0.085, 0.085, (vastago + punta) * 1.05, 14), auraMat);
        aura.rotation.z = Math.PI / 2;
        g.add(aura);

        g.position.copy(pos);
        // +X local apunta hacia afuera, en la dirección del vértice
        g.rotation.y = -ang;

        g.userData = {
            tipo: 'lado', idx: i, oct: cfg.id, datos: datos, cfg: cfg,
            nucleoMat, auraMat, aura, activo: false,
            colorNormal: COL.marca, opacidadNormal: 1, auraNormal: 0.20,
            titulo: datos.nombre,
            detalle: datos.rol + ' · ' + cfg.vertices[i].personaje
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
            colorNormal: cfg.hex, opacidadNormal: 0.6, auraNormal: 0.07,
            titulo: nombreProceso(cfg, i),
            detalle: nombreVertice(cfg, i) + ' ✕ ' + nombreVertice(cfg, (i + 3) % 8)
        };
        return g;
    }

    // ── Sprites de texto ─────────────────────────────────────────────────────
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
    for (let i = 0; i < 8; i++) {
        const a = anguloVertice(i);
        const x = Math.cos(a) * OCT_R, z = Math.sin(a) * OCT_R;
        const barra = new THREE.Mesh(
            new THREE.CylinderGeometry(0.014, 0.014, yArriba - yAbajo, 6), aprendizajeMat);
        barra.position.set(x, (yArriba + yAbajo) / 2, z);
        root.add(barra);
    }

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
            if (ch.isMesh) { ch.userData.pieza = p; out.push(ch); }
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
        u.auraMat.opacity = u.tipo === 'proceso' ? 0.34 : 0.55;
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
        u.auraMat.opacity = u.tipo === 'proceso' ? 0.3 : 0.5;
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
            state.targetRY += dx * 0.008;
            state.targetRX = Math.max(-0.25, Math.min(1.15, state.targetRX + dy * 0.006));
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
        state.targetZoom = Math.max(4.2, Math.min(9.5, state.targetZoom + ev.deltaY * 0.0025));
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

    octaViewer = {
        enfocar(oct, tipo, idx) {
            const p = piezaDe(oct, tipo, idx);
            if (!p) return;
            // El punto medio del cruce cae sobre la bisectriz del lado idx+1; el
            // mercado del Cerebral sale del vértice, no del centro de la arista.
            const ang = tipo === 'vertice' ? anguloVertice(idx)
                : tipo === 'proceso' ? anguloLado(idx + 1)
                : oct === 2 ? anguloVertice(idx)
                : anguloLado(idx);
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
            state.targetRX = VISTA.rx;
            state.targetRY = masCercano(VISTA.ry, state.targetRY);   // vuelta más corta
            state.targetZoom = VISTA.zoom;
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

        if (state.autoRotate && !state.drag) state.targetRY += 0.0022;

        state.rx += (state.targetRX - state.rx) * 0.08;
        state.ry += (state.targetRY - state.ry) * 0.08;
        state.zoom += (state.targetZoom - state.zoom) * 0.1;

        root.rotation.x = state.rx;
        root.rotation.y = state.ry;
        camera.position.z = state.zoom;

        // Pulso sutil en las auras no resaltadas
        const pulso = 1 + Math.sin(t * 1.6) * 0.05;
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
            deciden (vértices). De cada uno sale una flecha hacia el <strong>mercado</strong> en
            el que interviene, y los cruces no son procesos sino <strong>relaciones</strong>
            entre las personas, formales o informales, que conectan a todos con todos.</p>
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
                ${d.qa.map(q => `<div class="oct-qa"><span>${q[0]}</span><b>${q[1]}</b></div>`).join('')}
                <div class="oct-nota">E: Empatía · R: Racionalidad</div>
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
