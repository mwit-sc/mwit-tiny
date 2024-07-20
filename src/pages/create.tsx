// components/ShortLinkForm.tsx
import { useState } from 'react';

const ShortLinkForm = () => {
  const [password, setPassword] = useState('');
  const [shortlink, setShortlink] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== 'OPH') {
      alert('Incorrect password');
      return;
    }

    const newLink = {
      shortlink,
      redirectUrl
    };

    const response = await fetch('/api/shortlinks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newLink)
    });

    if (response.ok) {
      alert('Short link created successfully!');
    } else {
      alert('Failed to create short link');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Short Link:
          <input
            type="text"
            value={shortlink}
            onChange={(e) => setShortlink(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Redirect URL:
          <input
            type="url"
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Create Short Link</button>
    </form>
  );
};

export default ShortLinkForm;
