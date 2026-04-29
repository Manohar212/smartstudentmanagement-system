import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function callGemini(message, model) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }),
    }
  );
  const data = await response.json();
  return { response, data };
}

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No input provided" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Missing Gemini API Key" });
    }

    const models = [
      "gemini-2.5-flash",
      "gemini-flash-latest"
    ];

    let lastError = null;

    for (let i = 0; i < models.length; i++) {
      const model = models[i];
      console.log(`Using Gemini model: ${model} (v1beta)`);

      const { response, data } = await callGemini(message, model);

      if (response.ok) {
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";
        return res.json({ reply });
      }

      // If not ok, check the error type
      const errorMessage = data.error?.message || "";
      const isRetryable =
        response.status === 429 ||
        response.status === 503 ||
        errorMessage.toLowerCase().includes("high demand") ||
        errorMessage.toLowerCase().includes("not found");

      lastError = data;

      if (isRetryable && i < models.length - 1) {
        console.warn(`Model ${model} unavailable (status ${response.status}). Retrying in 1s with fallback...`);
        await delay(1000);
        continue;
      } else {
        // If it's not retryable or we are out of models, break and handle below
        break;
      }
    }

    console.error("All Gemini models failed. Last Error:", lastError);
    return res.json({ reply: "AI is currently busy. Please try again in a few seconds." });

  } catch (error) {
    console.error("Gemini Crash:", error);
    return res.json({ reply: "AI is currently busy. Please try again in a few seconds." });
  }
});

export default router;