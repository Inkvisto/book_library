import { get_request } from '../../../client.js'
import { NextApiResponse, NextApiRequest } from 'next'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {

        const username = await get_request(req.url, req.headers.cookie);
       
        return res.status(200).send(username);

    } catch (error) {

        res.status(500).send({ message: 'Server error!' });
        
    }

}

