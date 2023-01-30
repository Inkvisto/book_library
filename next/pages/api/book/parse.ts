import { post_request_with_cookie } from '../../../client.js'
import { NextApiResponse, NextApiRequest } from 'next'
import { Readable } from 'stream';

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const buf = await buffer(req);


    const parsedBook = await post_request_with_cookie(req.url, buf, req.headers.cookie, { 'Content-Type': 'application/epub+zip' });

    return res.status(200).json(parsedBook.body);

  } catch (e) {


    console.error(e);
    res.status(500).json({ data: null, error: "Internal Server Error" });


  }
}

export const config = {
  api: {
    bodyParser: false
  },
}