import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Allow requests from your frontend domain
app.use(cors());

// Serve static files
app.use(express.static('public'));

// Endpoint to resolve TikTok short URL
app.get('/resolve', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    console.log('Resolving TikTok URL:', url);
    const response = await fetch(url, { method: 'GET', redirect: 'follow' });

    // Log TikTok's response
    console.log('Response from TikTok:', response.status, response.url);
    if (response.ok) {
      const resolvedUrl = response.url.split('?')[0]; // Remove query parameters
      res.json({ resolvedUrl });
    } else {
      res.status(400).json({ error: 'Failed to resolve URL' });
    }
  } catch (error) {
    console.error('Error resolving URL:', error.message);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
});

app.get('/test-tiktok', async (req, res) => {
  try {
    const response = await fetch('https://www.tiktok.com/t/ZTYEXE1GA/', {
      method: 'HEAD',
    });
    res.json({ status: response.status, url: response.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
