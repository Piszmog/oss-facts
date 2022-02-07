import type {NextApiRequest, NextApiResponse} from 'next'
import {getRepos} from "../../lib/http";
import {Repository} from "../../lib/models";

/**
 * Retrieves repositories from GitHub API.
 * @param req Request object.
 * @param res Response object.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse<Repository[]>) => {
    if (req.method === 'POST') {
        const repositories = await getRepos(req.body.names);
        res.status(200).json(repositories);
    } else {
        res.status(405);
    }
};

export default handler;
