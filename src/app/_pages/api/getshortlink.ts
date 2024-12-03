// pages/api/shortlinks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { link, PrismaClient } from '@prisma/client';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const prisma = new PrismaClient()
    const links = await prisma.link.findMany()
    const data = [
      ...links.map((link: link) => ({
        shortlink: link.short,
        redirectUrl: link.url,
        count: link.count,
      })),
    ]
    res.status(200).json(data)
    return
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
