// pages/api/shortlinks.ts
import { PrismaClient } from '../../../node_modules/.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { headers } from 'next/headers';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const accessToken = await req.headers?.authorization;
  if (accessToken != process.env.ACCESS_TOKEN) {
    res.status(401).json({ message: 'Unauthorized' });
    console.log(accessToken);
    return;
  }
  if (req.method === 'POST') {
    let { shortlink, redirectUrl } = req.body;
    if (shortlink === undefined) {
      shortlink = Math.random().toString(36).substring(2, 8);
    }
    const prisma = new PrismaClient();
    try {
      const result = await prisma.link.create({
        data: {
          short: shortlink,
          url: redirectUrl,
        },
      });
      return result;
    } catch (error) {
      res.status(500).json({ message: 'Failed to create short link' });
      return;
    } finally {
      await prisma.$disconnect();
      res.status(200).json({ message: 'Short link created successfully!' });
    }
  }
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};