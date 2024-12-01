// components/ShortLinkForm.tsx
import { useState, useEffect } from 'react';
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

  if (!shortlinks) {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">PWD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="··········" required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Short Link</label>
          <input
            type="text"
            value={shortlink}
            onChange={(e) => setShortlink(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="register"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Redirect Link</label>
          <input
            type="text"
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://openhouse.mwit.ac.th/register" required
          />
        </div>
        
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Short Link</button>
      </form>

      <div className="mt-10">
        <h2 className="text-lg font-bold">Existing Short Links</h2>
        {
          shortlinks.map((link) => (
            <div key={link.shortlink} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 py-2.5">
              <div>
                <p className="text-blue-700 dark:text-blue-500 font-bold">
                  Link: https://tiny.mwit.link/{link.shortlink} 
                  <button
                    onClick={(e) => {
                      navigator.clipboard.writeText(`https://tiny.mwit.link/${link.shortlink}`);
                      if (e.currentTarget) {
                        e.currentTarget.textContent = 'Copied';
                        setTimeout(() => {
                          if (e.currentTarget) {
                            e.currentTarget.textContent = 'Copy';
                          }
                        }, 2000);
                      }
                    }}
                    className="text-xs ml-2 text-blue-700 dark:text-blue-500 hover:underline"
                  >
                    {/* <small>Copy</small> */}
                    Copy
                  </button>
                </p>
                
                <p className="text-gray-500 dark:text-gray-400">Redirect to: {link.redirectUrl}</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400">Usage: {link.count} clicks</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ShortLinkForm;