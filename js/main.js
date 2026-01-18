// Global variables
let currentQuestion = 0;
let quizData = null;
let userAnswers = [];

// Document ready initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeTabNavigation();
    initialize3DOctagon();
    initializeChat();
    loadQuizData();
    initializeGlossarySearch();
});

// Initialize glossary search functionality
function initializeGlossarySearch() {
    const searchInput = document.getElementById('glossary-search');
    const searchButton = document.querySelector('.search-button');
    const resultsContainer = document.getElementById('glossary-results');
    
    // Sample glossary data (will be replaced with actual data later)
    const glossaryData = {
        'estrategia': 'Define la dirección y objetivos a largo plazo de la organización. Incluye la visión, misión, y el plan estratégico general.',
        'estructura': 'Se refiere a la organización formal, jerarquías, departamentos y cómo se distribuyen las responsabilidades.',
        'sistemas': 'Procesos, procedimientos y tecnologías que apoyan las operaciones diarias de la empresa.',
        'personal': 'Los recursos humanos de la organización, incluyendo estructura de roles y responsabilidades.',
        'habilidades': 'Las competencias, conocimientos y capacidades disponibles en la organización.',
        'estilos': 'El estilo de liderazgo y la forma en que se toman las decisiones en la empresa.',
        'valores': 'Los principios y creencias compartidas que guían el comportamiento organizacional.',
        'objetivos': 'Las metas específicas y medibles que la organización busca alcanzar.'
    };
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            resultsContainer.innerHTML = '<p><em>El glosario completo se cargará próximamente con definiciones detalladas de todos los términos relevantes para la transformación organizacional.</em></p>';
            return;
        }
        
        const results = [];
        
        // Search for exact matches and partial matches
        Object.keys(glossaryData).forEach(term => {
            if (term.includes(searchTerm) || searchTerm.includes(term)) {
                results.push({
                    term: term,
                    definition: glossaryData[term]
                });
            }
        });
        
        // Display results
        if (results.length > 0) {
            let resultsHTML = '<h4 style="color: var(--primary-color); margin-bottom: 1rem;">Resultados de búsqueda:</h4>';
            results.forEach(result => {
                resultsHTML += `
                    <div style="margin-bottom: 1.5rem; padding: 1rem; background-color: var(--light-color); border-radius: 8px;">
                        <h5 style="color: var(--primary-color); margin-bottom: 0.5rem; text-transform: capitalize;">${result.term}</h5>
                        <p style="color: var(--light-text); line-height: 1.6;">${result.definition}</p>
                    </div>
                `;
            });
            resultsContainer.innerHTML = resultsHTML;
        } else {
            resultsContainer.innerHTML = '<p style="color: var(--light-text); font-style: italic;">No se encontraron resultados para "' + searchTerm + '". El glosario se está expandiendo continuamente.</p>';
        }
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

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
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let hoveredPoint = null;
    let currentLabel = null;

    // Create octagon group
    const octagonGroup = new THREE.Group();
    scene.add(octagonGroup);

    // Labels data
    const vertexLabels = [
        "Estrategia", "Estructura", "Sistemas", "Personal",
        "Habilidades", "Estilos", "Valores", "Objetivos"
    ];

    const sideLabels = [
        "Estrategia-Estructura", "Estructura-Sistemas", "Sistemas-Personal", "Personal-Habilidades",
        "Habilidades-Estilos", "Estilos-Valores", "Valores-Objetivos", "Objetivos-Estrategia"
    ];

    // Color schemes
    const colors = {
        octagon1: { normal: 0x1a73e8, hover: 0x0d47a1 },
        octagon2: { normal: 0x4285f4, hover: 0x1565c0 },
        vertex: { normal: 0x757575, hover: 0xffc107, glow: 0x9e9e9e, emissive: 0x616161 },  // Gray
        side: { normal: 0x757575, hover: 0xff9800, glow: 0x9e9e9e, emissive: 0x616161 }     // Same gray
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

    // Create vertex points for top octagon (dark blue spheres)
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.2;
        const z = Math.sin(angle) * 1.2;
        createVertexPoint(new THREE.Vector3(x, 0.5, z), i, 1, vertexLabels[i]);
    }

    // Create vertex points for bottom octagon (dark blue spheres)
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.2;
        const z = Math.sin(angle) * 1.2;
        createVertexPoint(new THREE.Vector3(x, -0.5, z), i, 2, vertexLabels[i]);
    }

    // Create side bars for top octagon (cyan/teal bars between vertices)
    // Position them slightly outside the octagon edge, parallel to each side
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + (Math.PI / 8);
        const x = Math.cos(angle) * 1.35;  // Slightly outside the octagon
        const z = Math.sin(angle) * 1.35;
        createSideBar(new THREE.Vector3(x, 0.5, z), angle, i, 1, sideLabels[i]);
    }

    // Create side bars for bottom octagon (cyan/teal bars)
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + (Math.PI / 8);
        const x = Math.cos(angle) * 1.35;  // Slightly outside the octagon
        const z = Math.sin(angle) * 1.35;
        createSideBar(new THREE.Vector3(x, -0.5, z), angle, i, 2, sideLabels[i]);
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

    function showOctagonInfo(userData) {
        const infoPanel = document.getElementById('octagon-info');
        infoPanel.classList.add('selected');

        let title = '';
        let description = '';

        if (userData.type === 'vertex') {
            title = `${userData.label} - Octágono ${userData.octagon}`;
            description = getVertexDescription(userData.label);
        } else if (userData.type === 'side') {
            title = `${userData.label} - Octágono ${userData.octagon}`;
            description = getSideDescription(userData.index);
        }

        infoPanel.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <p style="margin-top: 1rem; font-style: italic; color: var(--light-text);">Pase el cursor sobre los puntos para ver más información.</p>
        `;
    }

    function getVertexDescription(vertexName) {
        const descriptions = {
            'Estrategia': 'Define la dirección y objetivos a largo plazo de la organización. Incluye la visión, misión, y el plan estratégico general.',
            'Estructura': 'Se refiere a la organización formal, jerarquías, departamentos y cómo se distribuyen las responsabilidades.',
            'Sistemas': 'Procesos, procedimientos y tecnologías que apoyan las operaciones diarias de la empresa.',
            'Personal': 'Los recursos humanos de la organización, incluyendo estructura de roles y responsabilidades.',
            'Habilidades': 'Las competencias, conocimientos y capacidades disponibles en la organización.',
            'Estilos': 'El estilo de liderazgo y la forma en que se toman las decisiones en la empresa.',
            'Valores': 'Los principios y creencias compartidas que guían el comportamiento organizacional.',
            'Objetivos': 'Las metas específicas y medibles que la organización busca alcanzar.'
        };
        return descriptions[vertexName] || 'Descripción no disponible.';
    }

    function getSideDescription(index) {
        const descriptions = [
            'La conexión entre estrategia y estructura asegura que la organización esté alineada con sus objetivos.',
            'La relación entre estructura y sistemas facilita la implementación efectiva de procesos.',
            'Los sistemas y el personal deben trabajar en armonía para maximizar la productividad.',
            'El personal y las habilidades representan el capital humano de la organización.',
            'Las habilidades y los estilos de liderazgo determinan la efectividad operacional.',
            'Los estilos y valores definen la cultura organizacional.',
            'Los valores y objetivos proporcionan dirección y propósito.',
            'Los objetivos se conectan con la estrategia para cerrar el ciclo del modelo.'
        ];
        return descriptions[index] || 'Descripción de conexión no disponible.';
    }

    // Pulse animation for points
    let pulseTime = 0;

    // Animation function
    function animate() {
        requestAnimationFrame(animate);

        // Subtle pulse animation for non-hovered points
        interactivePoints.forEach(point => {
            if (!point.userData.isHovered) {
                const pulse = 1 + Math.sin(pulseTime + point.userData.index * 0.5) * 0.08;
                point.children[1].scale.set(pulse, pulse, pulse); // Glow sphere
            }
        });

        // Smooth rotation
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;

        octagonGroup.rotation.x = currentRotationX;
        octagonGroup.rotation.y = currentRotationY;

        // Auto-rotation when not being controlled
        if (!mouseDown && !hoveredPoint) {
            targetRotationY += 0.002;
        }

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

// Quiz Functions
async function loadQuizData() {
    try {
        const response = await fetch('data/quiz-questions.json');
        quizData = await response.json();
        initializeQuiz();
    } catch (error) {
        console.error('Error loading quiz data:', error);
        // Fallback to hardcoded questions if JSON fails to load
        loadFallbackQuizData();
    }
}

function loadFallbackQuizData() {
    quizData = {
        questions: [
            {
                id: 1,
                text: "¿Su empresa tiene una estrategia claramente definida y comunicada a todos los niveles?",
                category: "Estrategia",
                options: [
                    { value: "a", text: "Sí, totalmente definida y comunicada efectivamente", score: 4 },
                    { value: "b", text: "Parcialmente definida pero no comunicada efectivamente", score: 3 },
                    { value: "c", text: "Definida pero no alineada con las operaciones diarias", score: 2 },
                    { value: "d", text: "No tenemos una estrategia claramente definida", score: 1 }
                ]
            },
            {
                id: 2,
                text: "¿Cómo calificaría la estructura organizacional de su empresa?",
                category: "Estructura",
                options: [
                    { value: "a", text: "Claramente definida y efectiva para nuestros objetivos", score: 4 },
                    { value: "b", text: "Definida pero con algunas ineficiencias", score: 3 },
                    { value: "c", text: "Demasiado rígida y limita la innovación", score: 2 },
                    { value: "d", text: "Confusa o inexistente en algunos departamentos", score: 1 }
                ]
            },
            {
                id: 3,
                text: "¿Sus procesos y sistemas están documentados y optimizados?",
                category: "Sistemas",
                options: [
                    { value: "a", text: "Completamente documentados y optimizados", score: 4 },
                    { value: "b", text: "Documentados pero no optimizados", score: 3 },
                    { value: "c", text: "Parcialmente documentados", score: 2 },
                    { value: "d", text: "Apenas documentados o inexistentes", score: 1 }
                ]
            }
        ]
    };
    initializeQuiz();
}

function initializeQuiz() {
    const quizContent = document.getElementById('quiz-content');
    quizContent.innerHTML = '';
    
    // Create questions
    quizData.questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.dataset.question = index + 1;
        if (index === 0) questionDiv.classList.add('active');
        
        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        questionText.textContent = `Pregunta ${index + 1}: ${question.text}`;
        questionDiv.appendChild(questionText);
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'answer-options';
        
        question.options.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'answer-option';
            optionDiv.dataset.value = option.value;
            optionDiv.dataset.score = option.score;
            optionDiv.dataset.category = question.category;
            optionDiv.textContent = option.text;
            
            optionDiv.addEventListener('click', function() {
                // Remove selected class from all options in this question
                optionsDiv.querySelectorAll('.answer-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Store the answer
                userAnswers[index] = {
                    questionId: question.id,
                    category: question.category,
                    value: option.value,
                    score: option.score
                };
                
                // Enable next button
                document.getElementById('next-btn').disabled = false;
            });
            
            optionsDiv.appendChild(optionDiv);
        });
        
        questionDiv.appendChild(optionsDiv);
        quizContent.appendChild(questionDiv);
    });
    
    // Add navigation
    const navDiv = document.createElement('div');
    navDiv.className = 'quiz-nav';
    
    const prevButton = document.createElement('button');
    prevButton.id = 'prev-btn';
    prevButton.className = 'quiz-button';
    prevButton.textContent = 'Anterior';
    prevButton.disabled = true;
    
    const nextButton = document.createElement('button');
    nextButton.id = 'next-btn';
    nextButton.className = 'quiz-button';
    nextButton.textContent = 'Siguiente';
    nextButton.disabled = true;
    
    navDiv.appendChild(prevButton);
    navDiv.appendChild(nextButton);
    quizContent.appendChild(navDiv);
    
    initializeQuizNavigation();
}

function initializeQuizNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    currentQuestion = 0;
    
    prevBtn.addEventListener('click', function() {
        document.querySelector(`.quiz-question[data-question="${currentQuestion + 1}"]`).classList.remove('active');
        currentQuestion--;
        document.querySelector(`.quiz-question[data-question="${currentQuestion + 1}"]`).classList.add('active');
        
        nextBtn.textContent = 'Siguiente';
        nextBtn.disabled = !userAnswers[currentQuestion];
        prevBtn.disabled = currentQuestion === 0;
    });
    
    nextBtn.addEventListener('click', function() {
        document.querySelector(`.quiz-question[data-question="${currentQuestion + 1}"]`).classList.remove('active');
        currentQuestion++;
        
        if (currentQuestion < quizData.questions.length) {
            document.querySelector(`.quiz-question[data-question="${currentQuestion + 1}"]`).classList.add('active');
            prevBtn.disabled = false;
            
            if (currentQuestion === quizData.questions.length - 1) {
                nextBtn.textContent = 'Ver Resultados';
            }
            
            nextBtn.disabled = !userAnswers[currentQuestion];
        } else {
            showQuizResults();
        }
    });
    
    restartBtn.addEventListener('click', function() {
        document.getElementById('quiz-results').style.display = 'none';
        document.getElementById('quiz-content').style.display = 'block';
        
        // Reset quiz state
        currentQuestion = 0;
        userAnswers = [];
        
        // Reset UI
        document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
        document.querySelector('.quiz-question[data-question="1"]').classList.add('active');
        document.querySelectorAll('.answer-option').forEach(opt => opt.classList.remove('selected'));
        
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        nextBtn.textContent = 'Siguiente';
    });
}

function showQuizResults() {
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    
    generateQuizResults();
}

function generateQuizResults() {
    const resultsContainer = document.getElementById('results-detail');
    resultsContainer.innerHTML = '';
    
    // Calculate scores by category
    const categoryScores = {};
    const categories = ['Estrategia', 'Estructura', 'Sistemas', 'Personal', 'Habilidades', 'Estilos', 'Valores', 'Objetivos'];
    
    // Initialize categories
    categories.forEach(cat => {
        categoryScores[cat] = { total: 0, count: 0, percentage: 0 };
    });
    
    // Calculate scores
    userAnswers.forEach(answer => {
        if (answer && categoryScores[answer.category]) {
            categoryScores[answer.category].total += answer.score;
            categoryScores[answer.category].count += 1;
        }
    });
    
    // Calculate percentages
    Object.keys(categoryScores).forEach(category => {
        const data = categoryScores[category];
        if (data.count > 0) {
            data.percentage = Math.round((data.total / (data.count * 4)) * 100);
        }
    });
    
    // Sort categories by score
    const sortedCategories = Object.entries(categoryScores)
        .filter(([category, data]) => data.count > 0)
        .sort(([,a], [,b]) => a.percentage - b.percentage);
    
    // Create results display
    const resultsDiv = document.createElement('div');
    
    // Strengths
    const strengthsTitle = document.createElement('h3');
    strengthsTitle.textContent = 'Fortalezas Principales';
    strengthsTitle.style.color = 'var(--primary-color)';
    strengthsTitle.style.marginBottom = '1rem';
    resultsDiv.appendChild(strengthsTitle);
    
    const strengthsList = document.createElement('div');
    strengthsList.style.marginBottom = '2rem';
    
    sortedCategories.slice(-3).reverse().forEach(([category, data]) => {
        const item = document.createElement('div');
        item.style.padding = '0.5rem';
        item.style.backgroundColor = 'var(--light-color)';
        item.style.borderRadius = '5px';
        item.style.marginBottom = '0.5rem';
        item.innerHTML = `<strong>${category}</strong>: ${data.percentage}% de efectividad`;
        strengthsList.appendChild(item);
    });
    resultsDiv.appendChild(strengthsList);
    
    // Areas to improve
    const improvementTitle = document.createElement('h3');
    improvementTitle.textContent = 'Áreas de Oportunidad';
    improvementTitle.style.color = 'var(--primary-color)';
    improvementTitle.style.marginBottom = '1rem';
    resultsDiv.appendChild(improvementTitle);
    
    const improvementList = document.createElement('div');
    improvementList.style.marginBottom = '2rem';
    
    sortedCategories.slice(0, 3).forEach(([category, data]) => {
        const item = document.createElement('div');
        item.style.padding = '0.5rem';
        item.style.backgroundColor = '#fff3cd';
        item.style.borderRadius = '5px';
        item.style.marginBottom = '0.5rem';
        item.innerHTML = `<strong>${category}</strong>: ${data.percentage}% de efectividad`;
        improvementList.appendChild(item);
    });
    resultsDiv.appendChild(improvementList);
    
    // Recommendations
    const recommendationText = document.createElement('p');
    recommendationText.style.fontStyle = 'italic';
    recommendationText.style.textAlign = 'center';
    recommendationText.style.marginTop = '2rem';
    recommendationText.textContent = 'Basado en su diagnóstico, recomendamos enfocar sus esfuerzos de mejora en las áreas mencionadas arriba. Para una evaluación más detallada y un plan de acción personalizado, contáctenos para una sesión de consultoría.';
    resultsDiv.appendChild(recommendationText);
    
    resultsContainer.appendChild(resultsDiv);
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
