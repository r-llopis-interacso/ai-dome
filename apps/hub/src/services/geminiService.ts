/**
 * @file Servicio de Gemini AI
 * @description Centraliza toda la comunicación con la API de Google Generative AI.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// 1. Inicialización centralizada del cliente y el modelo
if (!process.env.GEMINI_API_KEY) {
  throw new Error('La variable de entorno GEMINI_API_KEY no está configurada.');
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Genera contenido como texto plano.
 * @param prompt El prompt para la IA.
 * @returns Una promesa que se resuelve con el texto generado.
 */
async function generateText(prompt: string): Promise<string> {
  try {
    console.log('Llamando a Gemini API para generar texto...');
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error en geminiService.generateText:', error);
    throw new Error('La generación de texto con IA falló.');
  }
}

/**
 * Genera contenido y lo parsea como un objeto JSON.
 * @param prompt El prompt para la IA, que debe solicitar una respuesta JSON.
 * @returns Una promesa que se resuelve con el objeto JSON parseado.
 */
async function generateJson<T>(prompt: string): Promise<T> {
  try {
    console.log('Llamando a Gemini API para generar JSON...');
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    // Limpiar el string de respuesta de los bloques de código markdown
    const text = response.text().replace(/```json|```/g, '').trim();
    
    return JSON.parse(text) as T;
  } catch (error) {
    console.error('Error en geminiService.generateJson:', error);
    throw new Error('La generación de JSON con IA o el parseo fallaron.');
  }
}

// 2. Exportar un objeto con los métodos del servicio
export const geminiService = {
  generateText,
  generateJson,
};
