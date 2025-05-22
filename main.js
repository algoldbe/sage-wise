// main.js - JavaScript principal del sitio

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar navegación por pestañas
    initTabNavigation();
    
    // Inicializar octágonos 3D
    init3DOctagons();
    
    // Inicializar quiz
    initQuiz();
    
    // Inicializar chat
    initChat();
});

// Navegación por pestañas
function initTabNavigation() {
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

// Inicializar octágonos 3D
function init3DOctagons() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    const container = document.getElementById('octagon-container');
    if (!container) return;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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
    
    // Create octagon group
    const octagonGroup = new THREE.Group();
    scene.add(octagonGroup);
    
    // Octagon labels for vertices
    const vertexLabels = [
        "Vértice 1", "Vértice 2", "Vértice 3", "Vértice 4",
        "Vértice 5", "Vértice 6", "Vértice 7", "Vértice 8"
    ];
    
    // Side labels
    const sideLabels = [
        "Lado 1", "Lado 2", "Lado 3", "Lado 4",
        "Lado 5", "Lado 6", "Lado 7", "Lado 8"
    ];
    
    // Create two octagons
    const octagonGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.15, 8);
    const octagonMaterial1 = new THREE.MeshPhongMaterial({ 
        color: 0x1a73e8,
        transparent: true,
        opacity: 0.8,
        flatShading: true
    });
    const octagonMaterial2 = new THREE.MeshPhongMaterial({ 
        color: 0x4285f4,
        transparent: true,
        opacity: 0.8,
        flatShading: true
    });
    
    const octagon1 = new THREE.Mesh(octagonGeometry, octagonMaterial1);
    octagon1.position.y = 0.5;
    octagonGroup.add(octagon1);
    
    const octagon2 = new THREE.Mesh(octagonGeometry, octagonMaterial2);
    octagon2.position.y = -0.5;
    octagonGroup.add(octagon2);
    
    // Create text sprites for labels
    function createTextSprite(text, color = '#1a73e8') {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        canvas.width = 256;
        canvas.height = 64;
        
        context.fillStyle = color;
        context.font = 'Bold 16px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.8, 0.2, 1);
        
        return sprite;
    }
    
    // Add vertex labels for top octagon
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.6;
        const z = Math.sin(angle) * 1.6;
        
        const label = createTextSprite(vertexLabels[i]);
        label.position.set(x, 0.8, z);
        label.userData = { type: 'vertex', index: i, octagon: 1 };
        octagonGroup.add(label);
    }
    
    // Add vertex labels for bottom octagon
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.6;
        const z = Math.sin(angle) * 1.6;
        
        const label = createTextSprite(vertexLabels[i], '#4285f4');
        label.position.set(x, -0.8, z);
        label.userData = { type: 'vertex', index: i, octagon: 2 };
        octagonGroup.add(label);
    }
    
    // Add side labels for top octagon
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + (Math.PI / 8);
        const x = Math.cos(angle) * 1.4;
        const z = Math.sin(angle) * 1.4;
        
        const label = createTextSprite(sideLabels[i]);
        label.position.set(x, 0.5, z);
        label.userData = { type: 'side', index: i, octagon: 1 };
        octagonGroup.add(label);
    }
    
    // Add side labels for bottom octagon
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + (Math.PI / 8);
        const x = Math.cos(angle) * 1.4;
        const z = Math.sin(angle) * 1.4;
        
        const label = createTextSprite(sideLabels[i], '#4285f4');
        label.position.set(x, -0.5, z);
        label.userData = { type: 'side', index: i, octagon: 2 };
        octagonGroup.add(label);
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    camera.position.set(0, 0, 4);
    
    // Mouse event handlers
    container.addEventListener('mousedown', onMouseDown, false);
    container.addEventListener('mousemove', onMouseMove, false);
    container.addEventListener('mouseup', onMouseUp, false);
    container.addEventListener('click', onMouseClick, false);
    
    function onMouseDown(event) {
        mouseDown = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
    }
    
    function onMouseMove(event) {
        if (!mouseDown) return;
        
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;
        
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        
        mouseX = event.clientX;
        mouseY = event.clientY;
    }
    
    function onMouseUp(event) {
        mouseDown = false;
    }
    
    function onMouseClick(event) {
        const rect = container.getBoundingClientRect();
        const mouse = new THREE.Vector2();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        
        const intersects = raycaster.intersectObjects(octagonGroup.children, true);
        
        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (object.userData && (object.userData.type === 'vertex' || object.userData.type === 'side')) {
                showOctagonInfo(object.userData);
            }
        }
    }
    
    function showOctagonInfo(userData) {
        const infoPanel = document.getElementById('octagon-info');
        if (!infoPanel) return;
        
        infoPanel.classList.remove('default');
        infoPanel.classList.add('selected');
        
        let title = '';
        let description = '';
        
        if (userData.type === 'vertex') {
            title = `${vertexLabels[userData.index]} - Octágono ${userData.octagon}`;
            description = `Este vértice representa un punto de convergencia crítico en nuestro modelo. Los vértices son intersecciones donde múltiples elementos del sistema organizacional se encuentran y requieren especial atención para el análisis integral.`;
        } else if (userData.type === 'side') {
            title = `${sideLabels[userData.index]} - Octágono ${userData.octagon}`;
            description = `Este lado conecta elementos clave del modelo organizacional. Los lados representan las relaciones y flujos entre diferentes componentes del sistema, fundamentales para entender la dinámica empresarial.`;
        }
        
        infoPanel.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <p style="margin-top: 1rem; font-style: italic; color: var(--light-text);">Haga clic en otros elementos para explorar más componentes del modelo.</p>
        `;
    }
    
    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        
        // Smooth rotation
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;
        
        octagonGroup.rotation.x = currentRotationX;
        octagonGroup.rotation.y = currentRotationY;
        
        // Auto-rotation when not being controlled
        if (!mouseDown) {
            targetRotationY += 0.003;
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
    }
    
    window.addEventListener('resize', onWindowResize);
    
    animate();
}

// Inicializar Quiz
function initQuiz() {
    if (typeof quizQuestions === 'undefined') {
        console.log('quiz-questions.js no encontrado');
        return;
    }
    
    loadQuizQuestions();
}

function loadQuizQuestions() {
    const quizContent = document.getElementById('quiz-content');
    if (!quizContent) return;
    
    // Clear existing content
    quizContent.innerHTML = '';
    
    // Load questions dynamically
    quizQuestions.forEach((question, index) => {
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
            optionDiv.dataset.score = option.score || 1;
            optionDiv.textContent = option.text;
            
            optionDiv.addEventListener('click', function() {
                // Remove selected class from all options in this question
                optionsDiv.querySelectorAll('.answer-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Enable next button if an option is selected
                const nextBtn = document.getElementById('next-btn');
                if (nextBtn) nextBtn.disabled = false;
            });
            
            optionsDiv.appendChild(optionDiv);
        });
        
        questionDiv.appendChild(optionsDiv);
        quizContent.appendChild(questionDiv);
    });
    
    // Add navigation buttons
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
    
    // Initialize event listeners for navigation
    initQuizNavigation();
}

function initQuizNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentQuestion = 0;
    
    if (!prevBtn || !nextBtn) return;
    
    prevBtn.addEventListener('click', function() {
        // Hide current question
        const currentQ = document.querySelector(`.quiz-question[data-question="${currentQuestion + 1}"]`);
        if (currentQ) currentQ.classList.remove('active');
        
        // Show previous question
        currentQuestion--;
        const prevQ = document.querySelector(`.quiz-question[data-question="${currentQuestion + 1}"]`);
        if (prevQ) prevQ.classList.add('active');
        
        // Update buttons
        nextBtn.textContent = 'Siguiente';
        if (currentQuestion === 0) {
            prevBtn.disabled = true;
        }
        
        // Check if current question has selected option
        const selectedOption = prevQ ? prevQ.querySelector('.answer-option.selected') : null;
        nextBtn.disabled = !selectedOption;
    });
    
    nextBtn.addEventListener('click', function() {
        // Hide current question
        const currentQ = document.querySelector(`.quiz-question[data-question="${currentQuestion + 1}"]`);
        if (currentQ) currentQ.classList.remove('active');
        
        // Move to next question or show results
        currentQuestion++;
        
        if (currentQuestion < quizQuestions.length) {
            // Show next question
            const nextQ = document.querySelector(`.quiz-question[data-question="${currentQuestion + 1}"]`);
            if (nextQ) nextQ.classList.add('active');
            
            // Enable/disable buttons as needed
            prevBtn.disabled = false;
            
            // If it's the last question, change next button text
            if (currentQuestion === quizQuestions.length - 1) {
                nextBtn.textContent = 'Ver Resultados';
            }
            
            // Check if an option is already selected for this question
            const selectedOption = nextQ ? nextQ.querySelector('.answer-option.selected') : null;
            nextBtn.disabled = !selectedOption;
        } else {
            // Show results
            const quizContent = document.getElementById('quiz-content');
            const quizResults = document.getElementById('quiz-results');
            if (quizContent) quizContent.style.display = 'none';
            if (quizResults) quizResults.style.display = 'block';
            generateResults();
        }
    });
    
    // Restart button
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            const quizResults = document.getElementById('quiz-results');
            const quizContent = document.getElementById('quiz-content');
            
            if (quizResults) quizResults.style.display = 'none';
            if (quizContent) quizContent.style.display = 'block';
            
            // Reset to first question
            document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
            const firstQ = document.querySelector('.quiz-question[data-question="1"]');
            if (firstQ) firstQ.classList.add('active');
            
            // Clear selections
            document.querySelectorAll('.answer-option').forEach(opt => opt.classList.remove('selected'));
            
            // Reset navigation
            currentQuestion = 0;
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            nextBtn.textContent = 'Siguiente';
        });
    }
}

function generateResults() {
    const resultsContainer = document.getElementById('results-detail');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = '';
    
    // Collect selected answers with scores
    const categoryScores = {};
    
    document.querySelectorAll('.quiz-question').forEach((question, index) => {
        const selected = question.querySelector('.answer-option.selected');
        if (selected && quizQuestions[index]) {
            const category = quizQuestions[index].category;
            const score = parseInt(selected.dataset.score) || 1;
            
            if (!categoryScores[category]) {
                categoryScores[category] = { total: 0, count: 0 };
            }
            categoryScores[category].total += score;
            categoryScores[category].count += 1;
        }
    });
    
    // Calculate average scores for each category
    const areas = Object.keys(categoryScores).map(category => ({
        name: category,
        score: Math.round((categoryScores[category].total / categoryScores[category].count) * 25) // Convert to percentage
    }));
    
    // Sort areas by score (lowest first)
    areas.sort((a, b) => a.score - b.score);
    
    // Generate recommendations
    const recommendations = document.createElement('div');
    
    if (areas.length > 0) {
        const areasToImproveTitle = document.createElement('h3');
        areasToImproveTitle.textContent = 'Áreas de Oportunidad';
        areasToImproveTitle.style.color = 'var(--primary-color)';
        recommendations.appendChild(areasToImproveTitle);
        
        const improveList = document.createElement('ul');
        areas.slice(0, 3).forEach(area => {
            const item = document.createElement('li');
            item.textContent = `${area.name}: ${area.score}% de efectividad`;
            improveList.appendChild(item);
        });
        recommendations.appendChild(improveList);
        
        const topStrengthsTitle = document.createElement('h3');
        topStrengthsTitle.textContent = 'Fortalezas Principales';
        topStrengthsTitle.style.color = 'var(--primary-color)';
        topStrengthsTitle.style.marginTop = '2rem';
        recommendations.appendChild(topStrengthsTitle);
        
        const strengthsList = document.createElement('ul');
        areas.slice(-3).forEach(area => {
            const item = document.createElement('li');
            item.textContent = `${area.name}: ${area.score}% de efectividad`;
            strengthsList.appendChild(item);
        });
        recommendations.appendChild(strengthsList);
    }
    
    const recommendationText = document.createElement('p');
    recommendationText.textContent = 'Basado en su diagnóstico, recomendamos enfocar sus esfuerzos de mejora en las áreas mencionadas arriba. Para una evaluación más detallada y un plan de acción personalizado, contáctenos y agendaremos una sesión de consultoría.';
    recommendationText.style.marginTop = '2rem';
    recommendationText.style.fontStyle = 'italic';
    recommendations.appendChild(recommendationText);
    
    resultsContainer.appendChild(recommendations);
}

// Inicializar Chat
function initChat() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-message');
    const sendButton = document.getElementById('send-message');
    
    if (!chatMessages || !userInput || !sendButton) return;
    
    // Initialize chat handler if available
    let chatHandler = null;
    if (typeof ChatHandler !== 'undefined') {
        chatHandler = new ChatHandler();
    }
    
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${isUser ? 'user' : 'bot'}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    async function handleUserMessage() {
        const message = userInput.value.trim();
        if (message.length === 0) return;
        
        // Add user message
        addMessage(message, true);
        userInput.value = '';
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message message-bot typing';
        typingDiv.textContent = 'Escribiendo...';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        try {
            let botResponse;
            
            if (chatHandler) {
                // Use advanced chat handler with documents
                botResponse = await chatHandler.processUserQuery(message);
            } else {
                // Use simple keyword matching as fallback
                botResponse = getSimpleResponse(message);
            }
            
            // Remove typing indicator
            chatMessages.removeChild(typingDiv);
            
            // Add bot response
            addMessage(botResponse);
            
        } catch (error) {
            // Remove typing indicator
            if (chatMessages.contains(typingDiv)) {
                chatMessages.removeChild(typingDiv);
            }
            
            addMessage('Lo siento, hubo un error al procesar su consulta. Por favor, intente de nuevo.');
        }
    }
    
    function getSimpleResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('octágono') || lowerMessage.includes('octograma') || lowerMessage.includes('modelo')) {
            return "El Modelo del Octagrama es nuestra metodología propietaria que analiza ocho dimensiones clave de una organización: Estrategia, Estructura, Sistemas, Personal, Habilidades, Estilos, Valores y Objetivos. Estas dimensiones están interconectadas y cualquier cambio en una afecta a las demás.";
        }
        
        if (lowerMessage.includes('consultoría') || lowerMessage.includes('consultoria')) {
            return "Ofrecemos servicios de consultoría en transformación organizacional, mejora de procesos, gestión del cambio, desarrollo de liderazgo y estrategia corporativa. Cada proyecto se adapta a las necesidades específicas de nuestros clientes.";
        }
        
        if (lowerMessage.includes('contacto') || lowerMessage.includes('contratar') || lowerMessage.includes('precio') || lowerMessage.includes('costo')) {
            return "Puede contactarnos a través de nuestro correo electrónico contacto@sage-wise.com o llamando al +52 (55) 1234-5678. Estaremos encantados de agendar una reunión inicial sin compromiso para discutir sus necesidades.";
        }
        
        if (lowerMessage.includes('diagnóstico') || lowerMessage.includes('diagnostico') || lowerMessage.includes('evaluación')) {
            return "Nuestro diagnóstico organizacional utiliza el Modelo del Octagrama para evaluar su empresa en ocho áreas clave. El proceso incluye entrevistas, análisis de datos y la aplicación de nuestro cuestionario especializado. ¿Está interesado en iniciar un diagnóstico para su organización?";
        }
        
        if (lowerMessage.includes('caso') || lowerMessage.includes('ejemplo') || lowerMessage.includes('éxito') || lowerMessage.includes('exito')) {
            return "Tenemos múltiples casos de éxito en diferentes industrias. Por ejemplo, hemos ayudado a empresas tecnológicas a aumentar su productividad en un 35%, y a manufactureras a reducir costos en un 18%. ¿Le interesa conocer casos específicos de su sector?";
        }
        
        // Default response
        return "Gracias por su consulta. Puedo ayudarle con información sobre nuestro Modelo del Octagrama, servicios de consultoría, diagnósticos organizacionales y casos de éxito. ¿En qué aspecto específico le gustaría profundizar?";
    }
    
    sendButton.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
}