import type {NextApiRequest, NextApiResponse} from 'next'
import {getAdvisoryAlerts} from "../../../../lib/http";

/**
 * The advisories of a repository.
 */
type Advisories = {
    published: number
}

/**
 * Retrieves the advisories of a repository.
 * @param req The request.
 * @param res The response.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse<Advisories>) => {
    const {owner, repo} = req.query;
    const number = await getAdvisoryAlerts(<string>owner, <string>repo);
    res.status(200).json({published: number})
};

export default handler;
