import { post_request_with_cookie } from '../../../client.js'
import { NextApiResponse, NextApiRequest } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { cookie } = await post_request_with_cookie(req.url, null, req.headers.cookie);

        res.setHeader('Set-Cookie', cookie[0]);
        return res.status(200).send({ 'state': 'unsigned' });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: 'Server error!' });

    }
}




