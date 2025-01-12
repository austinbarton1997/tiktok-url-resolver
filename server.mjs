import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public')); // Serve static files from the "public" folder

// Endpoint to resolve TikTok short URL
app.get('/resolve', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) {
      let resolvedUrl = response.url;

      // Remove query parameters if present
      resolvedUrl = resolvedUrl.split('?')[0];

      res.json({ resolvedUrl });
    } else {
      res.status(400).json({ error: 'Failed to resolve URL' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
