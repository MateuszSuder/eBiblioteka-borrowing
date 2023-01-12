import genericErrorResponse from "../../utils/genericErrorResponse.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";
import BorrowingSchema from "../../schemas/BorrowingSchema.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        // Search for borrowing with given userId, bookId, renewalRequested === true
        const { _id, expiryDate } = await BorrowingSchema.findOne({
            userId,
            bookId,
            renewalRequest: true,
            status: { $ne: "RETURNED" }
        })

        if(_id) {
            return genericErrorResponse(res, "Wypożyczenie nie znalezione", 404)
        }

        const date = new Date(expiryDate);
        date.setDate(date.getDate() + 7 * 2);

        // Change renewalRequested to false and extend expiryDate by 14 days
        await BorrowingSchema.findOneAndUpdate(
            {
                _id
            },
            {
                renewalRequest: false,
                renewedBefore: true,
                expiryDate: date
            })

        return res.status(200).send(null);
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}