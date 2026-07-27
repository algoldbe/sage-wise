/* =============================================================================
   MODELO OCTAGRAMAL — Sage-Wise
   Datos oficiales tomados de:
     · TEXTOS OCTAGRAMA DE VALOR.pptx   (octágono superior)
     · TEXTOS OCTAGRAMA CEREBRAL.pptx   (octágono inferior)

   Geometría (confirmada con los diagramas de los PPT):
     · El vértice 1 ocupa el extremo inferior del lado vertical derecho.
     · La numeración avanza en sentido ANTIHORARIO.
     · El lado N conecta el vértice N con el vértice N+1.
     · Las líneas que cruzan entre vértices son los dos cuadrados inscritos
       (1-3-5-7 y 2-4-6-8) que forman el octagrama propiamente dicho.
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
                escala: ['Relación costo — beneficio.'],
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
                n: 1, nombre: 'Experiencia del Cliente',
                desc: 'El <strong>vínculo</strong> entre personalización y satisfacción es la <em>experiencia del cliente</em>, quien goza del bien suministrado y ve cumplidas sus expectativas.'
            },
            {
                n: 2, nombre: 'Portafolio de Negocios',
                desc: 'Un sector de negocio emerge cuando se empata una necesidad segmentada con un satisfactor diferenciado. El <strong>portafolio de negocios</strong> es un conjunto de estos sectores. Se trata de asegurar un portafolio en el que un número de sectores de negocio estén bien posicionados en mercados atractivos.'
            },
            {
                n: 3, nombre: 'Desarrollo de un Prototipo',
                desc: 'El <strong>vínculo</strong> entre innovación (I&amp;D) y prestigio (MKT) es el <em>desarrollo de un prototipo</em> que pruebe ser comercialmente viable.'
            },
            {
                n: 4, nombre: 'Propuesta de Valor',
                desc: 'Una negociación ganar-ganar alinea la promesa y la entrega de valor por medio de un <strong>contrato</strong> de compra-venta en el que se especifican los requisitos de calidad y costo que han de cumplirse. La negociación se lleva a cabo no sólo con los clientes, sino con <em>todos los grupos de interés</em> que aportan sus recursos.'
            },
            {
                n: 5, nombre: 'Abastecimiento de Insumos',
                desc: 'El <strong>vínculo</strong> entre logística e informática son los procesos de <em>abastecimiento de los insumos</em> que requiere la empresa para cumplir con su misión. Este proceso capta asimismo la retroalimentación de los clientes para optimizar la cadena de suministro de valor.'
            },
            {
                n: 6, nombre: 'Organización Competente',
                desc: 'Una <strong>organización competente</strong> es aquélla que tiene sistemas de información efectivos que apoyan a gente capacitada. Las competencias organizacionales emergen cuando se conecta la información con el conocimiento. Se provee de información oportuna y confiable a personas y equipos de trabajo dispuestos a aprender.'
            },
            {
                n: 7, nombre: 'Asignación de Recursos',
                desc: 'El <strong>vínculo</strong> entre rendimiento y talento es la <em>asignación de recursos</em> por medio de presupuestos realistas que especifican quién aporta las capacidades y en qué se aplican.'
            },
            {
                n: 8, nombre: 'Captura de Valor',
                desc: 'La <strong>captura</strong> del mayor valor posible para el inversionista depende no sólo del valor agregado, sino también de las palancas que se han aplicado, equilibrando riesgo y rentabilidad. El cliente ya ha experimentado el valor prometido y ha satisfecho sus expectativas.'
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
        lados: [
            {
                n: 1, nombre: 'Mercados de Clientes', rol: 'CSO',
                desc: 'El <strong>CSO</strong> interviene en los mercados de clientes, consumidores finales o intermedios, donde identifica las necesidades que la empresa puede atender y negocia los términos y condiciones para atenderlas. Obtiene retroalimentación de sus clientes para mejorar los procesos de suministro de valor.'
            },
            {
                n: 2, nombre: 'Mercados Fabriles', rol: 'COO',
                desc: 'El <strong>COO</strong> es el encargado de que las cosas sucedan en la organización. Si bien permanece la mayor parte del tiempo dentro de la empresa liderando grupos de trabajo, ocasionalmente atiende los mercados fabriles para conseguir equipo o refacciones y contratar el mantenimiento de los activos fijos de la empresa.'
            },
            {
                n: 3, nombre: 'Mercados Tecnológicos', rol: 'CTO',
                desc: 'El <strong>CTO</strong> interviene en los mercados tecnológicos, donde identifica las tecnologías de vanguardia aplicables a los prototipos que desarrolla la empresa o a sus procesos. Negocia acuerdos de licencia tecnológica, adjudicación de patentes, desarrollos de productos innovadores, entre otros.'
            },
            {
                n: 4, nombre: 'Mercados de Medios', rol: 'CMO',
                desc: 'El <strong>CMO</strong> interviene en los mercados de medios publicitarios, donde identifica la mejor manera de promover los productos y servicios de la empresa y de desarrollar una buena imagen de sus marcas. Lleva a cabo estudios de mercado para formular e implementar las estrategias de precio y cobertura de clientes.'
            },
            {
                n: 5, nombre: 'Mercados de Proveedores', rol: 'CPO',
                desc: 'El <strong>CPO</strong> interviene en los mercados de proveedores de insumos para la empresa. Es responsable de la estructura de costos primarios y negocia con los proveedores las mejores condiciones de entrega y plazos de pago.'
            },
            {
                n: 6, nombre: 'Mercados de TIC’s', rol: 'CIO',
                desc: 'El <strong>CIO</strong> interviene en los mercados de tecnologías de información y comunicaciones para adquirir los sistemas informáticos que brinden las mejores herramientas para la toma de decisiones y el aprendizaje organizacional.'
            },
            {
                n: 7, nombre: 'Mercados Laborales', rol: 'CHO',
                desc: 'El <strong>CHO</strong> interviene en los mercados laborales para seleccionar y contratar a la mejor gente para la empresa. Es responsable de establecer los medios para aprovechar el talento del personal y de capacitarlo, así como de establecer métricas adecuadas para la evaluación del desempeño.'
            },
            {
                n: 8, nombre: 'Mercados Financieros', rol: 'CFO',
                desc: 'El <strong>CFO</strong> interviene en los mercados financieros, sea de capitales o de deuda, para obtener en las mejores condiciones posibles el dinero que requiere la empresa para financiar sus inversiones fijas y en capital de trabajo. Es responsable también de la cobranza.'
            }
        ]
    }
};

/* ─── Procesos: las líneas que cruzan entre vértices ──────────────────────────
   El proceso N enlaza el vértice N con el vértice N+2 (los dos cuadrados
   inscritos 1-3-5-7 y 2-4-6-8).

   PENDIENTE: en cuanto lleguen los nombres definitivos basta con rellenar
   `nombre` y `desc` de cada entrada; el resto del sitio (modelo 3D, índice,
   panel y glosario) los toma de aquí automáticamente.
   -------------------------------------------------------------------------- */
