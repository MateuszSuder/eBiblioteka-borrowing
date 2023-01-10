import genericErrorResponse from "../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { userId, bookId } = req.params;

    if(req.user && req.user._id !== userId) {
        return genericErrorResponse(res, "", 403);
    }

    // Get number of borrowings of book with status BORROWED or OVERDUE
    // Get number of reservations of book with status RESERVED
    // Count number of borrowings + reservations
    // Get requested book
    // If book.amount === borrowings + reservations return error
    if(false) {
        return genericErrorResponse(res, "Brak książek na stanie", 400);
    }

    // If amount is ok create borrowing

    res.status(501).send(`Create borrowing ${userId} ${bookId}`);
}