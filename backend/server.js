import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = "You are the Architect AI for Md Usman, a B.Tech AI student. Be professional and keep answers under 3 lines.";

app.post("/chat", async (req, res) => {
  try {
    const ollamaRes = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        model: "phi:latest", // Integrating your Phi SLM model here
        prompt: `${SYSTEM_PROMPT}\nUser: ${req.body.message}\nAssistant:`, 
        stream: false 
      }),
    });

    const data = await ollamaRes.json();
    res.json({ reply: data.response.trim() });
  } catch (err) {
    console.error(err);
    res.json({ reply: "AI is currently offline. Ensure Ollama is running with the Phi model." });
  }
});

app.listen(5001, () => console.log("✅ AI Backend running on http://localhost:5001"));