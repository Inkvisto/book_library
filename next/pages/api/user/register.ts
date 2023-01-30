import { NextApiResponse, NextApiRequest } from 'next'
import { post_request_with_cookie } from '../../../client';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { body, cookie }: any = await post_request_with_cookie(req.url, req.body);
        res.setHeader('Set-Cookie', cookie[0])
        return res.status(200).send(body)
    } catch (error) {

        console.error(error);
        res.status(500).send({ message: 'Server error!' });
    }
}

