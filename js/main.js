// Global variables
let currentQuestion = 0;
let quizData = null;
let userAnswers = [];


// Document ready initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeTabNavigation();
    // El modelo del Octagrama se inicializa en js/octagrama.js
    try { initializeChat(); } catch(e) { console.error('Chat error:', e); }
    try { loadQuizData(); } catch(e) { console.error('Quiz error:', e); }
    // Glossary search is now inline in index.html
});

// Glossary search moved to inline script in index.html

// Tab Navigation Functions
function initializeTabNavigation() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabLinks.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to selected tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}


// ─────────────────────────────────────────────────────────────────────────────

// ─── Diagnóstico 3D ──────────────────────────────────────────────────────────

async function loadQuizData() {
    // Inline data — avoids fetch() which is blocked under file:// protocol
    quizData = {
  "instrucciones": "Gradúe su respuesta del 1 (completamente en desacuerdo) al 5 (completamente de acuerdo).",
  "ejes": [
    {
      "id": "economico",
      "nombre": "Eje Económico",
      "color": "#c0392b",
      "icon": "fas fa-chart-line",
      "descripcion": "Evalúa la capacidad de la empresa para generar, medir y optimizar el valor económico a través de sus procesos, analítica y toma de decisiones.",
      "secciones": [
        {
          "id": "flujo_valor",
          "nombre": "Rastreo del Flujo de Valor",
          "descripcion": "Para rastrear el flujo de valor, se requiere un mapa que segregue las ambiciones y metas de la compañía en elementos organizacionales tangibles, tales como sectores de negocio, segmentos de mercado, grupos de clientes, líneas de producto y procesos clave.",
          "preguntas": [
            { "id": 1, "texto": "Los procesos de mi empresa generan suficiente valor para mis clientes. Son eficientes y responden de manera diferenciada a sus necesidades." },
            { "id": 2, "texto": "Medimos la renovación de nuestro portafolio de negocios en relación causal con la sustentabilidad de la empresa." },
            { "id": 3, "texto": "Sabemos cuánto nos cuestan los procesos clave de la empresa." },
            { "id": 4, "texto": "Conocemos la utilidad que nos deja cada producto y cada cliente." },
            { "id": 5, "texto": "Tenemos una rentabilidad adecuada a nuestra inversión." }
          ]
        },
        {
          "id": "analitica",
          "nombre": "Analítica Competitiva",
          "descripcion": "Las empresas post-pandemia entienden que los datos continuamente avalan las decisiones y la propuesta de valor de maneras inesperadas pero prometedoras. Para aprovechar al máximo los datos, las compañías deben crear enfoques de gobernanza con base en información clasificada de nivel estratégico y operativo.",
          "preguntas": [
            { "id": 6, "texto": "Nuestra empresa es competitiva en su sector / mercado." },
            { "id": 7, "texto": "Estamos identificando y aprovechando las oportunidades que ofrece el mercado." },
            { "id": 8, "texto": "Tenemos una mentalidad analítica en la organización." },
            { "id": 9, "texto": "En la empresa contamos con los indicadores adecuados." },
            { "id": 10, "texto": "Contamos con metodologías y software para el análisis de datos de la industria y el mercado." },
            { "id": 11, "texto": "En la empresa tenemos el hábito del pensamiento estratégico." }
          ]
        },
        {
          "id": "decisiones",
          "nombre": "Análisis de Decisiones",
          "descripcion": "Hay que asegurar la calidad y rapidez en la toma de decisiones y para esto los dilemas se deben asignar a los ejecutivos, equipos, individuos y algoritmos correctos. El equipo directivo necesita enfocar su tiempo y energía en las decisiones medulares del negocio.",
          "preguntas": [
            { "id": 12, "texto": "Tomamos decisiones juiciosas de forma ágil." },
            { "id": 13, "texto": "Contamos con tablero de indicadores de sistemas y procesos que facilita la toma de decisiones." },
            { "id": 14, "texto": "Contamos con mecanismos de evaluación del sistema y análisis del desempeño de nuestros procesos." },
            { "id": 15, "texto": "Somos conscientes de la manera como tomamos las decisiones." },
            { "id": 16, "texto": "El personal con mando sale de la zona de confort, afronta la incertidumbre y el cambio; desafiando sus resultados, prácticas y modelos mentales." }
          ]
        }
      ]
    },
    {
      "id": "social",
      "nombre": "Eje Social",
      "color": "#16a34a",
      "icon": "fas fa-users",
      "descripcion": "Evalúa la cohesión organizacional, el propósito compartido y la capacidad de la empresa para operar como un sistema interdependiente y adaptable.",
      "secciones": [
        {
          "id": "propositos",
          "nombre": "Administración por Propósitos",
          "descripcion": "Es necesario fortalecer la identidad de la empresa, su razón de existir. Las compañías deben tener una identidad, pues la gente tiene una gran necesidad de pertenencia: quieren ser parte de algo más grande que ellos mismos.",
          "preguntas": [
            { "id": 17, "texto": "El personal conoce y se entusiasma con la misión de la empresa." },
            { "id": 18, "texto": "Entregamos un valor auténtico a nuestros clientes o usuarios finales, en congruencia con nuestro propósito." },
            { "id": 19, "texto": "Nuestra gestión considera la contribución alineada a nuestro propósito y nutre interacciones y flujos de valor con clientes y consumidores." },
            { "id": 20, "texto": "Contamos con indicadores para identificar las afectaciones del cambio acelerado que vivimos." },
            { "id": 21, "texto": "Las personas trabajan en puestos y funciones alineados con sus talentos." }
          ]
        },
        {
          "id": "sistemica",
          "nombre": "Visión Sistémica",
          "descripcion": "El nuevo modelo reconoce que el valor es creado a través de redes interconectadas donde los socios comparten datos, códigos y habilidades. Necesitamos considerar a nuestros socios y grupos de interés como extensiones de nosotros mismos.",
          "preguntas": [
            { "id": 22, "texto": "Nuestra empresa es un sistema abierto en el cual confluyen con fluidez procesos interactuantes e interdependientes que se adecuan a las necesidades del entorno." },
            { "id": 23, "texto": "Las interacciones entre los procesos, y entre éstos y las partes interesadas están claramente definidas." },
            { "id": 24, "texto": "Los equipos de proceso están conscientes de que sus decisiones resultan en sinergias para lograr capacidades y evolucionar." },
            { "id": 25, "texto": "En la empresa estamos acostumbrados a pensar en sistemas." },
            { "id": 26, "texto": "Tenemos muy claras las capacidades estratégicas de la empresa, los procesos y la combinación de recursos que las soportan." }
          ]
        },
        {
          "id": "complejidad",
          "nombre": "Simplificación de la Complejidad",
          "descripcion": "Comprender los principios sistémicos nos permite apreciar todos los fenómenos de la vida en forma de sistemas y entender su evolución. La teoría de sistemas resulta fundamental para guiar a las organizaciones a enfrentar la complejidad y lo caótico del entorno.",
          "preguntas": [
            { "id": 27, "texto": "Respecto a nuestra estructura organizacional, podemos decir que es plana y favorece la conectividad sobre la jerarquía." },
            { "id": 28, "texto": "Hemos usado herramientas de dinámica de sistemas para entender cómo se afectan las partes y resolver situaciones problemáticas." },
            { "id": 29, "texto": "Nuestros procesos clave están diseñados y sincronizados para entregar el valor específico que deseamos entregar." },
            { "id": 30, "texto": "Los procesos que alimentan a los procesos clave se planifican adecuadamente para entregar sus insumos en el momento preciso." },
            { "id": 31, "texto": "Reconocemos los recursos de cada proceso como fundamento de las capacidades operativas y consideramos clave su gestión." }
          ]
        }
      ]
    },
    {
      "id": "psicologico",
      "nombre": "Eje Psicológico",
      "color": "#2563eb",
      "icon": "fas fa-brain",
      "descripcion": "Evalúa la cultura organizacional, el aprendizaje continuo y el desarrollo del talento humano como motores de evolución y adaptación.",
      "secciones": [
        {
          "id": "cultura",
          "nombre": "Fortalecimiento de la Cultura",
          "descripcion": "La cultura organizacional entraña los porqués del trabajo de las personas, sus creencias y valores en una amalgama que le da un propósito genuino y atractivo a la empresa. Empieza con ciertas creencias que luego influyen en la forma en que piensan y actúan los individuos.",
          "preguntas": [
            { "id": 32, "texto": "Tenemos definidos valores como creencias de éxito compartidas y elementos centrales de nuestra identidad organizacional." },
            { "id": 33, "texto": "Tenemos definidas las competencias organizacionales en congruencia con la estrategia, estilo de gestión y cultura deseada." },
            { "id": 34, "texto": "El sistema de planeación, la evaluación del desempeño y las estructuras de trabajo están alineados para eliminar comportamientos disfuncionales o incongruentes." },
            { "id": 35, "texto": "Tenemos definidas las reglas de coordinación entre los procesos y los roles del personal con mando para garantizar el despliegue de la cultura deseada." },
            { "id": 36, "texto": "Nuestra organización avanza a la par con la tecnología." },
            { "id": 37, "texto": "Promovemos el pensamiento crítico y es parte de nuestra cultura." }
          ]
        },
        {
          "id": "aprendizaje",
          "nombre": "Aprendizaje Organizacional",
          "descripcion": "Las compañías deben promover una mentalidad de crecimiento, curiosidad y apertura a la experimentación y el fracaso. Estas empresas promueven el hábito del aprendizaje continuo que alienta a la gente a adaptarse y reinventarse según las necesidades cambiantes.",
          "preguntas": [
            { "id": 38, "texto": "Nuestra organización tiene definido cuál es el conocimiento relevante que soporta las capacidades estratégicas." },
            { "id": 39, "texto": "Generamos continuamente nuevo conocimiento, lo documentamos y convertimos en roles de talento del personal." },
            { "id": 40, "texto": "Los equipos de proceso administran el conocimiento que fundamenta su operación, su desempeño y sus tecnologías para la innovación." },
            { "id": 41, "texto": "Promovemos la generación, publicación y reúso de lecciones aprendidas para evitar la recurrencia de fallas y acelerar el aprendizaje organizacional." },
            { "id": 42, "texto": "Visualizamos a la organización como un sistema vivo que aprende con base en la calidad de las interacciones entre equipos." },
            { "id": 43, "texto": "En nuestra empresa promovemos el método experimental: hipótesis, prueba, aprendizaje y repetición." }
          ]
        },
        {
          "id": "coaching",
          "nombre": "Coaching",
          "descripcion": "Hoy en día, los jefes son verdaderos coaches y facilitadores con tramos de control más amplios. Los coaches dedican tiempo de calidad a la gente y son expertos en delegar, asignándoles a sus colaboradores proyectos retadores.",
          "preguntas": [
            { "id": 44, "texto": "Tratamos al talento de nuestra organización como el recurso más escaso." },
            { "id": 45, "texto": "Nuestra organización trata a las personas como proyectos en desarrollo que deben resolver retos para crecer." },
            { "id": 46, "texto": "En nuestra organización ejercitamos y promovemos el pensamiento independiente." },
            { "id": 47, "texto": "Hay conciencia de que la motivación intrínseca (más allá de lo material o externo) es clave para retener al personal." },
            { "id": 48, "texto": "En general, confiamos en la inteligencia colectiva como motor de resultados." }
          ]
        }
      ]
    }
  ],
  "niveles": [
    { "min": 1.0, "max": 2.4, "label": "Área Crítica",   "color": "#ef4444", "recomendacion": "Se requieren acciones inmediatas y prioritarias en esta dimensión. Considere un plan de intervención con metas claras y plazos definidos." },
    { "min": 2.5, "max": 3.4, "label": "En Desarrollo",  "color": "#f59e0b", "recomendacion": "Hay bases, pero se necesitan mejoras estructuradas para alcanzar madurez. Identifique las secciones más débiles y trabaje en ellas de forma sistemática." },
    { "min": 3.5, "max": 4.4, "label": "Maduro",         "color": "#22c55e", "recomendacion": "La organización muestra solidez en esta dimensión. Continúe fortaleciendo y comparta buenas prácticas con otras áreas." },
    { "min": 4.5, "max": 5.0, "label": "Excelente",      "color": "#3b82f6", "recomendacion": "Alto nivel de madurez. Convierta estas fortalezas en ventajas competitivas sostenibles y en referente para el sector." }
  ]
    };
    initializeQuiz();
}

