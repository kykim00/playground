import { fetchData } from '@/utils/fetchData';
import axios from 'axios';
import { Agent } from 'https';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetchData(req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: 'Server Error' });
  }
}