[1, 2].forEach(function (id) {
    OCTAGRAMAS[id].procesos = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
        return { n: n, nombre: '', desc: '' };
    });
});

// Nombre corto de un vértice (en el Cerebral incluye el personaje)
function nombreVertice(cfg, i) {
    const v = cfg.vertices[i];
    return cfg.id === 2 ? v.nombre + ' · ' + v.personaje : v.nombre;
}

// Nombre a mostrar de un proceso (provisional mientras no haya nombre propio)
function nombreProceso(cfg, i) {
    const pr = cfg.procesos[i];
    return pr.nombre || ('Proceso ' + pr.n);
}

// Descripción a mostrar de un proceso
function descProceso(cfg, i) {
    const pr = cfg.procesos[i];
    if (pr.desc) return pr.desc;
    const a = cfg.vertices[i];
    const b = cfg.vertices[(i + 2) % 8];
    const nom = x => cfg.id === 2 ? x.nombre + ' · ' + x.personaje : x.nombre;
    return 'Línea que cruza el octágono y enlaza dos vértices no contiguos: <strong>' +
        nom(a) + '</strong> y <strong>' + nom(b) + '</strong>. Junto con las otras siete forma ' +
        'los dos cuadrados inscritos que convierten al octágono en octagrama.';
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

    // Estado de interacción
    const state = {
        drag: false, lastX: 0, lastY: 0,
        targetRX: 0.50, targetRY: -0.35,
        rx: 0.50, ry: -0.35,
        zoom: 6.9, targetZoom: 6.9,
        autoRotate: true,
        mostrarNombres: false,
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
        // Los nombres del octágono superior se dibujan hacia arriba y los del
        // inferior hacia abajo, para que no se encimen en el espacio intermedio.
        const dir = yBase >= 0 ? 1 : -1;
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

        // ── Procesos: las líneas que cruzan entre vértices ────────────────────
        // Son los dos cuadrados inscritos (1-3-5-7 y 2-4-6-8), que juntos dan los
        // ocho segmentos: el proceso N enlaza el vértice N con el vértice N+2.
        const yEstrella = yTop + 0.016;
        cfg.procesos.forEach((pr, i) => {
            const a = P[i], b = P[(i + 2) % 8];
            const g = crearProceso(a, b, yEstrella, cfg, i, pr);
            grupo.add(g);
            piezas.push(g);

            // El punto medio de la cuerda queda sobre la bisectriz del vértice i+1
            const am = anguloVertice(i + 1);
            const rm = OCT_R * Math.cos(Math.PI / 4);
            const badge = crearInsignia(String(pr.n), cfg.color, '#ffffff', 'rombo');
            badge.position.set(Math.cos(am) * rm, yEstrella + 0.06, Math.sin(am) * rm);
            grupo.add(badge);
            g.userData.badge = badge;

            const etiqueta = crearEtiqueta(nombreProceso(cfg, i), cfg.color, 'proceso');
            etiqueta.position.set(Math.cos(am) * (rm * 1.3), yEstrella + 0.30 * dir, Math.sin(am) * (rm * 1.3));
            grupo.add(etiqueta);
            g.userData.etiqueta = etiqueta;
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

            // Insignia numérica siempre legible
            const badge = crearInsignia(String(v.n), cfg.color, '#ffffff');
            badge.position.set(Math.cos(a) * (OCT_R + 0.17), yTop + 0.08, Math.sin(a) * (OCT_R + 0.17));
            grupo.add(badge);
            g.userData.badge = badge;

            // Nombre permanente
            const etiqueta = crearEtiqueta(
                cfg.id === 2 ? v.nombre + ' · ' + v.personaje : v.nombre, cfg.color, 'vertice'
            );
            etiqueta.position.set(Math.cos(a) * (OCT_R + 0.80), yTop + 0.42 * dir, Math.sin(a) * (OCT_R + 0.80));
            grupo.add(etiqueta);
            g.userData.etiqueta = etiqueta;
        });

        // ── Lados (barritas conectoras sobre la arista) ───────────────────────
        cfg.lados.forEach((l, i) => {
            const a = anguloLado(i);
            const pos = new THREE.Vector3(Math.cos(a) * OCT_APOTEMA, yTop + 0.02, Math.sin(a) * OCT_APOTEMA);
            const g = crearLado(pos, a, cfg, i, l);
            grupo.add(g);
            piezas.push(g);

            const badge = crearInsignia(String(l.n), '#ffffff', cfg.color, 'anillo');
            badge.position.set(Math.cos(a) * (OCT_APOTEMA - 0.17), yTop + 0.07, Math.sin(a) * (OCT_APOTEMA - 0.17));
            grupo.add(badge);
            g.userData.badge = badge;

            const etiqueta = crearEtiqueta(l.nombre, cfg.color, 'lado');
            etiqueta.position.set(Math.cos(a) * (OCT_R + 0.18), yTop + 0.06 * dir, Math.sin(a) * (OCT_R + 0.18));
            grupo.add(etiqueta);
            g.userData.etiqueta = etiqueta;
        });

        // Título al centro de la placa
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

    // Proceso: barra que cruza entre dos vértices no contiguos
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
            detalle: nombreVertice(cfg, i) + ' ✕ ' + nombreVertice(cfg, (i + 2) % 8)
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

    function crearEtiqueta(texto, color, tipo) {
        const escala = 3;
        const fs = 34;
        const medidor = document.createElement('canvas').getContext('2d');
        medidor.font = `600 ${fs}px "Segoe UI", Arial, sans-serif`;
        const w = Math.ceil(medidor.measureText(texto).width) + 44;
        const h = 66;

        const cv = document.createElement('canvas');
        cv.width = w * escala; cv.height = h * escala;
        const c = cv.getContext('2d');
        c.scale(escala, escala);

        redondeado(c, 3, 3, w - 6, h - 6, 12);
        c.fillStyle = 'rgba(255,255,255,0.96)';
        c.fill();
        c.lineWidth = tipo === 'vertice' ? 2.5 : 1.5;
        c.strokeStyle = color;
        c.stroke();

        c.font = `600 ${fs}px "Segoe UI", Arial, sans-serif`;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillStyle = '#1f2933';
        c.fillText(texto, w / 2, h / 2 + 1);

        const tex = new THREE.CanvasTexture(cv);
        tex.minFilter = THREE.LinearFilter;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({
            map: tex, transparent: true, depthTest: false, depthWrite: false, opacity: 0.94
        }));
        const k = 0.0036;
        sp.scale.set(w * k, h * k, 1);
        sp.renderOrder = 28;
        sp.userData.baseScale = sp.scale.clone();
        sp.visible = false;
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
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({
            map: tex, transparent: true, depthTest: false, depthWrite: false, opacity: 0.9
        }));
        const k = 0.0050;
        sp.scale.set(w * k, h * k, 1);
        sp.renderOrder = 12;
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

    const NOMBRE_TIPO = { vertice: 'Vértice', lado: 'Lado', proceso: 'Proceso' };

    function mostrarTip(p, ev) {
        const u = p.userData;
        const etiquetaN = NOMBRE_TIPO[u.tipo] + ' ' + (u.idx + 1);
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

    function mostrarEtiqueta(u, escalar) {
        if (!u.etiqueta || !state.mostrarNombres) return;
        u.etiqueta.userData.fijo = true;
        u.etiqueta.material.opacity = 1;
        u.etiqueta.scale.copy(u.etiqueta.userData.baseScale).multiplyScalar(escalar);
    }

    function resaltar(p) {
        const u = p.userData;
        pintar(u, u.tipo === 'vertice' ? COL.hoverVertice : COL.hoverLado, 0.75, 1);
        u.auraMat.opacity = u.tipo === 'proceso' ? 0.34 : 0.55;
        if (u.tipo !== 'proceso') p.scale.setScalar(1.35);
        mostrarEtiqueta(u, 1.22);
        if (u.badge) u.badge.scale.setScalar(0.21);
    }

    function normalizar(p) {
        const u = p.userData;
        if (u.activo) return activar(p);
        pintar(u, u.colorNormal, 0.35, u.opacidadNormal);
        u.auraMat.opacity = u.auraNormal;
        p.scale.setScalar(1);
        if (u.etiqueta) {
            u.etiqueta.userData.fijo = false;
            u.etiqueta.visible = state.mostrarNombres;
            u.etiqueta.scale.copy(u.etiqueta.userData.baseScale);
        }
        if (u.badge) u.badge.scale.setScalar(u.tipo === 'proceso' ? 0.14 : 0.155);
    }

    function activar(p) {
        const u = p.userData;
        pintar(u, COL.activo, 0.85, 1);
        u.auraMat.opacity = u.tipo === 'proceso' ? 0.3 : 0.5;
        if (u.tipo !== 'proceso') p.scale.setScalar(1.25);
        mostrarEtiqueta(u, 1);
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
            sincronizarBotonAuto();
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

    octaViewer = {
        enfocar(oct, tipo, idx) {
            const p = piezaDe(oct, tipo, idx);
            if (!p) return;
            // El punto medio del proceso cae sobre la bisectriz del vértice idx+1
            const ang = tipo === 'vertice' ? anguloVertice(idx)
                : tipo === 'proceso' ? anguloVertice(idx + 1)
                : anguloLado(idx);
            // Deja el elemento al frente (dirección +Z) y suaviza la vuelta más corta
            let destino = ang - Math.PI / 2;
            while (destino - state.targetRY > Math.PI) destino -= Math.PI * 2;
            while (destino - state.targetRY < -Math.PI) destino += Math.PI * 2;
            state.targetRY = destino;
            state.targetRX = tipo === 'proceso' ? 0.62 : (oct === 1 ? 0.55 : 0.34);
            state.autoRotate = false;
            sincronizarBotonAuto();
            seleccionar(p);
        },
        destacar(oct, tipo, idx, on) {
            const p = piezaDe(oct, tipo, idx);
            if (!p) return;
            if (on) resaltar(p); else normalizar(p);
        },
        girar(delta) { state.targetRY += delta; state.autoRotate = false; sincronizarBotonAuto(); },
        reiniciar() {
            state.targetRX = 0.50; state.targetRY = -0.35; state.targetZoom = 6.9;
            if (state.seleccionado) { state.seleccionado.userData.activo = false; normalizar(state.seleccionado); state.seleccionado = null; }
            limpiarIndice();
            infoInicial();
        },
        vistaSuperior() { state.targetRX = 1.15; state.autoRotate = false; sincronizarBotonAuto(); },
        alternarAuto() { state.autoRotate = !state.autoRotate; sincronizarBotonAuto(); return state.autoRotate; },
        alternarNombres() {
            state.mostrarNombres = !state.mostrarNombres;
            piezas.forEach(p => {
                const e = p.userData.etiqueta;
                if (e) e.visible = state.mostrarNombres || !!e.userData.fijo;
            });
            // Con todos los nombres a la vista hace falta un poco más de aire
            state.targetZoom = state.mostrarNombres ? 7.9 : 6.9;
            return state.mostrarNombres;
        },
        zoom(d) { state.targetZoom = Math.max(4.2, Math.min(9.5, state.targetZoom + d)); }
    };

    function sincronizarBotonAuto() {
        const b = document.getElementById('oct-btn-auto');
        if (b) b.classList.toggle('activo', state.autoRotate);
    }
    sincronizarBotonAuto();

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
        const _v = new THREE.Vector3();
        piezas.forEach(p => {
            if (!p.userData.activo && p !== state.hovered) p.userData.aura.scale.setScalar(pulso);

            // Los nombres del fondo se atenúan para no estorbar la lectura
            const e = p.userData.etiqueta;
            if (e && e.visible && !e.userData.fijo) {
                e.getWorldPosition(_v).applyMatrix4(camera.matrixWorldInverse);
                const prof = -_v.z;                       // distancia a la cámara
                const k = (state.zoom + 1.35 - prof) / 2.7;
                // Sólo se leen los nombres del frente; los del fondo se apagan.
                const f = Math.max(0, Math.min(1, (k - 0.42) / 0.42));
                e.material.opacity = f * f * 0.97;
            }
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
            <strong style="color:#c0392b">Octagrama de Valor</strong> reúne los resultados
            (vértices) y los vínculos que los enlazan (lados). El
            <strong style="color:#2563eb">Octagrama Cerebral</strong> reúne a quienes deciden
            (vértices) y los mercados donde intervienen (lados).</p>
            <p>Las líneas que cruzan entre los vértices —los dos cuadrados inscritos— son
            los <strong>procesos</strong>: cada uno enlaza dos vértices que no son vecinos y
            son los que convierten al octágono en octagrama.</p>
            <p class="oct-info-cta">Gire el modelo y seleccione cualquier vértice, lado o
            proceso, o elija un elemento del índice.</p>
        </div>`;
}

function mostrarInfoOctagrama(oct, tipo, idx) {
    const panel = document.getElementById('octagon-info');
    if (!panel) return;
    const cfg = OCTAGRAMAS[oct];
    const otro = OCTAGRAMAS[oct === 1 ? 2 : 1];
    const coleccion = tipo === 'vertice' ? 'vertices' : tipo === 'proceso' ? 'procesos' : 'lados';
    const d = cfg[coleccion][idx];
    const etiquetaTipo = tipo === 'vertice' ? 'Vértice' : tipo === 'proceso' ? 'Proceso' : 'Lado';

    // Nombre corto de un vértice (en el Cerebral incluye el personaje)
    const nomV = (c, k) => c.id === 2
        ? `${c.vertices[k].nombre} · ${c.vertices[k].personaje}`
        : c.vertices[k].nombre;

    let titulo, cuerpo = '';

    if (tipo === 'proceso') {
        // El proceso N cruza el octágono entre los vértices N y N+2
        const j = (idx + 2) % 8;
        titulo = nombreProceso(cfg, idx);
        cuerpo = `
            <div class="oct-vincula">Cruza entre
                <a href="#" onclick="octIr(${oct},'vertice',${idx});return false;">${idx + 1} · ${nomV(cfg, idx)}</a>
                <span>✕</span>
                <a href="#" onclick="octIr(${oct},'vertice',${j});return false;">${j + 1} · ${nomV(cfg, j)}</a>
            </div>
            <p class="oct-p">${descProceso(cfg, idx)}</p>`;
    } else if (oct === 1 && tipo === 'vertice') {
        titulo = d.nombre;
        cuerpo = `
            <p class="oct-p">${d.desc}</p>
            <div class="oct-caja" style="border-color:${cfg.color}22;">
                <div class="oct-caja-tit">${d.pregunta}</div>
                <ul class="oct-lista">${d.escala.map(e => `<li>${e}</li>`).join('')}</ul>
                <div class="oct-grad" style="background:${cfg.color}12; color:${cfg.color};">${d.gradiente}</div>
            </div>`;
    } else if (oct === 1) {
        const a = cfg.vertices[idx].nombre;
        const b = cfg.vertices[(idx + 1) % 8].nombre;
        titulo = d.nombre;
        cuerpo = `
            <div class="oct-vincula">Conecta
                <a href="#" onclick="octIr(1,'vertice',${idx});return false;">${idx + 1} · ${a}</a>
                <span>↔</span>
                <a href="#" onclick="octIr(1,'vertice',${(idx + 1) % 8});return false;">${(idx + 1) % 8 + 1} · ${b}</a>
            </div>
            <p class="oct-p">${d.desc}</p>`;
    } else if (tipo === 'vertice') {
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
    } else {
        const a = cfg.vertices[idx].nombre;
        const b = cfg.vertices[(idx + 1) % 8].nombre;
        titulo = d.nombre;
        cuerpo = `
            <div class="oct-vincula">Conecta
                <a href="#" onclick="octIr(2,'vertice',${idx});return false;">${idx + 1} · ${a}</a>
                <span>↔</span>
                <a href="#" onclick="octIr(2,'vertice',${(idx + 1) % 8});return false;">${(idx + 1) % 8 + 1} · ${b}</a>
            </div>
            <p class="oct-p">${d.desc}</p>`;
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
            <span>Elemento correspondiente</span>
            <button onclick="octIr(${otro.id},'${tipo}',${idx})" style="border-color:${otro.color}; color:${otro.color};">
                ${otro.nombre} · ${etiquetaTipo} ${idx + 1} — ${otroNombre}
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
                <div class="oct-idx-tit">Vértices <span>${cfg.id === 1 ? 'resultados' : 'quienes deciden'}</span></div>
                <ol class="oct-idx-lista">
                    ${cfg.vertices.map((v, i) => `
                        <li data-oct="${cfg.id}" data-tipo="vertice" data-idx="${i}">
                            <span class="oct-idx-num">${v.n}</span>
                            <span class="oct-idx-txt">${cfg.id === 2 ? v.nombre + ' · ' + v.personaje : v.nombre}</span>
                        </li>`).join('')}
                </ol>
            </div>
            <div class="oct-idx-grupo">
                <div class="oct-idx-tit">Lados <span>${cfg.id === 1 ? 'vínculos' : 'mercados'}</span></div>
                <ol class="oct-idx-lista">
                    ${cfg.lados.map((l, i) => `
                        <li data-oct="${cfg.id}" data-tipo="lado" data-idx="${i}">
                            <span class="oct-idx-num cuadro">${l.n}</span>
                            <span class="oct-idx-txt">${l.nombre}</span>
                        </li>`).join('')}
                </ol>
            </div>
            <div class="oct-idx-grupo">
                <div class="oct-idx-tit">Procesos <span>líneas cruzadas</span></div>
                <ol class="oct-idx-lista">
                    ${cfg.procesos.map((pr, i) => `
                        <li data-oct="${cfg.id}" data-tipo="proceso" data-idx="${i}">
                            <span class="oct-idx-num rombo">${pr.n}</span>
                            <span class="oct-idx-txt">${nombreProceso(cfg, i)}
                                <em>${i + 1} ✕ ${(i + 2) % 8 + 1}</em></span>
                        </li>`).join('')}
                </ol>
            </div>
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

    document.getElementById('oct-modal-title').textContent = `${code} — ${info.nombre}`;
    document.getElementById('oct-modal-body').innerHTML = `
        <div class="oct-modal-sub">${v ? v.nombre + ' · ' + v.personaje + ' — ' + v.cargo : ''}</div>
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
            → Lado ${idx + 1} Cerebral: ${OCTAGRAMAS[2].lados[idx].nombre}
        </button>`;
    document.getElementById('oct-modal').style.display = 'flex';
}

function showRoleInfo(role, idx) {
    const v = OCTAGRAMAS[2].vertices[idx];
    const l = OCTAGRAMAS[2].lados[idx];
    if (!v) return;

    document.getElementById('oct-modal-title').textContent = `${v.nombre} — ${v.cargo}`;
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

/* =============================================================================
   CONTROLES DE LA BARRA
   ========================================================================== */
function octControl(accion) {
    if (!octaViewer) return;
    switch (accion) {
        case 'izq': octaViewer.girar(Math.PI / 4); break;
        case 'der': octaViewer.girar(-Math.PI / 4); break;
        case 'auto': octaViewer.alternarAuto(); break;
        case 'superior': octaViewer.vistaSuperior(); break;
        case 'reiniciar': octaViewer.reiniciar(); break;
        case 'zoom+': octaViewer.zoom(-0.6); break;
        case 'zoom-': octaViewer.zoom(0.6); break;
        case 'nombres': {
            const on = octaViewer.alternarNombres();
            const b = document.getElementById('oct-btn-nombres');
            if (b) b.classList.toggle('activo', on);
            break;
        }
    }
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
