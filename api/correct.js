export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { text, language, tone, rewriteMode } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const systemPrompt = `You are an expert grammar correction AI. Correct the user's sentence and respond with ONLY a valid JSON object — no markdown, no code fences, no extra text before or after. Just raw JSON.

Required JSON format:
{
  "corrected": "the corrected sentence",
  "professional": "professional rewrite",
  "friendly": "friendly rewrite",
  "formal": "formal rewrite",
  "errors": ["error description 1", "error description 2"],
  "grammar_explanation": "brief explanation of corrections made",
  "seo_insight": "readability and clarity insight",
  "grammar_score": 85,
  "readability_score": 80,
  "clarity": 82,
  "fluency": 78,
  "human_score": 90,
  "accuracy": 88
}

Rules:
- Language: ${language || "English"}
- Tone: ${tone || "Professional"}
- Mode: ${rewriteMode || "Grammar Fix Only"}
- If sentence has no errors, return original as "corrected" with empty errors array []
- All score fields must be numbers between 0-100
- ONLY return the JSON object, nothing else`;

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text }
        ],
        temperature: 0.1,
        max_tokens: 800,
      }),
    });

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      console.error("Groq API error:", groqResponse.status, errText);
      return res.status(500).json({ error: "Groq API failed", detail: errText });
    }

    const groqData = await groqResponse.json();
    const rawContent = groqData.choices?.[0]?.message?.content || "";
    console.log("Groq raw content:", rawContent);

    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        return res.status(200).json(parsed);
      } catch (e) {
        console.error("JSON parse error:", e.message);
      }
    }

    // Fallback
    return res.status(200).json({
      corrected: rawContent || text,
      professional: rawContent || text,
      friendly: rawContent || text,
      formal: rawContent || text,
      errors: [],
      grammar_explanation: "Correction applied.",
      seo_insight: "Sentence processed successfully.",
      grammar_score: 75,
      readability_score: 75,
      clarity: 75,
      fluency: 75,
      human_score: 75,
      accuracy: 75
    });

  } catch (error) {
    console.error("Handler error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
