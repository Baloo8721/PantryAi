// Netlify Function: AI Fridge Analysis
// Proxy requests to OpenRouter to handle larger images

exports.handler = async (event, context) => {
  const { imageData, apiKey } = JSON.parse(event.body || '{}');
  
  if (!imageData || !apiKey) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing imageData or apiKey' }) };
  }
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'https://pantryai.netlify.app',
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
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ result: content })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};