const backendUrl = 'http://www.austinbarton.dev'; // Replace with your Render backend URL

document.getElementById('resolveBtn').addEventListener('click', async () => {
  const shortUrl = document.getElementById('shortUrl').value.trim();
  const resultContainer = document.getElementById('result-container');
  const resolvedUrlElement = document.getElementById('resolvedUrl');
  const copyButton = document.getElementById('copyBtn');

  // Clear previous results and hide the result container
  resolvedUrlElement.textContent = '';
  resolvedUrlElement.classList.add('hidden');
  copyButton.classList.add('hidden');
  resultContainer.classList.add('hidden');

  if (!shortUrl) {
    alert('Please enter a TikTok short URL.');
    return;
  }

  try {
    // Use the deployed backend URL
    const response = await fetch(`${backendUrl}/resolve?url=${encodeURIComponent(shortUrl)}`);
    const data = await response.json();

    if (data.resolvedUrl) {
      // Update the resolved URL element
      resolvedUrlElement.textContent = data.resolvedUrl;
      resolvedUrlElement.href = data.resolvedUrl; // Make it clickable
      resolvedUrlElement.classList.remove('hidden');

      // Show the copy button and the result container
      copyButton.classList.remove('hidden');
      resultContainer.classList.remove('hidden');
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const resolvedUrlElement = document.getElementById('resolvedUrl');
  const urlToCopy = resolvedUrlElement.textContent;

  if (urlToCopy) {
    navigator.clipboard.writeText(urlToCopy).then(() => {
      alert('URL copied to clipboard!');
    }).catch((error) => {
      alert('Failed to copy URL: ' + error.message);
    });
  }
});
