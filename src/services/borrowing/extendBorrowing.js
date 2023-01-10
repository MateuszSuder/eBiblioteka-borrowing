import genericErrorResponse from "../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { userId, bookId } = req.params;

    // Search for borrowing with given userId, bookId, renewalRequested === true
    if(false) {
        return genericErrorResponse(res, "Wypożyczenie nie znalezione", 404)
    }

    // Change renewalRequested to false and extend expiryDate by 14 days

    res.status(501).send(`Extend borrowing ${userId} ${bookId}`);
}