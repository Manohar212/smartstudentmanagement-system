import { generateResponse } from '../utils/ai.js';

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'AI service is not configured. Please set GEMINI_API_KEY.' });
    }

    const reply = await generateResponse(message.trim());
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Gemini AI error:', error?.message || error);
    res.status(500).json({ error: 'AI service unavailable. Please try again later.' });
  }
};
