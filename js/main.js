// Global variables
let currentQuestion = 0;
let quizData = null;
let userAnswers = [];

// Octagrama label data (global for cross-navigation)
const vertexLabelsValor = [
    "Personalización", "Satisfacción", "Exclusividad", "Prestigio",
    "Rendimiento", "Talento", "Logística", "Informática"
];
const sideLabelsValor = [
    "Experiencia del Cliente", "Portafolio de Negocios", "Desarrollo de Prototipo", "Propuesta de Valor",
    "Asignación de Recursos", "Captura de Valor", "Abastecimiento de Insumos", "Org. Competente"
];
const vertexLabelsCerebral = [
    "CSO / Vendedor", "COO / Operador", "CTO / Tecnólogo", "CMO / Mercadólogo",
    "CPO / Comprador", "CIO / Informático", "CHO / Entrenador", "CFO / Planificador"
];
const sideLabelsCerebral = [
    "Mcdos. de Clientes", "Mcdos. Fabriles", "Mcdos. Tecnológicos", "Mcdos. de Medios",
    "Mcdos. de Proveedores", "Mcdos. de TIC's", "Mcdos. Laborales", "Mcdos. Financieros"
];

// MBTI type profiles for modal
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

// Document ready initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeTabNavigation();
    try { initialize3DOctagon(); } catch(e) { console.error('3D Octagon error:', e); }
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

