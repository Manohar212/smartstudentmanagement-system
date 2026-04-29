import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Lazy factory — creates a fresh model instance each call so that
 * process.env.GEMINI_API_KEY is read AFTER dotenv.config() has run,
 * not at ES module import time (which would still be undefined).
 */
function createModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    throw new Error('GEMINI_API_KEY is not configured in .env');
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
}

/**
 * Send a prompt to Gemini 1.5 Flash and return the text response.
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function generateResponse(prompt) {
  const model = createModel();
  const result = await model.generateContent(prompt);
  return result.response.text();
}
