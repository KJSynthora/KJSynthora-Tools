```javascript id="2d5jkz"
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

Authorization:
`Bearer ${process.env.GROQ_API_KEY}`
},

body: JSON.stringify({

model:
"llama-3.3-70b-versatile",

messages: [
{
role: "user",

content: `

Correct grammar professionally.

Sentence:
"${text}"

Return ONLY valid JSON.

{
"corrected":"",
"professional":"",
"friendly":"",
"formal":"",
"grammar_explanation":"",
"errors":[]
}

`
}
],

temperature: 0.2

})

}
);

const data =
await response.json();

res.status(200).json(data);

}
catch (error) {

console.log(error);

res.status(500).json({
error: "Server Error"
});

}

}
```