// Enhanced 3D Octagon Visualization - Clean version with hover labels
function initialize3DOctagon() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    const container = document.getElementById('octagon-container');
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // High DPI support for sharper rendering
    const pixelRatio = window.devicePixelRatio || 1;
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Mouse controls
    let mouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.28;
    let targetRotationY = 0;
    let currentRotationX = 0.28;
    let currentRotationY = 0;
    let hoveredPoint = null;
    let currentLabel = null;

    // Create octagon group
    const octagonGroup = new THREE.Group();
    scene.add(octagonGroup);

    // Color schemes
    // octagon1 = top = Octagrama de Valor → ROJO
    // octagon2 = bottom = Octagrama Cerebral → AZUL
    const colors = {
        octagon1: { normal: 0xc0392b, hover: 0x96281b },
        octagon2: { normal: 0x2563eb, hover: 0x1d4ed8 },
        vertex: { normal: 0x757575, hover: 0xffc107, glow: 0x9e9e9e, emissive: 0x616161 },
        side: { normal: 0x757575, hover: 0xff9800, glow: 0x9e9e9e, emissive: 0x616161 }
    };

    // Create octagon geometries
    const octagonGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.12, 8);
    const octagonMaterial1 = new THREE.MeshPhongMaterial({
        color: colors.octagon1.normal,
        transparent: true,
        opacity: 0.75,
        flatShading: true,
        shininess: 100
    });
    const octagonMaterial2 = new THREE.MeshPhongMaterial({
        color: colors.octagon2.normal,
        transparent: true,
        opacity: 0.75,
        flatShading: true,
        shininess: 100
    });

    const octagon1 = new THREE.Mesh(octagonGeometry, octagonMaterial1);
    octagon1.position.y = 0.5;
    octagonGroup.add(octagon1);

    const octagon2 = new THREE.Mesh(octagonGeometry, octagonMaterial2);
    octagon2.position.y = -0.5;
    octagonGroup.add(octagon2);

    // Interactive points array
    const interactivePoints = [];

    // Create glowing vertex point (sphere)
    function createVertexPoint(position, index, octagonNum, label) {
        const group = new THREE.Group();

        // Inner sphere (solid core)
        const coreGeometry = new THREE.SphereGeometry(0.07, 16, 16);
        const coreMaterial = new THREE.MeshPhongMaterial({
            color: colors.vertex.normal,
            emissive: colors.vertex.emissive,
            emissiveIntensity: 0.4,
            shininess: 100
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        group.add(core);

        // Outer glow sphere
        const glowGeometry = new THREE.SphereGeometry(0.12, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: colors.vertex.glow,
            transparent: true,
            opacity: 0.35
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        group.add(glow);

        group.position.copy(position);
        group.userData = {
            type: 'vertex',
            index: index,
            octagon: octagonNum,
            label: label,
            coreMaterial: coreMaterial,
            glowMaterial: glowMaterial,
            originalScale: 1,
            isHovered: false
        };

        octagonGroup.add(group);
        interactivePoints.push(group);
        return group;
    }

    // Create glowing side bar (3D bar oriented along the octagon edge)
    function createSideBar(position, angle, index, octagonNum, label) {
        const group = new THREE.Group();

        // Inner bar (solid core) - small 3D box
        const coreGeometry = new THREE.BoxGeometry(0.18, 0.04, 0.04);
        const coreMaterial = new THREE.MeshPhongMaterial({
            color: colors.side.normal,
            emissive: colors.side.emissive,
            emissiveIntensity: 0.4,
            shininess: 100
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        group.add(core);

        // Outer glow bar
        const glowGeometry = new THREE.BoxGeometry(0.24, 0.08, 0.08);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: colors.side.glow,
            transparent: true,
            opacity: 0.35
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        group.add(glow);

        group.position.copy(position);
        // Rotate bar to be parallel to the octagon edge (tangent to the circle)
        // The bar's long axis (X) needs to align with the tangent direction
        group.rotation.y = -angle + Math.PI / 2;

        group.userData = {
            type: 'side',
            index: index,
            octagon: octagonNum,
            label: label,
            coreMaterial: coreMaterial,
            glowMaterial: glowMaterial,
            originalScale: 1,
            isHovered: false
        };

        octagonGroup.add(group);
        interactivePoints.push(group);
        return group;
    }

    // Vértices: counter-clockwise desde vértice NO (noroeste)
    // Ángulo base 225° (5π/4) = NW, decrementando para ir CCW en pantalla
    const V_START = 5 * Math.PI / 4;
    const S_START = 9 * Math.PI / 8;

    // Vértices del Octagrama de Valor (arriba, y=0.5)
    for (let i = 0; i < 8; i++) {
        const angle = V_START - (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.2;
        const z = Math.sin(angle) * 1.2;
        createVertexPoint(new THREE.Vector3(x, 0.5, z), i, 1, vertexLabelsValor[i]);
    }

    // Vértices del Octagrama Cerebral (abajo, y=-0.5)
    for (let i = 0; i < 8; i++) {
        const angle = V_START - (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.2;
        const z = Math.sin(angle) * 1.2;
        createVertexPoint(new THREE.Vector3(x, -0.5, z), i, 2, vertexLabelsCerebral[i]);
    }

    // Lados del Octagrama de Valor (midpoint entre vértices consecutivos)
    for (let i = 0; i < 8; i++) {
        const angle = S_START - (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.35;
        const z = Math.sin(angle) * 1.35;
        createSideBar(new THREE.Vector3(x, 0.5, z), angle, i, 1, sideLabelsValor[i]);
    }

    // Lados del Octagrama Cerebral
    for (let i = 0; i < 8; i++) {
        const angle = S_START - (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.35;
        const z = Math.sin(angle) * 1.35;
        createSideBar(new THREE.Vector3(x, -0.5, z), angle, i, 2, sideLabelsCerebral[i]);
    }

    // Create title label for octagrams (3D text that moves with the model)
    function createOctagramTitle(text, yPosition) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const scale = 2;
        canvas.width = 512 * scale;
        canvas.height = 80 * scale;

        context.scale(scale, scale);
        context.clearRect(0, 0, 512, 80);

        // Font settings - bold blue text, larger size
        const fontSize = 32;
        context.font = `700 ${fontSize}px 'Segoe UI', Arial, sans-serif`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        // Draw text with shadow
        context.shadowColor = 'rgba(0, 0, 0, 0.4)';
        context.shadowBlur = 6;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;

        // Gray color matching the vertices and bars
        context.fillStyle = '#616161';
        context.fillText(text, 256, 40);

        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            depthTest: false
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(2.4, 0.375, 1);  // Larger scale
        sprite.position.set(0, yPosition, 0);

        octagonGroup.add(sprite);
        return sprite;
    }

    // Add titles to both octagrams
    createOctagramTitle("Octagrama de Valor", 0.5);
    createOctagramTitle("Octagrama Cerebral", -0.5);

    // High-resolution crisp text label creation
    function createCrispLabel(text, color) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Higher resolution for crisp text
        const scale = 2;
        canvas.width = 512 * scale;
        canvas.height = 96 * scale;

        context.scale(scale, scale);

        // Clear canvas
        context.clearRect(0, 0, 512, 96);

        // Font settings
        const fontSize = 28;
        context.font = `600 ${fontSize}px 'Segoe UI', Arial, sans-serif`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        // Measure text
        const textMetrics = context.measureText(text);
        const textWidth = textMetrics.width;
        const padding = 16;
        const bgWidth = textWidth + padding * 2;
        const bgHeight = fontSize + padding * 1.4;
        const bgX = (512 - bgWidth) / 2;
        const bgY = (96 - bgHeight) / 2;

        // Draw shadow
        context.shadowColor = 'rgba(0, 0, 0, 0.25)';
        context.shadowBlur = 8;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 3;

        // Draw rounded rectangle background
        const radius = 8;
        context.fillStyle = 'rgba(255, 255, 255, 0.97)';
        context.beginPath();
        context.moveTo(bgX + radius, bgY);
        context.lineTo(bgX + bgWidth - radius, bgY);
        context.quadraticCurveTo(bgX + bgWidth, bgY, bgX + bgWidth, bgY + radius);
        context.lineTo(bgX + bgWidth, bgY + bgHeight - radius);
        context.quadraticCurveTo(bgX + bgWidth, bgY + bgHeight, bgX + bgWidth - radius, bgY + bgHeight);
        context.lineTo(bgX + radius, bgY + bgHeight);
        context.quadraticCurveTo(bgX, bgY + bgHeight, bgX, bgY + bgHeight - radius);
        context.lineTo(bgX, bgY + radius);
        context.quadraticCurveTo(bgX, bgY, bgX + radius, bgY);
        context.closePath();
        context.fill();

        // Reset shadow for border
        context.shadowColor = 'transparent';

        // Draw border
        context.strokeStyle = color;
        context.lineWidth = 2.5;
        context.stroke();

        // Draw text
        context.fillStyle = '#1a237e';
        context.fillText(text, 256, 48);

        // Create texture with proper filtering
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            depthTest: false
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(2.0, 0.375, 1);

        return sprite;
    }

    // Show label on hover
    function showLabel(point) {
        if (currentLabel) {
            octagonGroup.remove(currentLabel);
            currentLabel = null;
        }

        // Gray color for labels (matching the points)
        const color = '#616161';
        currentLabel = createCrispLabel(point.userData.label, color);

        // Position label above the point
        const labelPos = point.position.clone();
        labelPos.y += 0.45;
        currentLabel.position.copy(labelPos);

        octagonGroup.add(currentLabel);
    }

    // Hide label
    function hideLabel() {
        if (currentLabel) {
            octagonGroup.remove(currentLabel);
            currentLabel = null;
        }
    }

    // Highlight point on hover
    function highlightPoint(point) {
        const userData = point.userData;
        const hoverColor = userData.type === 'vertex' ? colors.vertex.hover : colors.side.hover;

        userData.coreMaterial.color.setHex(hoverColor);
        userData.coreMaterial.emissive.setHex(hoverColor);
        userData.coreMaterial.emissiveIntensity = 0.7;
        userData.glowMaterial.opacity = 0.8;

        // Scale differently for bars vs spheres
        if (userData.type === 'side') {
            point.scale.set(1.3, 1.5, 1.5);
        } else {
            point.scale.set(1.4, 1.4, 1.4);
        }
        userData.isHovered = true;
    }

    // Reset point to normal state
    function resetPoint(point) {
        const userData = point.userData;
        const normalColor = userData.type === 'vertex' ? colors.vertex.normal : colors.side.normal;
        const emissiveColor = userData.type === 'vertex' ? colors.vertex.emissive : colors.side.emissive;

        userData.coreMaterial.color.setHex(normalColor);
        userData.coreMaterial.emissive.setHex(emissiveColor);
        userData.coreMaterial.emissiveIntensity = 0.4;
        userData.glowMaterial.opacity = 0.35;

        point.scale.set(1, 1, 1);
        userData.isHovered = false;
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(-1, -1, -1);
    scene.add(backLight);

    camera.position.set(0, 0.3, 3.5);  // Closer camera for larger view

    // Raycaster for hover detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Mouse event handlers
    container.addEventListener('mousedown', onMouseDown, false);
    container.addEventListener('mousemove', onMouseMove, false);
    container.addEventListener('mouseup', onMouseUp, false);
    container.addEventListener('mouseleave', onMouseLeave, false);
    container.addEventListener('click', onMouseClick, false);

    function onMouseDown(event) {
        mouseDown = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    function onMouseMove(event) {
        // Handle dragging
        if (mouseDown) {
            const deltaX = event.clientX - mouseX;
            const deltaY = event.clientY - mouseY;

            targetRotationY += deltaX * 0.01;
            targetRotationX += deltaY * 0.01;

            mouseX = event.clientX;
            mouseY = event.clientY;
        }

        // Handle hover effects
        handleHover(event);
    }

    function onMouseUp() {
        mouseDown = false;
    }

    function onMouseLeave() {
        // Reset hover when mouse leaves container
        if (hoveredPoint) {
            resetPoint(hoveredPoint);
            hideLabel();
            hoveredPoint = null;
        }
        container.style.cursor = 'grab';
    }

    function handleHover(event) {
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        // Check intersections with interactive points
        const allMeshes = [];
        interactivePoints.forEach(point => {
            point.children.forEach(child => {
                child.userData.parentPoint = point;
                allMeshes.push(child);
            });
        });

        const intersects = raycaster.intersectObjects(allMeshes, false);

        if (intersects.length > 0) {
            const hitPoint = intersects[0].object.userData.parentPoint;

            if (hitPoint !== hoveredPoint) {
                // Reset previous point
                if (hoveredPoint) {
                    resetPoint(hoveredPoint);
                }

                // Highlight new point
                hoveredPoint = hitPoint;
                highlightPoint(hoveredPoint);
                showLabel(hoveredPoint);
                container.style.cursor = 'pointer';
            }
        } else {
            // No point hovered
            if (hoveredPoint) {
                resetPoint(hoveredPoint);
                hideLabel();
                hoveredPoint = null;
            }
            container.style.cursor = mouseDown ? 'grabbing' : 'grab';
        }
    }

    function onMouseClick(event) {
        if (hoveredPoint) {
            showOctagonInfo(hoveredPoint.userData);
        }
    }

    // Datos de descripciones completas con palabras sensibles (HTML)
    const vertexDescValor = [
        'La <strong>Personalización</strong> es la individualización de la necesidad: un segmento de clientes puede ordenar un producto o servicio que se ajuste perfectamente a sus preferencias. Los sectores de negocios serán distintos según el segmento.',
        'La <strong>Satisfacción</strong> la experimenta un cliente deleitado que ha maximizado su provecho con el goce del producto o servicio suministrado. Al cumplirse sus expectativas, estará dispuesto a pagar un sobreprecio por el usufructo del valor.',
        'La <strong>Exclusividad</strong> es el resultado de una tecnología o knowhow con los que se han desarrollado productos o procesos innovadores y servicios de difícil imitación, logrando una diferenciación ventajosa frente a los competidores.',
        'El <strong>Prestigio</strong> es la buena reputación que se logra por la confianza y credibilidad en la marca. Es un factor de diferenciación que se alcanza en la medida que se cumple cabal y sostenidamente una promesa de valor.',
        'El <strong>Rendimiento</strong> de la inversión es haber alcanzado una tasa de uso muy alta de los recursos empleados, al aplicar palancas financieras y operativas que balancean perfectamente riesgo y rentabilidad.',
        'El <strong>Talento</strong> es contar con un capital humano capaz y comprometido con el aprendizaje continuo. El valor que agrega puede ser inmenso si se traduce en inteligencia colectiva por medio del aprendizaje continuo.',
        'Una <strong>Logística</strong> efectiva se basa en una cadena de suministro que garantiza el abasto de los satisfactores y entrega el valor en el menor tiempo y en las mejores condiciones.',
        'Una <strong>Informática</strong> efectiva pone a disposición del cliente información veraz y oportuna para ubicar sus pedidos, y proporciona a la organización los datos necesarios para monitorear el desempeño y tomar decisiones.'
    ];
    const sideDescValor = [
        'El vínculo entre <strong>Personalización</strong> y <strong>Satisfacción</strong> es la <em>Experiencia del Cliente</em>: quien goza del bien suministrado ve cumplidas sus expectativas. Las necesidades pueden segmentarse según su urgencia.',
        'Un sector de negocio emerge cuando se empata una necesidad segmentada con un satisfactor diferenciado. El <em>Portafolio de Negocios</em> está constituido por sectores bien posicionados en mercados atractivos.',
        'El vínculo entre <strong>Exclusividad</strong> y <strong>Prestigio</strong> es el <em>Desarrollo de Prototipo</em>: bienes tangibles o intangibles que resultan de actividades creativas y de investigación con viabilidad comercial.',
        'Una negociación ganar-ganar alinea la promesa y la entrega de valor por medio de una <em>Propuesta de Valor</em> en la que se especifican los requisitos de calidad y costo que han de cumplirse.',
        'El vínculo entre <strong>Rendimiento</strong> y <strong>Talento</strong> es la <em>Asignación de Recursos</em> por medio de presupuestos realistas que especifican quién aporta las capacidades y en qué se aplican.',
        'La <em>Captura de Valor</em> para el inversionista depende del valor agregado al cliente, el turnover y las palancas que se apliquen, equilibrando riesgo y rentabilidad.',
        'El vínculo entre <strong>Logística</strong> e <strong>Informática</strong> son los procesos de <em>Abastecimiento de Insumos</em>. Este vínculo capta la retroalimentación de clientes para optimizar la cadena de suministro.',
        'Una <em>Organización Competente</em> tiene sistemas de información efectivos que apoyan a gente bien capacitada. La inteligencia colectiva emerge cuando se conecta información con conocimiento.'
    ];
    const vertexDescCerebral = [
        'CSO / Vendedor — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'ENFJ\',0); return false;">ENFJ</a>. Orientado por metas, solícito. Hábil comunicador. Interés vital: Influencia. Modo de ser: Audaz.',
        'COO / Operador — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'ESTJ\',1); return false;">ESTJ</a>. Decisivo, eficiente, a cargo del espectáculo. Interés vital: Afiliación. Modo de ser: Apasionado.',
        'CTO / Tecnólogo — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'INTP\',2); return false;">INTP</a>. Imaginativo. Pensador original. Creativo. Interés vital: Investigación. Modo de ser: Sereno.',
        'CMO / Mercadólogo — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'INFP\',3); return false;">INFP</a>. Sensitivo, perceptivo, creativo, leal. Interés vital: Investigación. Modo de ser: Afable.',
        'CPO / Comprador — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'ESTP\',4); return false;">ESTP</a>. Bombero. Hábil negociador. Interés vital: Influencia. Modo de ser: Audaz.',
        'CIO / Informático — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'ISTJ\',5); return false;">ISTJ</a>. Práctico, analítico, reservado. Interés vital: Análisis. Modo de ser: Sereno.',
        'CHO / Entrenador — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'ENFP\',6); return false;">ENFP</a>. Optimista, apoyador. Ve el potencial de otros. Interés vital: Afiliación. Modo de ser: Apasionado.',
        'CFO / Planificador — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'ISTP\',7); return false;">ISTP</a>. Orientado por la acción. Lógico, independiente. Interés vital: Análisis. Modo de ser: Afable.'
    ];
    const sideDescCerebral = [
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'CSO\',0); return false;">CSO</a> interviene en los mercados de clientes, consumidores finales o intermedios, donde identifica las necesidades que la empresa puede atender y negocia los términos y condiciones para atenderlas.',
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'COO\',1); return false;">COO</a> es el encargado de que las cosas sucedan en la organización. Ocasionalmente atiende los mercados fabriles para conseguir equipo o refacciones y contratar el mantenimiento de los activos fijos.',
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'CTO\',2); return false;">CTO</a> interviene en los mercados tecnológicos, donde identifica las tecnologías de vanguardia aplicables a los prototipos que desarrolla la empresa o a sus procesos.',
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'CMO\',3); return false;">CMO</a> interviene en los mercados de medios publicitarios, donde identifica la mejor manera de promover los productos y servicios de la empresa y de desarrollar una buena imagen de sus marcas.',
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'CPO\',4); return false;">CPO</a> interviene en los mercados de proveedores de insumos para la empresa. Es responsable de la estructura de costos primarios.',
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'CIO\',5); return false;">CIO</a> interviene en los mercados de tecnologías de información y comunicaciones para adquirir los sistemas informáticos que brinden las mejores herramientas para la toma de decisiones.',
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'CHO\',6); return false;">CHO</a> interviene en los mercados laborales para seleccionar y contratar a la mejor gente. Es responsable de establecer los medios para aprovechar el talento del personal.',
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'CFO\',7); return false;">CFO</a> interviene en los mercados financieros, sea de capitales o de deuda, para obtener en las mejores condiciones posibles el dinero que requiere la empresa.'
    ];

    function showOctagonInfo(userData) {
        const infoPanel = document.getElementById('octagon-info');
        infoPanel.classList.add('selected');

        const octagonName = userData.octagon === 1 ? 'Octagrama de Valor' : 'Octagrama Cerebral';
        const octColor = userData.octagon === 1 ? '#c0392b' : '#2563eb';
        const otherOctagon = userData.octagon === 1 ? 2 : 1;
        const otherOctagonName = otherOctagon === 1 ? 'Octagrama de Valor' : 'Octagrama Cerebral';
        const otherColor = otherOctagon === 1 ? '#c0392b' : '#2563eb';

        let contentHTML = '';
        let otherLabel = '';

        if (userData.type === 'vertex') {
            contentHTML = userData.octagon === 1
                ? vertexDescValor[userData.index]
                : vertexDescCerebral[userData.index];
            otherLabel = otherOctagon === 1
                ? `Vértice ${userData.index + 1} — ${vertexLabelsValor[userData.index]}`
                : `Vértice ${userData.index + 1} — ${vertexLabelsCerebral[userData.index]}`;
        } else {
            contentHTML = userData.octagon === 1
                ? sideDescValor[userData.index]
                : sideDescCerebral[userData.index];
            otherLabel = otherOctagon === 1
                ? `Lado ${userData.index + 1} — ${sideLabelsValor[userData.index]}`
                : `Lado ${userData.index + 1} — ${sideLabelsCerebral[userData.index]}`;
        }

        infoPanel.innerHTML = `
            <h3 style="margin-bottom:0.5rem;">${userData.label}</h3>
            <div style="font-size:0.75rem; color:${octColor}; font-weight:700; margin-bottom:0.75rem; text-transform:uppercase; letter-spacing:0.06em;">${octagonName} · ${userData.type === 'vertex' ? 'Vértice' : 'Lado'} ${userData.index + 1}</div>
            <p style="line-height:1.75; color:var(--dark-text); font-size:0.93rem;">${contentHTML}</p>
            <div style="margin-top:1rem; padding-top:0.75rem; border-top:1px solid rgba(0,0,0,0.1);">
                <div style="font-size:0.72rem; color:var(--light-text); margin-bottom:0.4rem;">VER EN OTRO OCTAGRAMA</div>
                <button onclick="navigateToElement(${userData.index}, ${otherOctagon}, '${userData.type}')"
                    style="background:none; border:1.5px solid ${otherColor}; color:${otherColor}; border-radius:6px; padding:0.4rem 0.9rem; cursor:pointer; font-size:0.82rem; font-weight:600; width:100%; text-align:left; transition:background 0.2s;"
                    onmouseover="this.style.background='${otherColor}20'" onmouseout="this.style.background='none'">
                    → ${otherLabel}
                </button>
            </div>
        `;
    }

    // Pulse animation for points
    let pulseTime = 0;

    // Animation function
    function animate() {
        requestAnimationFrame(animate);

        pulseTime += 0.02;

        // Subtle pulse animation for non-hovered points
        interactivePoints.forEach(point => {
            if (!point.userData.isHovered) {
                const pulse = 1 + Math.sin(pulseTime + point.userData.index * 0.5) * 0.08;
                point.children[1].scale.set(pulse, pulse, pulse); // Glow sphere
            }
        });

        // Smooth rotation (solo responde al usuario, sin auto-rotación)
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;

        octagonGroup.rotation.x = currentRotationX;
        octagonGroup.rotation.y = currentRotationY;

        renderer.render(scene, camera);
    }

    // Handle window resize
    function onWindowResize() {
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
    }

    window.addEventListener('resize', onWindowResize);
    animate();
}

// ─── Navegación cruzada y modales ────────────────────────────────────────────

// Navega al elemento correspondiente en el otro octagrama
function navigateToElement(index, octagon, type) {
    const labelsV = octagon === 1 ? vertexLabelsValor : vertexLabelsCerebral;
    const labelsS = octagon === 1 ? sideLabelsValor : sideLabelsCerebral;
    const label = type === 'vertex' ? labelsV[index] : labelsS[index];
    showOctagonInfoGlobal({ index, octagon, type, label });
}

// Versión global de showOctagonInfo (llamada desde navegación cruzada)
function showOctagonInfoGlobal(userData) {
    // Re-uses the inner function by dispatching a synthetic click event equivalent
    // We rebuild the HTML directly here since showOctagonInfo is closure-scoped
    const infoPanel = document.getElementById('octagon-info');
    infoPanel.classList.add('selected');

    const octagonName = userData.octagon === 1 ? 'Octagrama de Valor' : 'Octagrama Cerebral';
    const octColor = userData.octagon === 1 ? '#c0392b' : '#2563eb';
    const otherOctagon = userData.octagon === 1 ? 2 : 1;
    const otherColor = otherOctagon === 1 ? '#c0392b' : '#2563eb';

    const vertexDescValor = [
        'La <strong>Personalización</strong> es la individualización de la necesidad: un segmento de clientes puede ordenar un producto o servicio que se ajuste perfectamente a sus preferencias.',
        'La <strong>Satisfacción</strong> la experimenta un cliente deleitado que ha maximizado su provecho con el goce del producto o servicio suministrado.',
        'La <strong>Exclusividad</strong> es el resultado de una tecnología o knowhow con los que se han desarrollado productos o procesos innovadores y servicios de difícil imitación.',
        'El <strong>Prestigio</strong> es la buena reputación que se logra por la confianza y credibilidad en la marca.',
        'El <strong>Rendimiento</strong> de la inversión es haber alcanzado una tasa de uso muy alta de los recursos empleados, al aplicar palancas financieras y operativas.',
        'El <strong>Talento</strong> es contar con un capital humano capaz y comprometido con el aprendizaje continuo.',
        'Una <strong>Logística</strong> efectiva garantiza el abasto de los satisfactores y entrega el valor en el menor tiempo y en las mejores condiciones.',
        'Una <strong>Informática</strong> efectiva pone a disposición información veraz y oportuna para monitorear el desempeño y tomar decisiones.'
    ];
    const sideDescValor = [
        'El vínculo entre <strong>Personalización</strong> y <strong>Satisfacción</strong> es la <em>Experiencia del Cliente</em>.',
        'El <em>Portafolio de Negocios</em> está constituido por sectores bien posicionados en mercados atractivos.',
        'El <em>Desarrollo de Prototipo</em> prueba viabilidad comercial a partir de actividades creativas y de investigación.',
        'La <em>Propuesta de Valor</em> alinea promesa y entrega especificando requisitos de calidad y costo.',
        'La <em>Asignación de Recursos</em> se hace por medio de presupuestos realistas que especifican quién aporta las capacidades y en qué se aplican.',
        'La <em>Captura de Valor</em> depende del valor agregado al cliente, el turnover y las palancas que se apliquen.',
        'El <em>Abastecimiento de Insumos</em> vincula logística e informática captando retroalimentación de clientes.',
        'Una <em>Organización Competente</em> conecta sistemas de información efectivos con gente bien capacitada.'
    ];
    const vertexDescCerebral = [
        'CSO / Vendedor — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'ENFJ\',0); return false;">ENFJ</a>. Orientado por metas, solícito. Hábil comunicador. Interés vital: Influencia. Modo de ser: Audaz.',
        'COO / Operador — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'ESTJ\',1); return false;">ESTJ</a>. Decisivo, eficiente, a cargo del espectáculo. Interés vital: Afiliación. Modo de ser: Apasionado.',
        'CTO / Tecnólogo — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'INTP\',2); return false;">INTP</a>. Imaginativo. Pensador original. Creativo. Interés vital: Investigación. Modo de ser: Sereno.',
        'CMO / Mercadólogo — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'INFP\',3); return false;">INFP</a>. Sensitivo, perceptivo, creativo, leal. Interés vital: Investigación. Modo de ser: Afable.',
        'CPO / Comprador — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'ESTP\',4); return false;">ESTP</a>. Bombero. Hábil negociador. Interés vital: Influencia. Modo de ser: Audaz.',
        'CIO / Informático — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'ISTJ\',5); return false;">ISTJ</a>. Práctico, analítico, reservado. Interés vital: Análisis. Modo de ser: Sereno.',
        'CHO / Entrenador — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'ENFP\',6); return false;">ENFP</a>. Optimista, apoyador. Ve el potencial de otros. Interés vital: Afiliación. Modo de ser: Apasionado.',
        'CFO / Planificador — <a href="#" class="sensitive-word" onclick="showMBTIInfo(\'ISTP\',7); return false;">ISTP</a>. Orientado por la acción. Lógico, independiente. Interés vital: Análisis. Modo de ser: Afable.'
    ];
    const sideDescCerebral = [
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'CSO\',0); return false;">CSO</a> interviene en los mercados de clientes identificando necesidades y negociando condiciones.',
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'COO\',1); return false;">COO</a> es el encargado de que las cosas sucedan. Atiende los mercados fabriles para activos fijos.',
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'CTO\',2); return false;">CTO</a> interviene en los mercados tecnológicos identificando tecnologías de vanguardia.',
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'CMO\',3); return false;">CMO</a> interviene en los mercados de medios publicitarios para promover productos y marcas.',
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'CPO\',4); return false;">CPO</a> interviene en los mercados de proveedores. Es responsable de la estructura de costos primarios.',
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'CIO\',5); return false;">CIO</a> interviene en los mercados de TIC\'s para adquirir sistemas informáticos para la toma de decisiones.',
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'CHO\',6); return false;">CHO</a> interviene en los mercados laborales para seleccionar y aprovechar el talento del personal.',
        'El <a href="#" class="sensitive-word" onclick="showRoleInfo(\'CFO\',7); return false;">CFO</a> interviene en los mercados financieros para obtener el dinero que requiere la empresa.'
    ];

    let contentHTML = '';
    let otherLabel = '';
    if (userData.type === 'vertex') {
        contentHTML = userData.octagon === 1 ? vertexDescValor[userData.index] : vertexDescCerebral[userData.index];
        const otherLabels = otherOctagon === 1 ? vertexLabelsValor : vertexLabelsCerebral;
        otherLabel = `Vértice ${userData.index + 1} — ${otherLabels[userData.index]}`;
    } else {
        contentHTML = userData.octagon === 1 ? sideDescValor[userData.index] : sideDescCerebral[userData.index];
        const otherLabels = otherOctagon === 1 ? sideLabelsValor : sideLabelsCerebral;
        otherLabel = `Lado ${userData.index + 1} — ${otherLabels[userData.index]}`;
    }

    infoPanel.innerHTML = `
        <h3 style="margin-bottom:0.5rem;">${userData.label}</h3>
        <div style="font-size:0.75rem; color:${octColor}; font-weight:700; margin-bottom:0.75rem; text-transform:uppercase; letter-spacing:0.06em;">${octagonName} · ${userData.type === 'vertex' ? 'Vértice' : 'Lado'} ${userData.index + 1}</div>
        <p style="line-height:1.75; color:var(--dark-text); font-size:0.93rem;">${contentHTML}</p>
        <div style="margin-top:1rem; padding-top:0.75rem; border-top:1px solid rgba(0,0,0,0.1);">
            <div style="font-size:0.72rem; color:var(--light-text); margin-bottom:0.4rem;">VER EN OTRO OCTAGRAMA</div>
            <button onclick="navigateToElement(${userData.index}, ${otherOctagon}, '${userData.type}')"
                style="background:none; border:1.5px solid ${otherColor}; color:${otherColor}; border-radius:6px; padding:0.4rem 0.9rem; cursor:pointer; font-size:0.82rem; font-weight:600; width:100%; text-align:left;"
                onmouseover="this.style.background='${otherColor}20'" onmouseout="this.style.background='none'">
                → ${otherLabel}
            </button>
        </div>
    `;
}

// Muestra modal con perfil MBTI
function showMBTIInfo(code, vertexIndex) {
    const info = mbtiInfo[code];
    if (!info) return;
    const sideLabel = sideLabelsValor[vertexIndex] || '';
    document.getElementById('oct-modal-title').textContent = `${code} — ${info.nombre}`;
    document.getElementById('oct-modal-body').innerHTML = `
        <p style="margin-bottom:1rem; line-height:1.7;">${info.descripcion}</p>
        <div style="background:#f8f9fa; border-radius:8px; padding:0.85rem 1rem; margin-bottom:0.75rem;">
            <div style="font-size:0.72rem; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:0.35rem;">Fortalezas</div>
            <p style="font-size:0.9rem; color:#202124;">${info.fortalezas}</p>
        </div>
        <div style="background:#fff3f3; border-radius:8px; padding:0.85rem 1rem;">
            <div style="font-size:0.72rem; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:0.35rem;">Áreas de desarrollo</div>
            <p style="font-size:0.9rem; color:#202124;">${info.desafios}</p>
        </div>
    `;
    document.getElementById('oct-modal-footer').innerHTML = `
        <button onclick="closeOctModal(); navigateToElement(${vertexIndex}, 1, 'vertex');"
            style="background:none; border:1.5px solid #c0392b; color:#c0392b; border-radius:6px; padding:0.4rem 0.9rem; cursor:pointer; font-size:0.82rem; font-weight:600; margin-right:0.5rem;">
            → Vértice ${vertexIndex + 1} del Octagrama de Valor
        </button>
        <button onclick="closeOctModal(); navigateToElement(${vertexIndex}, 2, 'side');"
            style="background:none; border:1.5px solid #2563eb; color:#2563eb; border-radius:6px; padding:0.4rem 0.9rem; cursor:pointer; font-size:0.82rem; font-weight:600;">
            → Lado ${vertexIndex + 1} OC: ${sideLabelsCerebral[vertexIndex]}
        </button>
    `;
    document.getElementById('oct-modal').style.display = 'flex';
}

// Muestra modal con info del rol C-suite
function showRoleInfo(role, sideIndex) {
    const roleNames = {
        'CSO': 'Chief Sales Officer — Director de Ventas',
        'COO': 'Chief Operating Officer — Director de Operaciones',
        'CTO': 'Chief Technology Officer — Director de Tecnología',
        'CMO': 'Chief Marketing Officer — Director de Mercadotecnia',
        'CPO': 'Chief Procurement Officer — Director de Compras',
        'CIO': 'Chief Information Officer — Director de Informática',
        'CHO': 'Chief Human Officer — Director de Capital Humano',
        'CFO': 'Chief Financial Officer — Director Financiero'
    };
    const vertex = vertexLabelsCerebral[sideIndex] || '';
    document.getElementById('oct-modal-title').textContent = `${role} — ${roleNames[role] || role}`;
    document.getElementById('oct-modal-body').innerHTML = `
        <p style="line-height:1.7; margin-bottom:1rem;">${sideDescCerebralPlain[sideIndex]}</p>
        <div style="background:#f0f4ff; border-radius:8px; padding:0.85rem 1rem;">
            <div style="font-size:0.72rem; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:0.35rem;">Vértice asociado</div>
            <p style="font-size:0.9rem; color:#202124;">${vertex}</p>
        </div>
    `;
    document.getElementById('oct-modal-footer').innerHTML = `
        <button onclick="closeOctModal(); navigateToElement(${sideIndex}, 1, 'side');"
            style="background:none; border:1.5px solid #c0392b; color:#c0392b; border-radius:6px; padding:0.4rem 0.9rem; cursor:pointer; font-size:0.82rem; font-weight:600; margin-right:0.5rem;">
            → Lado ${sideIndex + 1} del Octagrama de Valor
        </button>
        <button onclick="closeOctModal(); navigateToElement(${sideIndex}, 2, 'vertex');"
            style="background:none; border:1.5px solid #2563eb; color:#2563eb; border-radius:6px; padding:0.4rem 0.9rem; cursor:pointer; font-size:0.82rem; font-weight:600;">
            → Vértice ${sideIndex + 1} OC: ${vertexLabelsCerebral[sideIndex]}
        </button>
    `;
    document.getElementById('oct-modal').style.display = 'flex';
}

function closeOctModal() {
    document.getElementById('oct-modal').style.display = 'none';
}

// Helper: texto plano de sideDescCerebral (para modal de rol)
const sideDescCerebralPlain = [
    'El CSO interviene en los mercados de clientes, consumidores finales o intermedios, donde identifica las necesidades que la empresa puede atender y negocia los términos y condiciones para atenderlas.',
    'El COO es el encargado de que las cosas sucedan en la organización. Ocasionalmente atiende los mercados fabriles para conseguir equipo o refacciones y contratar el mantenimiento de los activos fijos.',
    'El CTO interviene en los mercados tecnológicos, donde identifica las tecnologías de vanguardia aplicables a los prototipos que desarrolla la empresa o a sus procesos.',
    'El CMO interviene en los mercados de medios publicitarios, donde identifica la mejor manera de promover los productos y servicios de la empresa y de desarrollar una buena imagen de sus marcas.',
    'El CPO interviene en los mercados de proveedores de insumos para la empresa. Es responsable de la estructura de costos primarios.',
    'El CIO interviene en los mercados de tecnologías de información y comunicaciones para adquirir los sistemas informáticos que brinden las mejores herramientas para la toma de decisiones.',
    'El CHO interviene en los mercados laborales para seleccionar y contratar a la mejor gente. Es responsable de establecer los medios para aprovechar el talento del personal.',
    'El CFO interviene en los mercados financieros, sea de capitales o de deuda, para obtener en las mejores condiciones posibles el dinero que requiere la empresa.'
];

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

        // Calculate per-eje and per-section averages
        const ejeStats = quizData.ejes.map(eje => {
            const secciones = eje.secciones.map(sec => {
                const scores = sec.preguntas.map(p => answers[p.id] || 0).filter(s => s > 0);
                const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
                return { nombre: sec.nombre, avg: avg.toFixed(2), scores };
            });
            const allScores = secciones.flatMap(s => s.scores);
            const ejeAvg = allScores.length ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
            return { eje, secciones, avg: ejeAvg };
        });

        // Overall average
        const allScores = ejeStats.flatMap(e => e.secciones.flatMap(s => s.scores));
        const overallAvg = allScores.length ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;

        function getNivel(avg) {
            return quizData.niveles.find(n => avg >= n.min && avg <= n.max)
                || quizData.niveles[0];
        }

        function pct(avg) { return Math.round(((avg - 1) / 4) * 100); }

        const overallNivel = getNivel(overallAvg);
        const overallPct = pct(overallAvg);

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

            <!-- Per-eje cards -->
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

                            <!-- Secciones breakdown -->
                            <div class="d3d-sec-breakdown">
                                ${secciones.map(sec => {
                                    const sn = getNivel(parseFloat(sec.avg));
                                    const sp = pct(parseFloat(sec.avg));
                                    return `
                                        <div class="d3d-sec-row">
                                            <span class="d3d-sec-name">${sec.nombre}</span>
                                            <div class="d3d-sec-bar-track">
                                                <div class="d3d-sec-bar-fill" style="width:${sp}%; background:${sn.color}"></div>
                                            </div>
                                            <span class="d3d-sec-score" style="color:${sn.color}">${sec.avg}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <p class="d3d-results-cta">
                Para una evaluación más detallada y un plan de acción personalizado,
                <strong>contáctenos</strong> para una sesión de consultoría.
            </p>
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
