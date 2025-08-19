import { GoogleGenAI } from '@google/genai';
const VITE_GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: VITE_GEMINI_API_KEY });

async function main(PROMPT) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: PROMPT,
        
    });
    console.log(response.candidates[0].content.parts[0].text)
    return response.candidates[0].content.parts[0].text;
}

export { main };