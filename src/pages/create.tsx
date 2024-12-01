// components/ShortLinkForm.tsx
import { useState, useEffect, Suspense } from 'react';
import useSWR from 'swr';
import { PrismaClient } from '@prisma/client';

interface Data {
  shortlink: string;
  redirectUrl: string;
  count: number;
}

async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest('SHA-256', data).then(async (buffer) => {
    const hashArray = Array.from(new Uint8Array(buffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  });
}


const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

const ShortLinkForm = () => {
  const [password, setPassword] = useState('');
  const [shortlink, setShortlink] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const { data: shortlinks, mutate } = useSWR<Data[]>('/api/getshortlink', fetcher);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shortlinks) return;

    if (!password || !shortlink || !redirectUrl) {
      alert('Please fill in all fields');
      return;
    }

    const newLink = {
      shortlink,
      redirectUrl
    };

    const response = await fetch('/api/shortlinks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await sha256(password)
      },
      body: JSON.stringify(newLink)
    });

    if (response.ok) {
      alert('Short link created successfully!');
      const result: Data = await response.json();
      mutate([...shortlinks, result], false);
    } else {
      alert('Failed to create short link');
    }
  };

  return (
    <div className="card px-5 lg:px-20 pt-5 lg:pt-20">
      <form className="max-w-sm mx-auto bg-gray-800 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold text-gray-300 mb-5">
        Create Short Link
      </h2>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-bold text-gray-300">Password</label>
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="··········" required
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-bold text-gray-300">Short Link</label>
        <input
        type="text"
        value={shortlink}
        onChange={(e) => setShortlink(e.target.value)}
        className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="register"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-bold text-gray-300">Redirect Link</label>
        <input
        type="text"
        value={redirectUrl}
        onChange={(e) => setRedirectUrl(e.target.value)}
        className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="https://openhouse.mwit.ac.th/register" required
        />
      </div>
      
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Create Short Link</button>
      </form>

      <div className="mt-10 max-w-sm mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-300 mb-5">Existing Short Links</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <ul className="list-disc pl-5 max-w-md">
        {shortlinks?.map((link) => (
          <li key={link.shortlink} className="mb-2">
          <div className="flex items-center justify-between">
            <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(`https://tiny.mwit.link/${link.shortlink}`);
              const target = e.currentTarget;
              target.textContent = 'Shortlink copied';
              setTimeout(() => {
              target.textContent = 'https://tiny.mwit.link/' + link.shortlink;
              }, 2000);
            }}
            className="text-blue-400 hover:underline"
            >
            {'https://tiny.mwit.link/' + link.shortlink}
            </a>
            <div>
            <span className="text-gray-400">({link.count} clicks)</span>
            {/* <button
              onClick={async () => {
              const response = await fetch(`/api/shortlinks/${link.shortlink}`, {
                method: 'DELETE',
                headers: {
                'Authorization': await sha256(password)
                }
              });
              if (response.ok) {
                alert('Short link deleted successfully!');
                mutate(shortlinks.filter((l) => l.shortlink !== link.shortlink), false);
              } else {
                alert('Failed to delete short link');
              }
              }}
              className="text-red-500 hover:underline ml-2"
            >
              DELETE
            </button> */}
            </div>
          </div>
          <div className="text-gray-300">
            {link.redirectUrl.length > 30 ? (
            <button
              onClick={(e) => {
              const target = e.currentTarget;
              target.textContent = link.redirectUrl;
              target.classList.remove('hover:underline');
              target.setAttribute('disabled', 'true');
              }}
              className="text-blue-700 hover:underline"
            >
              Click to expand
            </button>
            ) : (
            link.redirectUrl
            )}
          </div>
          </li>
        ))}
        </ul>
      </Suspense>
      </div>
    </div>
  );
};

export default ShortLinkForm;