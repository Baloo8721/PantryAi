// Vercel API: Kroger Product Search
// Proxy requests to Kroger API to hide client ID/secret

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { searchTerm, locationId } = req.body;
  
  if (!searchTerm) {
    return res.status(400).json({ error: 'Missing searchTerm' });
  }
  
  // Get credentials from environment
  const clientId = process.env.KROGER_CLIENT_ID;
  const clientSecret = process.env.KROGER_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Kroger credentials not configured' });
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
    
    return res.status(200).json(productsData);
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}