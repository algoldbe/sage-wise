// quiz-questions.js - Preguntas del diagnóstico organizacional

const quizQuestions = [
    {
        category: "Estrategia",
        text: "¿Su empresa tiene una estrategia claramente definida y comunicada a todos los niveles?",
        options: [
            { value: "a", text: "Sí, totalmente definida y comunicada efectivamente", score: 4 },
            { value: "b", text: "Parcialmente definida pero no comunicada efectivamente", score: 3 },
            { value: "c", text: "Definida pero no alineada con las operaciones diarias", score: 2 },
            { value: "d", text: "No tenemos una estrategia claramente definida", score: 1 }
        ]
    },
    {
        category: "Estructura",
        text: "¿Cómo calificaría la estructura organizacional de su empresa?",
        options: [
            { value: "a", text: "Claramente definida y efectiva para nuestros objetivos", score: 4 },
            { value: "b", text: "Definida pero con algunas ineficiencias", score: 3 },
            { value: "c", text: "Demasiado rígida y limita la innovación", score: 2 },
            { value: "d", text: "Confusa o inexistente en algunos departamentos", score: 1 }
        ]
    },
    {
        category: "Sistemas",
        text: "¿Sus procesos y sistemas están documentados y optimizados?",
        options: [
            { value: "a", text: "Completamente documentados y optimizados", score: 4 },
            { value: "b", text: "Documentados pero no optimizados", score: 3 },
            { value: "c", text: "Parcialmente documentados", score: 2 },
            { value: "d", text: "Apenas documentados o inexistentes", score: 1 }
        ]
    },
    {
        category: "Personal",
        text: "¿Cómo evaluaría la calidad y compromiso de su equipo de trabajo?",
        options: [
            { value: "a", text: "Excelente calidad técnica y alto compromiso", score: 4 },
            { value: "b", text: "Buena calidad técnica pero compromiso variable", score: 3 },
            { value: "c", text: "Calidad técnica adecuada pero bajo compromiso", score: 2 },
            { value: "d", text: "Deficiencias significativas en calidad y compromiso", score: 1 }
        ]
    },
    {
        category: "Habilidades",
        text: "¿Las habilidades de su equipo están alineadas con las necesidades actuales del negocio?",
        options: [
            { value: "a", text: "Completamente alineadas y actualizadas", score: 4 },
            { value: "b", text: "Mayormente alineadas con algunas brechas menores", score: 3 },
            { value: "c", text: "Parcialmente alineadas, requieren capacitación", score: 2 },
            { value: "d", text: "Significativamente desalineadas", score: 1 }
        ]
    },
    {
        category: "Estilos",
        text: "¿El estilo de liderazgo en su organización promueve la productividad y innovación?",
        options: [
            { value: "a", text: "Definitivamente, es inspirador y efectivo", score: 4 },
            { value: "b", text: "Generalmente sí, con algunas áreas de mejora", score: 3 },
            { value: "c", text: "Ocasionalmente, es inconsistente", score: 2 },
            { value: "d", text: "Raramente, tiende a ser contraproducente", score: 1 }
        ]
    },
    {
        category: "Valores",
        text: "¿Los valores corporativos se reflejan consistentemente en las decisiones y comportamientos diarios?",
        options: [
            { value: "a", text: "Siempre, son parte integral de nuestra cultura", score: 4 },
            { value: "b", text: "Frecuentemente, con algunas excepciones", score: 3 },
            { value: "c", text: "Ocasionalmente, no están bien integrados", score: 2 },
            { value: "d", text: "Raramente, son más aspiracionales que reales", score: 1 }
        ]
    },
    {
        category: "Objetivos",
        text: "¿Los objetivos organizacionales son claros, medibles y conocidos por todos?",
        options: [
            { value: "a", text: "Completamente claros, medibles y bien comunicados", score: 4 },
            { value: "b", text: "Claros pero no siempre medibles", score: 3 },
            { value: "c", text: "Definidos pero mal comunicados", score: 2 },
            { value: "d", text: "Poco claros o inexistentes", score: 1 }
        ]
    },
    {
        category: "Comunicación",
        text: "¿La comunicación interna en su organización es efectiva y oportuna?",
        options: [
            { value: "a", text: "Excelente, fluida en todos los niveles", score: 4 },
            { value: "b", text: "Buena, con algunas mejoras necesarias", score: 3 },
            { value: "c", text: "Adecuada pero con problemas frecuentes", score: 2 },
            { value: "d", text: "Deficiente, genera malentendidos", score: 1 }
        ]
    },
    {
        category: "Innovación",
        text: "¿Su organización fomenta y facilita la innovación y el cambio?",
        options: [
            { value: "a", text: "Completamente, tenemos cultura de innovación", score: 4 },
            { value: "b", text: "Generalmente sí, con apoyo de la dirección", score: 3 },
            { value: "c", text: "Ocasionalmente, dependiendo del proyecto", score: 2 },
            { value: "d", text: "Raramente, preferimos mantener el status quo", score: 1 }
        ]
    }
];

// Configuración de evaluación
const evaluationConfig = {
    categories: {
        "Estrategia": { weight: 1.2, description: "Claridad y comunicación de la estrategia organizacional" },
        "Estructura": { weight: 1.1, description: "Organización y jerarquías funcionales" },
        "Sistemas": { weight: 1.0, description: "Procesos y tecnologías operativas" },
        "Personal": { weight: 1.1, description: "Calidad y compromiso del equipo humano" },
        "Habilidades": { weight: 1.0, description: "Competencias y capacidades del equipo" },
        "Estilos": { weight: 1.1, description: "Estilos de liderazgo y gestión" },
        "Valores": { weight: 1.2, description: "Cultura y valores organizacionales" },
        "Objetivos": { weight: 1.2, description: "Claridad y comunicación de objetivos" },