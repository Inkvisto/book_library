import { post_request } from '../../../client.js'
import { NextApiResponse, NextApiRequest } from 'next'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

        const { body }: any = await post_request(req.url, req.body);
    
        return res.status(200).send(body)

   
}

