import React, { useState } from 'react';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [responseHeaders, setResponseHeaders] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://chimpu.xyz/api/post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phonenumber: phoneNumber })
      });

      if (response.ok) {
        const headers = response.headers;
        setResponseHeaders(headers);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {responseHeaders && (
        <div>
          <h2>Response Headers:</h2>
          <ul>
            {Array.from(responseHeaders.entries()).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
