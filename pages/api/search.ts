// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {search} from "../../lib/http";
import {Repository} from "../../lib/models";

const handler = async (req: NextApiRequest, res: NextApiResponse<Repository[]>) => {
    if (req.method === 'POST') {
        console.log(req.body.query);
        let results = await search(req.body.query);
        res.status(200).json(results);
    } else {
        res.status(405);
    }
}

export default handler;
