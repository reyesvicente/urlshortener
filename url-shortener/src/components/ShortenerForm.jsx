import { useState } from 'react';
import axios from 'axios';

const ShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const shortenUrl = async () => {
    if (!originalUrl) {
      alert('Please enter a URL.');  // You can use a more user-friendly UI for validation
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://urlshortener.vicentereyes.org/shorten/', {
        original_url: originalUrl,
      });
      setShortUrl(`https://urlshortener.vicentereyes.org/${response.data.short_url}`);
    } catch (error) {
      console.error('Error shortening URL:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">URL Shortener</h1>
        <input
          className="w-full border p-2 mb-4"
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL to shorten"
        />
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={shortenUrl}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Shorten URL'}
        </button>
        {shortUrl && (
          <div className="mt-4">
            <p className="font-semibold">Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortenerForm;
