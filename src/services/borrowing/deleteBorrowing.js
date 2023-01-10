import genericErrorResponse from "../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { userId, bookId } = req.params;

    // Change status to returned, if no borrowings affected return 404

    if(false) {
        return genericErrorResponse(res, "Wypożyczenie nie znalezione", 404)
    }

    res.status(501).send(`Delete borrowing ${userId} ${bookId}`);
}