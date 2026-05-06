// Netlify Function: Kroger Product Search
// Proxy requests to Kroger API to hide client ID/secret

exports.handler = async (event, context) => {
  const { searchTerm, locationId } = JSON.parse(event.body || '{}');
  
  if (!searchTerm) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing searchTerm' }) };
  }
  
  // Get credentials from environment
  const clientId = process.env.KROGER_CLIENT_ID;
  const clientSecret = process.env.KROGER_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Kroger credentials not configured' }) };
  }
  
  try {
    // Get access token
    const tokenResponse = await fetch('https://api.kroger.com/v1/connect/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
      },
      body: 'grant_type=client_credentials&scope=product.compact'
    });
    
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    
    // Search products
    const productsResponse = await fetch(
      `https://api.kroger.com/v1/products?filter.term=${encodeURIComponent(searchTerm)}&filter.locationId=${locationId || '01400963'}&filter.limit=10`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      }
    );
    
    const productsData = await productsResponse.json();
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productsData)
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};