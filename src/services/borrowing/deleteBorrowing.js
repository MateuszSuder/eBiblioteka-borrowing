import genericErrorResponse from "../../utils/genericErrorResponse.js";
import BorrowingSchema from "../../schemas/BorrowingSchema.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        const response = await BorrowingSchema.findOneAndUpdate({
            userId,
            bookId,
            status: { $ne: "RETURNED" }
        })

        if(!response) {
            return genericErrorResponse(res, "Wypożyczenie nie znalezione", 404)
        }

        return res.status(200).send(null);
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}