function initializeQuiz() {
    if (!quizData || !quizData.ejes) return;

    // Flatten sections for navigation
    const sections = [];
    quizData.ejes.forEach(eje => {
        eje.secciones.forEach(seccion => {
            sections.push({ eje, seccion });
        });
    });

    const totalSections = sections.length;
    let currentSectionIdx = 0;
    const answers = {}; // { questionId: score 1-5 }

    const quizContent = document.getElementById('quiz-content');
    const quizResults = document.getElementById('quiz-results');

    // ── Render intro screen ───────────────────────────────────────────────────
    function renderIntro() {
        quizContent.style.display = 'block';
        quizResults.style.display = 'none';
        quizContent.innerHTML = `
            <div class="d3d-intro">
                <div class="d3d-intro-icon"><i class="fas fa-clipboard-check"></i></div>
                <h3 class="d3d-intro-title">Diagnóstico Integral Básico 3D</h3>
                <p class="d3d-intro-sub">${quizData.instrucciones}</p>
                <p class="d3d-intro-meta">
                    Este diagnóstico evalúa <strong>3 ejes estratégicos</strong> con
                    <strong>${totalSections} secciones</strong> y <strong>48 reactivos</strong>.
                </p>
                <div class="d3d-ejes-row">
                    ${quizData.ejes.map(e => `
                        <div class="d3d-eje-chip" style="--eje-color:${e.color}">
                            <i class="${e.icon}"></i>
                            <span>${e.nombre}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="d3d-btn-primary" id="d3d-start">
                    Comenzar Diagnóstico &nbsp;<i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        document.getElementById('d3d-start').addEventListener('click', () => {
            currentSectionIdx = 0;
            renderSection(currentSectionIdx);
        });
    }

    // ── Render a section ──────────────────────────────────────────────────────
    function renderSection(idx) {
        const { eje, seccion } = sections[idx];
        const progressPct = Math.round((idx / totalSections) * 100);
        const isLast = idx === totalSections - 1;

        quizContent.innerHTML = `
            <div class="d3d-section-wrap">
                <!-- Progress bar -->
                <div class="d3d-progress-track">
                    <div class="d3d-progress-fill" style="width:${progressPct}%"></div>
                </div>
                <div class="d3d-progress-meta">
                    <span class="d3d-eje-badge" style="--eje-color:${eje.color}">
                        <i class="${eje.icon}"></i> ${eje.nombre}
                    </span>
                    <span class="d3d-section-counter">Sección ${idx + 1} de ${totalSections}</span>
                </div>

                <!-- Section header -->
                <h3 class="d3d-section-title">${seccion.nombre}</h3>
                <p class="d3d-section-desc">${seccion.descripcion}</p>

                <!-- Scale legend -->
                <div class="d3d-scale-legend">
                    <span>1 = Completamente en desacuerdo</span>
                    <span>5 = Completamente de acuerdo</span>
                </div>

                <!-- Questions -->
                <div class="d3d-questions-list">
                    ${seccion.preguntas.map((p, qi) => `
                        <div class="d3d-q-item" data-qid="${p.id}">
                            <p class="d3d-q-text">
                                <span class="d3d-q-num">${qi + 1}.</span> ${p.texto}
                            </p>
                            <div class="d3d-likert">
                                <span class="d3d-likert-lbl d3d-lbl-left">En desacuerdo</span>
                                <div class="d3d-likert-btns">
                                    ${[1, 2, 3, 4, 5].map(v => `
                                        <label class="d3d-lk-opt">
                                            <input type="radio" name="q${p.id}" value="${v}">
                                            <span class="d3d-lk-face">${v}</span>
                                        </label>
                                    `).join('')}
                                </div>
                                <span class="d3d-likert-lbl d3d-lbl-right">De acuerdo</span>
                            </div>
                            <p class="d3d-q-error" style="display:none;">
                                <i class="fas fa-exclamation-circle"></i> Por favor seleccione una opción.
                            </p>
                        </div>
                    `).join('')}
                </div>

                <!-- Navigation -->
                <div class="d3d-nav">
                    <button class="d3d-btn-secondary" id="d3d-prev" ${idx === 0 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-left"></i> Anterior
                    </button>
                    <button class="d3d-btn-primary" id="d3d-next">
                        ${isLast
                            ? 'Ver Resultados &nbsp;<i class="fas fa-chart-bar"></i>'
                            : 'Siguiente &nbsp;<i class="fas fa-chevron-right"></i>'}
                    </button>
                </div>
            </div>
        `;

        // Restore previously saved answers for this section
        seccion.preguntas.forEach(p => {
            if (answers[p.id] !== undefined) {
                const radio = quizContent.querySelector(`input[name="q${p.id}"][value="${answers[p.id]}"]`);
                if (radio) {
                    radio.checked = true;
                    radio.closest('.d3d-lk-opt').classList.add('selected');
                }
            }
        });

        // Live radio styling + answer save
        quizContent.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', () => {
                const qid = parseInt(radio.name.replace('q', ''));
                answers[qid] = parseInt(radio.value);
                // Update visual selection within this question
                const btns = quizContent.querySelectorAll(`input[name="q${qid}"]`);
                btns.forEach(r => r.closest('.d3d-lk-opt').classList.toggle('selected', r.checked));
                // Clear error
                const qEl = quizContent.querySelector(`.d3d-q-item[data-qid="${qid}"]`);
                if (qEl) {
                    qEl.classList.remove('d3d-q-unanswered');
                    qEl.querySelector('.d3d-q-error').style.display = 'none';
                }
            });
        });

        // Prev button
        document.getElementById('d3d-prev').addEventListener('click', () => {
            saveCurrentAnswers(seccion);
            currentSectionIdx--;
            renderSection(currentSectionIdx);
        });

        // Next / Results button
        document.getElementById('d3d-next').addEventListener('click', () => {
            const unanswered = seccion.preguntas.filter(p => {
                const checked = quizContent.querySelector(`input[name="q${p.id}"]:checked`);
                return !checked && answers[p.id] === undefined;
            });

            if (unanswered.length > 0) {
                unanswered.forEach(p => {
                    const qEl = quizContent.querySelector(`.d3d-q-item[data-qid="${p.id}"]`);
                    if (qEl) {
                        qEl.classList.add('d3d-q-unanswered');
                        qEl.querySelector('.d3d-q-error').style.display = 'flex';
                        qEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
                return;
            }

            saveCurrentAnswers(seccion);

            if (isLast) {
                renderResults();
            } else {
                currentSectionIdx++;
                renderSection(currentSectionIdx);
                quizContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    function saveCurrentAnswers(seccion) {
        seccion.preguntas.forEach(p => {
            const radio = quizContent.querySelector(`input[name="q${p.id}"]:checked`);
            if (radio) answers[p.id] = parseInt(radio.value);
        });
    }

    // ── Render results ────────────────────────────────────────────────────────
    function renderResults() {
        quizContent.style.display = 'none';
        quizResults.style.display = 'block';
        quizResults.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Helper: average of answers for a list of question IDs
        const avgIds = ids => {
            const vals = ids.map(id => answers[id]).filter(v => typeof v === 'number');
            return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
        };
        const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

        // Per-eje and per-section stats
        const ejeStats = quizData.ejes.map(eje => {
            const secciones = eje.secciones.map(sec => {
                const scores = sec.preguntas.map(p => answers[p.id] || 0).filter(s => s > 0);
                const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
                const startId = sec.preguntas[0].id;
                return { nombre: sec.nombre, avg, scores, startId };
            });
            const allScores = secciones.flatMap(s => s.scores);
            const ejeAvg = allScores.length ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
            return { eje, secciones, avg: ejeAvg };
        });
        const allScores = ejeStats.flatMap(e => e.secciones.flatMap(s => s.scores));
        const overallAvg = allScores.length ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
        const allSecciones = ejeStats.flatMap(e => e.secciones);

        // ── 6 dimensiones: V, R, P (ejes) y I, C, O (evolutivas) ───────────────
        const V = avgIds(range(1, 16));
        const R = avgIds(range(17, 31));
        const P = avgIds(range(32, 48));
        const I = avgIds([1,2,3,4,5,17,18,19,20,21,32,33,34,35,36,37]);
        const C = avgIds([6,7,8,9,10,11,22,23,24,25,26,38,39,40,41,42,43]);
        const O = avgIds([12,13,14,15,16,27,28,29,30,31,44,45,46,47,48]);

        const ejeRanking = [['V', V], ['R', R], ['P', P]]
            .sort((a, b) => b[1] - a[1]).map(x => x[0]).join('>');
        const dimMax = [['I', I], ['C', C], ['O', O]]
            .sort((a, b) => b[1] - a[1])[0][0];
        const relatoriaKey = `${ejeRanking}_${dimMax}`;
        const relatoria = (typeof RELATORIAS !== 'undefined' && RELATORIAS[relatoriaKey]) || null;

        // ── Áreas temáticas ─────────────────────────────────────────────────────
        const areasEvaluadas = (typeof AREAS_TEMATICAS !== 'undefined' ? AREAS_TEMATICAS : [])
            .map(a => ({ nombre: a.nombre, avg: avgIds(a.reactivos) }));
        const fortalezas = areasEvaluadas.filter(a => a.avg >= 3.5).sort((a, b) => b.avg - a.avg);
        const debilidades = areasEvaluadas.filter(a => a.avg > 0 && a.avg <= 2.5).sort((a, b) => a.avg - b.avg);

        // ── Top 3 / Bottom 3 secciones ─────────────────────────────────────────
        const seccionesRanked = [...allSecciones].filter(s => s.avg > 0);
        const top3 = [...seccionesRanked].sort((a, b) => b.avg - a.avg).slice(0, 3);
        const bot3 = [...seccionesRanked].sort((a, b) => a.avg - b.avg).slice(0, 3);

        function getNivel(avg) {
            return quizData.niveles.find(n => avg >= n.min && avg <= n.max) || quizData.niveles[0];
        }
        function pct(avg) { return Math.round(((avg - 1) / 4) * 100); }

        const overallNivel = getNivel(overallAvg);
        const overallPct = pct(overallAvg);

        const ejeNombres = { V: 'Eje Económico (Valor)', R: 'Eje Sociológico (Relaciones)', P: 'Eje Psicológico (Personal)' };
        const ejeColors  = { V: '#0ea5e9', R: '#22c55e', P: '#a855f7' };
        const dimNombres = { I: 'Identidad — Dimensión protagónica', C: 'Crecimiento — Dimensión progresista', O: 'Operación — Dimensión práctica' };
        const dimIcons   = { I: 'fas fa-star', C: 'fas fa-seedling', O: 'fas fa-cogs' };
        const ejeData = { V, R, P };
        const dimData = { I, C, O };

        const hdr = (typeof RELATORIA_HEADER !== 'undefined') ? RELATORIA_HEADER : null;
        const secInfo = (typeof SECCIONES_INFO !== 'undefined') ? SECCIONES_INFO : {};

        const resultsDetail = document.getElementById('results-detail');
        resultsDetail.innerHTML = `
            <!-- Overall score -->
            <div class="d3d-overall-card" style="border-color:${overallNivel.color}">
                <div class="d3d-overall-label">Resultado Global</div>
                <div class="d3d-overall-score" style="color:${overallNivel.color}">${overallAvg.toFixed(2)}<span>/5</span></div>
                <div class="d3d-nivel-badge" style="background:${overallNivel.color}">${overallNivel.label}</div>
                <div class="d3d-overall-bar-track">
                    <div class="d3d-overall-bar-fill" style="width:${overallPct}%; background:${overallNivel.color}"></div>
                </div>
                <p class="d3d-nivel-rec">${overallNivel.recomendacion}</p>
            </div>

            ${relatoria ? `
            <div class="d3d-relatoria-card">
                <div class="d3d-relatoria-badge">
                    <i class="fas fa-file-alt"></i> Relatoría ${relatoria.num} de 18
                </div>
                <h3 class="d3d-relatoria-title">Perfil estratégico de su empresa</h3>
                <div class="d3d-relatoria-combo">
                    <span class="d3d-combo-chip">Ranking de ejes: ${ejeRanking.replace(/>/g, ' › ')}</span>
                    <span class="d3d-combo-chip">Dimensión dominante: ${dimMax}</span>
                </div>

                ${hdr ? `
                <p class="d3d-relatoria-p"><strong>${hdr.intro}</strong></p>
                <ul class="d3d-factor-list">
                    ${hdr.factores.map(f => `<li><strong>${f.titulo}:</strong> ${f.texto}</li>`).join('')}
                </ul>` : ''}
                <p class="d3d-relatoria-p d3d-relatoria-highlight">${relatoria.eje}</p>

                ${hdr ? `
                <p class="d3d-relatoria-p"><strong>${hdr.etapasIntro}</strong></p>
                <ul class="d3d-factor-list">
                    ${hdr.etapas.map(e => `<li><strong>${e.titulo}:</strong> ${e.texto} <em>(${e.dim})</em></li>`).join('')}
                </ul>` : ''}
                <p class="d3d-relatoria-p d3d-relatoria-highlight">${relatoria.dim}</p>
            </div>` : ''}

            <!-- Perfil V/R/P -->
            <div class="d3d-vrp-card">
                <h3 class="d3d-subtitle"><i class="fas fa-layer-group"></i> Énfasis por factor de éxito</h3>
                <div class="d3d-vrp-grid">
                    ${['V','R','P'].map(k => {
                        const v = ejeData[k];
                        const p = pct(v);
                        return `
                            <div class="d3d-vrp-item" style="--k-color:${ejeColors[k]}">
                                <div class="d3d-vrp-letter">${k}</div>
                                <div class="d3d-vrp-meta">
                                    <div class="d3d-vrp-name">${ejeNombres[k]}</div>
                                    <div class="d3d-vrp-bar-track">
                                        <div class="d3d-vrp-bar-fill" style="width:${p}%; background:${ejeColors[k]}"></div>
                                    </div>
                                </div>
                                <div class="d3d-vrp-score">${v.toFixed(2)}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- Dimensión I/C/O -->
            <div class="d3d-dim-card">
                <h3 class="d3d-subtitle"><i class="fas fa-compass"></i> Dimensión evolutiva</h3>
                <div class="d3d-dim-grid">
                    ${['I','C','O'].map(k => {
                        const v = dimData[k];
                        const p = pct(v);
                        const isMax = k === dimMax;
                        return `
                            <div class="d3d-dim-item ${isMax ? 'd3d-dim-max' : ''}">
                                <div class="d3d-dim-head">
                                    <i class="${dimIcons[k]}"></i>
                                    <span>${dimNombres[k]}</span>
                                    ${isMax ? '<span class="d3d-dim-tag">Dominante</span>' : ''}
                                </div>
                                <div class="d3d-vrp-bar-track">
                                    <div class="d3d-vrp-bar-fill" style="width:${p}%"></div>
                                </div>
                                <div class="d3d-dim-score">${v.toFixed(2)}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            ${(fortalezas.length || debilidades.length) ? `
            <div class="d3d-fd-grid">
                ${fortalezas.length ? `
                <div class="d3d-fd-card d3d-fd-strong">
                    <h3 class="d3d-subtitle"><i class="fas fa-check-circle"></i> Fortalezas detectadas</h3>
                    <p class="d3d-fd-sub">Áreas con promedio ≥ 3.5</p>
                    <ul class="d3d-fd-list">
                        ${fortalezas.map(a => `<li><span>${a.nombre}</span><strong>${a.avg.toFixed(2)}</strong></li>`).join('')}
                    </ul>
                </div>` : ''}
                ${debilidades.length ? `
                <div class="d3d-fd-card d3d-fd-weak">
                    <h3 class="d3d-subtitle"><i class="fas fa-exclamation-triangle"></i> Áreas de oportunidad</h3>
                    <p class="d3d-fd-sub">Áreas con promedio ≤ 2.5</p>
                    <ul class="d3d-fd-list">
                        ${debilidades.map(a => `<li><span>${a.nombre}</span><strong>${a.avg.toFixed(2)}</strong></li>`).join('')}
                    </ul>
                </div>` : ''}
            </div>` : ''}

            ${top3.length ? `
            <div class="d3d-topbot-card">
                <h3 class="d3d-subtitle"><i class="fas fa-trophy"></i> Sus 3 áreas de mejor desempeño</h3>
                <p class="d3d-fd-sub">Las áreas de desempeño con las que usted parece estar más satisfecho.</p>
                ${top3.map(s => {
                    const info = secInfo[s.startId];
                    const titulo = info ? info.titulo : s.nombre;
                    const texto = info ? info.texto : '';
                    return `
                        <div class="d3d-topbot-item">
                            <div class="d3d-topbot-head">
                                <span class="d3d-topbot-name">${titulo}</span>
                                <span class="d3d-topbot-score" style="color:${getNivel(s.avg).color}">${s.avg.toFixed(2)}</span>
                            </div>
                            ${texto ? `<p class="d3d-topbot-desc">${texto}</p>` : ''}
                        </div>
                    `;
                }).join('')}
            </div>` : ''}

            ${bot3.length ? `
            <div class="d3d-topbot-card d3d-topbot-card-bot">
                <h3 class="d3d-subtitle"><i class="fas fa-wrench"></i> Sus 3 áreas a fortalecer</h3>
                <p class="d3d-fd-sub">Las áreas de desempeño con las que usted parece estar menos satisfecho.</p>
                ${bot3.map(s => {
                    const info = secInfo[s.startId];
                    const titulo = info ? info.titulo : s.nombre;
                    const texto = info ? info.texto : '';
                    return `
                        <div class="d3d-topbot-item">
                            <div class="d3d-topbot-head">
                                <span class="d3d-topbot-name">${titulo}</span>
                                <span class="d3d-topbot-score" style="color:${getNivel(s.avg).color}">${s.avg.toFixed(2)}</span>
                            </div>
                            ${texto ? `<p class="d3d-topbot-desc">${texto}</p>` : ''}
                        </div>
                    `;
                }).join('')}
            </div>` : ''}

            <div class="d3d-eje-results">
                ${ejeStats.map(({ eje, secciones, avg }) => {
                    const nivel = getNivel(avg);
                    const p = pct(avg);
                    return `
                        <div class="d3d-eje-result-card" style="--eje-color:${eje.color}">
                            <div class="d3d-eje-result-header">
                                <div class="d3d-eje-result-icon" style="background:${eje.color}20; color:${eje.color}">
                                    <i class="${eje.icon}"></i>
                                </div>
                                <div>
                                    <div class="d3d-eje-result-name">${eje.nombre}</div>
                                    <div class="d3d-nivel-badge-sm" style="background:${nivel.color}">${nivel.label}</div>
                                </div>
                                <div class="d3d-eje-result-score" style="color:${eje.color}">${avg.toFixed(2)}</div>
                            </div>
                            <div class="d3d-bar-track">
                                <div class="d3d-bar-fill" style="width:${p}%; background:${eje.color}"></div>
                            </div>
                            <p class="d3d-eje-result-rec">${nivel.recomendacion}</p>

                            <div class="d3d-sec-breakdown">
                                ${secciones.map(sec => {
                                    const sn = getNivel(sec.avg);
                                    const sp = pct(sec.avg);
                                    return `
                                        <div class="d3d-sec-row">
                                            <span class="d3d-sec-name">${sec.nombre}</span>
                                            <div class="d3d-sec-bar-track">
                                                <div class="d3d-sec-bar-fill" style="width:${sp}%; background:${sn.color}"></div>
                                            </div>
                                            <span class="d3d-sec-score" style="color:${sn.color}">${sec.avg.toFixed(2)}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            ${hdr ? `
            <div class="d3d-closing-card">
                <p>${hdr.cierre}</p>
                <p><strong>${hdr.cta}</strong></p>
            </div>` : `
            <p class="d3d-results-cta">
                Para una evaluación más detallada y un plan de acción personalizado,
                <strong>contáctenos</strong> para una sesión de consultoría.
            </p>`}
        `;

        // Restart button
        document.getElementById('restart-btn').onclick = () => {
            Object.keys(answers).forEach(k => delete answers[k]);
            currentSectionIdx = 0;
            quizResults.style.display = 'none';
            renderIntro();
            quizContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
    }

    renderIntro();
}

// Chat Functions
function initializeChat() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-message');
    const sendButton = document.getElementById('send-message');

    // La pestaña "El Explicador" usa un iframe externo: no hay chat propio que inicializar.
    if (!chatMessages || !userInput || !sendButton) return;

    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${isUser ? 'user' : 'bot'}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message.length === 0) return;
        
        // Add user message
        addMessage(message, true);
        userInput.value = '';
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message message-bot';
        typingDiv.textContent = 'El Explicador está escribiendo...';
        typingDiv.id = 'typing-indicator';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate bot response
        setTimeout(() => {
            // Remove typing indicator
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            
            let botResponse = getBotResponse(message);
            addMessage(botResponse);
        }, 1500);
    }
    
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Knowledge base responses
        if (lowerMessage.includes('octágono') || lowerMessage.includes('octagon') || lowerMessage.includes('modelo')) {
            return "El modelo del octágono de Sage-Wise analiza ocho dimensiones fundamentales de una organización: Estrategia, Estructura, Sistemas, Personal, Habilidades, Estilos, Valores y Objetivos. Estas dimensiones están interconectadas y cualquier cambio en una afecta a las demás. ¿Te gustaría que profundice en alguna dimensión específica?";
        }
        
        if (lowerMessage.includes('estrategia')) {
            return "La estrategia define la dirección y objetivos a largo plazo de su organización. Incluye la visión, misión y el plan estratégico general. Una estrategia bien definida debe ser comunicada claramente a todos los niveles y estar alineada con las operaciones diarias.";
        }
        
        if (lowerMessage.includes('estructura')) {
            return "La estructura organizacional se refiere a cómo se organiza formalmente la empresa: jerarquías, departamentos y distribución de responsabilidades. Una estructura efectiva facilita la comunicación, la toma de decisiones y la ejecución de la estrategia.";
        }
        
        if (lowerMessage.includes('sistemas')) {
            return "Los sistemas incluyen procesos, procedimientos y tecnologías que apoyan las operaciones diarias. Sistemas bien diseñados y documentados mejoran la eficiencia, reducen errores y facilitan el escalamiento del negocio.";
        }
        
        if (lowerMessage.includes('consultoría') || lowerMessage.includes('servicios')) {
            return "Ofrecemos servicios de consultoría en transformación organizacional, mejora de procesos, gestión del cambio, desarrollo de liderazgo y estrategia corporativa. Cada proyecto se adapta a las necesidades específicas de nuestros clientes usando nuestro modelo del octágono.";
        }
        
        if (lowerMessage.includes('contacto') || lowerMessage.includes('contratar') || lowerMessage.includes('precio')) {
            return "Puede contactarnos a través de nuestro correo electrónico contacto@sage-wise.com o llamando al +52 (55) 1234-5678. Ofrecemos una consulta inicial gratuita para evaluar sus necesidades y diseñar una propuesta personalizada.";
        }
        
        if (lowerMessage.includes('diagnóstico') || lowerMessage.includes('evaluación')) {
            return "Nuestro diagnóstico organizacional utiliza el modelo del octágono para evaluar las ocho dimensiones clave de su empresa. Puede comenzar con nuestro diagnóstico en línea en la pestaña 'Diagnóstico' o solicitar una evaluación completa presencial.";
        }
        
        if (lowerMessage.includes('transformación') || lowerMessage.includes('cambio')) {
            return "La transformación organizacional exitosa requiere un enfoque integral que considere todas las dimensiones del negocio. Nuestro método asegura que los cambios sean sostenibles y generen valor real para su organización.";
        }
        
        // Default response
        return "Gracias por su pregunta. Como El Explicador de Sage-Wise, puedo ayudarle con información sobre nuestro modelo del octágono, metodologías de consultoría, transformación organizacional y nuestros servicios. ¿Podría ser más específico sobre qué aspecto le interesa conocer?";
    }
    
    sendButton.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
}

// Placeholder for future OpenAI integration
async function queryOpenAI(userQuery, documents) {
    // This function will be implemented when integrating with OpenAI API
    // It will process documents from the documents folder and provide intelligent responses
    console.log('OpenAI integration placeholder');
    return "Esta funcionalidad se implementará con la integración de OpenAI API.";
}
