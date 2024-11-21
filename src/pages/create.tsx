// components/ShortLinkForm.tsx
import { useState, useEffect } from 'react';

interface Data {
  shortlink: string;
  redirectUrl: string;
  count: number;
}

const ShortLinkForm = () => {
  const [password, setPassword] = useState('');
  const [shortlink, setShortlink] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/getshortlink');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== '24OPH') {
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
      const result = await response.json();
      setData((prevData) => [...prevData, result]);
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
        {/* <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre> */}
        {data.map((json) => (
        <div key={json.shortlink}>
          <p>shortlink: {json.shortlink}</p>
          <p>redirectUrl: {json.redirectUrl}</p>
          <p>count: {json.count}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ShortLinkForm;
