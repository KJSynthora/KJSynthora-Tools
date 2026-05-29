export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { text, language, tone, rewriteMode } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const systemPrompt = `You are a grammar correction AI. The user sends a sentence. You MUST respond with ONLY a valid JSON object. No explanation, no markdown, no code fences. Just raw JSON.

Example output:
{"corrected":"I go to school by bike.","professional":"I commute to school by bicycle.","friendly":"I ride my bike to school!","formal":"I travel to school by bicycle.","errors":["Missing article","Wrong preposition"],"grammar_explanation":"Use 'by bike' not 'with bike' for transport.","seo_insight":"Clear and readable sentence.","grammar_score":72,"readability_score":85,"clarity":80,"fluency":78,"human_score":90,"accuracy":88}

Language: ${language || "English"}
Tone: ${tone || "Professional"}
Mode: ${rewriteMode || "Grammar Fix Only"}`;

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Correct this: ${text}` }
        ],
        temperature: 0.1,
        max_tokens: 800,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq error:", errText);
      return res.status(500).json({ error: "Groq API failed", detail: errText });
    }

    const groqData = await groqRes.json();
    console.log("Groq raw response:", JSON.stringify(groqData));

    const raw = groqData.choices?.[0]?.message?.content || "";
    console.log("Raw content:", raw);

    // Try to extract JSON from anywhere in the response
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log("Parsed OK:", parsed.corrected);
        return res.status(200).json(parsed);
      } catch (e) {
        console.error("JSON parse failed:", e.message);
      }
    }

    // Final fallback: return raw text as corrected
    console.log("Using fallback, raw:", raw);
    return res.status(200).json({
      corrected: raw || "Could not correct sentence",
      professional: raw,
      friendly: raw,
      formal: raw,
      errors: [],
      grammar_explanation: "Correction applied.",
      seo_insight: "Sentence processed.",
      grammar_score: 75,
      readability_score: 75,
      clarity: 75,
      fluency: 75,
      human_score: 75,
      accuracy: 75
    });

  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ error: error.message });
  }
}
