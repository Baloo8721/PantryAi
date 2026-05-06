// Vercel API: AI Fridge Analysis
// Proxy requests to OpenRouter for vision analysis

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageData, apiKey } = req.body;
  
  if (!imageData || !apiKey) {
    return res.status(400).json({ error: 'Missing imageData or apiKey' });
  }
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://pantry-ai.vercel.app',
        'X-Title': 'PantryAi'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku:free',
        messages: [{
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Look at this photo of a fridge/pantry and list all the food items you can identify. Return ONLY a JSON array of item names like ["tomatoes", "chicken", "cheese"]. Do not include any other text. Be specific and list each item found.'
            },
            {
              type: 'image_url',
              image_url: { url: imageData }
            }
          ]
        }]
      })
    });
    
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '[]';
    
    return res.status(200).json({ result: content });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}