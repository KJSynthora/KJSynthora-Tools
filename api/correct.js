export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { text } = req.body;

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
            {
              role: "system",
              content:
                "You are an AI grammar corrector. Return corrected professional English only.",
            },
            {
              role: "user",
              content: text,
            },
          ],
          temperature: 0.3,
        }),
      }
    );

    const data = await response.json();

    const corrected =
      data.choices?.[0]?.message?.content ||
      "Correction failed";

    res.status(200).json({
      corrected,
    });
  } catch (error) {
    res.status(500).json({
      error: "AI correction failed",
      details: error.message,
    });
  }
}
