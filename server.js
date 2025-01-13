import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/resolve', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) {
      const resolvedUrl = response.url.split('?')[0]; // Remove query parameters
      res.json({ resolvedUrl });
    } else {
      res.status(400).json({ error: 'Failed to resolve URL' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
