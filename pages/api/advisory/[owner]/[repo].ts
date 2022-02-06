import type {NextApiRequest, NextApiResponse} from 'next'
import {getAdvisoryAlerts} from "../../../../lib/http";

type Advisories = {
    published: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Advisories>) => {
    const {owner, repo} = req.query;
    const number = await getAdvisoryAlerts(<string>owner, <string>repo);
    res.status(200).json({published: number})
}

export default handler;
