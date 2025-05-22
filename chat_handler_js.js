// chat-handler.js - Manejo del chat con documentos

class ChatHandler {
    constructor() {
        this.documents = [];
        this.loadDocuments();
    }

    // Cargar documentos desde la carpeta
    async loadDocuments() {
        const documentFiles = [
            'conocimiento-base.txt',
            'metodologia-octograma.txt', 
            'casos-exito.txt',
            'preguntas-frecuentes.txt'
            // Añade más archivos según necesites
        ];

        for (const file of documentFiles) {
            try {
                const response = await fetch(`./documents/${file}`);
                if (response.ok) {
                    const content = await response.text();
                    this.documents.push({
                        filename: file,
                        content: content
                    });
                    console.log(`Documento cargado: ${file}`);
                }
            } catch (error) {
                console.log(`No se pudo cargar: ${file}`);
            }
        }
    }

    // Función para procesar la consulta del usuario
    async processUserQuery(userMessage) {
        // Buscar información relevante en los documentos
        const relevantContent = this.findRelevantContent(userMessage);
        
        // Aquí puedes integrar con OpenAI API
        // Por ahora, usamos respuestas basadas en los documentos
        return this.generateResponse(userMessage, relevantContent);
    }

    // Buscar contenido relevante en los documentos
    findRelevantContent(query) {
        const keywords = query.toLowerCase().split(' ');
        let relevantContent = [];

        this.documents.forEach(doc => {
            const content = doc.content.toLowerCase();
            let relevanceScore = 0;

            keywords.forEach(keyword => {
                if (content.includes(keyword)) {
                    relevanceScore++;
                }
            });

            if (relevanceScore > 0) {
                relevantContent.push({
                    filename: doc.filename,
                    content: doc.content,
                    relevance: relevanceScore
                });
            }
        });

        // Ordenar por relevancia
        return relevantContent.sort((a, b) => b.relevance - a.relevance);
    }

    // Generar respuesta basada en el contenido
    generateResponse(query, relevantContent) {
        if (relevantContent.length === 0) {
            return "Lo siento, no encontré información específica sobre su consulta en nuestra base de conocimientos. ¿Podría ser más específico o contactar directamente con nuestro equipo?";
        }

        // Respuestas específicas basadas en palabras clave
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('octágono') || lowerQuery.includes('octograma') || lowerQuery.includes('modelo')) {
            return this.getOctagonResponse(relevantContent);
        }

        if (lowerQuery.includes('diagnóstico') || lowerQuery.includes('evaluación')) {
            return this.getDiagnosticResponse(relevantContent);
        }

        if (lowerQuery.includes('precio') || lowerQuery.includes('costo') || lowerQuery.includes('tarifa')) {
            return this.getPricingResponse(relevantContent);
        }

        if (lowerQuery.includes('caso') || lowerQuery.includes('ejemplo') || lowerQuery.includes('éxito')) {
            return this.getCaseStudyResponse(relevantContent);
        }

        // Respuesta general basada en el contenido más relevante
        return this.getGeneralResponse(relevantContent[0]);
    }

    getOctagonResponse(content) {
        return "El Modelo del Octagrama es nuestra metodología propietaria que analiza ocho dimensiones clave de una organización. Cada dimensión está interconectada y permite un análisis integral del desempeño empresarial. ¿Le gustaría conocer más sobre alguna dimensión específica?";
    }

    getDiagnosticResponse(content) {
        return "Nuestro diagnóstico organizacional utiliza el Modelo del Octagrama para evaluar su empresa en ocho áreas clave. El proceso incluye entrevistas, análisis de datos y la aplicación de nuestro cuestionario especializado. ¿Está interesado en iniciar un diagnóstico para su organización?";
    }

    getPricingResponse(content) {
        return "Nuestros servicios se adaptan a las necesidades específicas de cada cliente. Para obtener una cotización personalizada, le recomiendo agendar una reunión inicial sin compromiso. Puede contactarnos al +52 (55) 1234-5678 o por email a contacto@sage-wise.com";
    }

    getCaseStudyResponse(content) {
        return "Tenemos múltiples casos de éxito en diferentes industrias. Por ejemplo, hemos ayudado a empresas tecnológicas a aumentar su productividad en un 35%, y a manufactureras a reducir costos en un 18%. ¿Le interesa conocer casos específicos de su sector?";
    }

    getGeneralResponse(content) {
        // Extraer los primeros 200 caracteres del documento más relevante
        const excerpt = content.content.substring(0, 200) + "...";
        return `Basado en nuestra documentación: ${excerpt} ¿Le gustaría profundizar en algún aspecto específico?`;
    }
}

// Integración con OpenAI API (opcional)
class OpenAIIntegration {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.openai.com/v1/chat/completions';
    }

    async queryOpenAI(userMessage, documents) {
        // Combinar el contenido de los documentos
        const contextContent = documents.map(doc => doc.content).join('\n\n');
        
        const systemPrompt = `Eres un asistente virtual para Sage-Wise, una consultora especializada en transformación empresarial. 
        Utiliza la siguiente información de la base de conocimientos para responder preguntas sobre nuestros servicios:
        
        ${contextContent}
        
        Responde de manera profesional, útil y concisa. Si no tienes información específica, sugiere contactar directamente con el equipo.`;

        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userMessage }
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error al consultar OpenAI:', error);
            return 'Lo siento, hubo un error al procesar su consulta. Por favor, intente de nuevo.';
        }
    }
}

// Exportar las clases para uso en el HTML
window.ChatHandler = ChatHandler;
window.OpenAIIntegration = OpenAIIntegration;