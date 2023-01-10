import genericErrorResponse from "../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { userId, bookId } = req.params;

    // Search for borrowing with given userId, bookId, status !== returned
    if(false) {
        return genericErrorResponse(res, "Wypożyczenie nie znalezione", 404)
    }

    // If renewedBefore === false extend expiryDate by 14 days and change renewedBefore to true
    // Else change renewal request to true (if it's not already changed)

    res.status(501).send(`Ask borrowing ${userId} ${bookId}`);
}