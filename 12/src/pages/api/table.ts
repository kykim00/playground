import axios from 'axios';
import { Agent } from 'https';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface CustomError {
  message: string;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Products | CustomError>) {
  try {
    const response = await axios.get('https://dummyjson.com/products', {
      httpsAgent: new Agent({
        rejectUnauthorized: false,
      }),
    });
    res.status(200).json(response.data);
  } catch (e) {
    res.status(500).json({ message: 'Server Error' });
  }
}
