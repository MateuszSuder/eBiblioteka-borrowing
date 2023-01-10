import genericErrorResponse from "../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { userId } = req.params;

    if(req.user && req.user._id !== userId) {
        return genericErrorResponse(res, "", 403);
    }

    // Find borrowings with given userId

    res.status(501).send(`Get user borrowings ${userId}`);
}