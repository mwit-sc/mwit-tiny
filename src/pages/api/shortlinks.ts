// pages/api/shortlinks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type ShortLink = {
  shortlink: string;
  redirectUrl: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { shortlink, redirectUrl } = req.body;

    const filePath = path.join(process.cwd(), 'short.json');
    let data: ShortLink[] = [];

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(fileContent);
    }

    data.push({ shortlink, redirectUrl });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

    res.status(200).json({ message: 'Short link created successfully!' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
