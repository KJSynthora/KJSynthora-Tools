export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text, language, tone, rewriteMode } = req.body;

    if (!text) return res.status(400).json({ error: "No text provided" });

    const systemPrompt = `You are an expert grammar correction and rewriting AI.
The user will send a sentence. You must:
1. Correct all grammar, spelling, and punctuation errors
2. Provide 3 rewrites: Professional, Friendly, Formal
3. List all errors found
4. Give a brief grammar explanation
5. Give readability/SEO insight

Language: ${language || "English"}
Tone: ${tone || "Professional"}
Mode: ${rewriteMode || "Grammar Fix Only"}

Respond ONLY in this exact JSON format (no markdown, no extra text):
{
  "corrected": "corrected sentence here",
  "professional": "professional rewrite here",
  "friendly": "friendly rewrite here",
  "formal": "formal rewrite here",
  "errors": ["error 1", "error 2"],
  "grammar_explanation": "explanation here",
  "seo_insight": "readability insight here",
  "grammar_score": 85,
  "readability_score": 78,
  "clarity": 80,
  "fluency": 82,
  "human_score": 90,
  "accuracy": 88
}`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: text }
          ],
          temperature: 0.3,
          max_tokens: 1000,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", errText);
      return res.status(500).json({ error: "Groq API failed", detail: errText });
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || "";

    // Strip markdown code fences if present
    const cleaned = raw.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      // If JSON parse fails, return raw as corrected
      return res.status(200).json({ corrected: cleaned || raw });
    }

    return res.status(200).json(parsed);

  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ error: error.message });
  }
}
