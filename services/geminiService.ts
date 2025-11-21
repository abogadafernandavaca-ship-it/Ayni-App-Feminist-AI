import { GoogleGenAI, Type } from "@google/genai";

// Inicialización segura del cliente
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Modelo para tareas de texto generales (rápido y eficiente)
const MODEL_FLASH = 'gemini-2.5-flash';

/**
 * Analiza un testimonio narrativo (texto o transcripción de voz) para estructurarlo,
 * detectar nivel de riesgo y categoría.
 */
export const analyzeReport = async (narrative: string) => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: narrative,
      config: {
        systemInstruction: `Actúa como una IA experta en análisis de violencia de género bajo el protocolo de protección de datos.
        Tu objetivo es extraer datos estructurados de un relato informal.
        Clasifica el riesgo basándote en indicadores de peligro inminente.
        Devuelve JSON puro.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: {
              type: Type.STRING,
              enum: ['Física', 'Psicológica', 'Patrimonial', 'Sexual', 'Digital'],
              description: "El tipo principal de violencia detectado"
            },
            riskLevel: {
              type: Type.STRING,
              enum: ['Bajo', 'Medio', 'Alto', 'Crítico'],
              description: "Nivel de riesgo inferido"
            },
            summary: {
              type: Type.STRING,
              description: "Resumen de 1 frase anonimizado"
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Palabras clave detectadas (ej: 'armas', 'niños', 'amenaza')"
            }
          },
          required: ["category", "riskLevel", "summary", "tags"]
        }
      }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error analyzing report:", error);
    // Fallback en caso de error
    return {
      category: 'Psicológica',
      riskLevel: 'Medio',
      summary: 'Error en análisis automático. Revisión manual requerida.',
      tags: ['revisión_manual']
    };
  }
};

/**
 * Tutor Legal Simplificado (Módulo "Habla y Aprende")
 */
export const getLegalAdvice = async (query: string, history: {role: string, text: string}[]) => {
  try {
    const chat = ai.chats.create({
      model: MODEL_FLASH,
      config: {
        systemInstruction: `Eres "Ayni", una asistente legal empática y feminista para mujeres en Ecuador.
        Tu misión es explicar derechos y leyes de forma EXTREMADAMENTE sencilla (Alfabetización Legal Crítica).
        Evita tecnicismos legales. Usa metáforas simples.
        Prioriza la seguridad de la usuaria. Si detectas peligro, urge llamar al 911 o ir a la Fiscalía.
        Tus respuestas deben ser cortas (máximo 3 párrafos).
        `,
      },
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: query });
    return result.text;
  } catch (error) {
    console.error("Error getting legal advice:", error);
    return "Lo siento, tengo problemas de conexión. Por favor llama al 1800-DELITO si es una emergencia.";
  }
};

/**
 * Generador de Insights para el Dashboard IGI
 */
export const generateIGIInsights = async (dataContext: string) => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: `Analiza estos datos del Índice de Gobernanza Inclusiva (IGI) de Ecuador: ${dataContext}.
      Genera 3 "puntos de dolor" críticos donde el presupuesto no se refleja en la seguridad.
      Usa un tono de auditoría cívica severa pero constructiva.`,
      config: {
        maxOutputTokens: 250,
      }
    });
    return response.text;
  } catch (error) {
    return "No se pudieron generar insights en este momento.";
  }
};
