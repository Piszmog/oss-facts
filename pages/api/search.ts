import type {NextApiRequest, NextApiResponse} from 'next'
import {search} from "../../lib/http";
import {Repository} from "../../lib/models";

/**
 * Search repositories.
 * @param req The request.
 * @param res The response.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse<Repository[]>) => {
    if (req.method === 'POST') {
        let results = await search(req.body.query);
        res.status(200).json(results);
    } else {
        res.status(405);
    }
};

export default handler;
