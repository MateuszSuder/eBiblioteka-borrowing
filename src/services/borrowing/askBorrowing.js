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
        // Search for borrowing with given userId, bookId, status !== returned

        console.log(1);

        const { _id, renewedBefore, expiryDate } = await BorrowingSchema.findOne({
            userId,
            bookId,
            status: { $ne: "RETURNED" }
        })

        console.log(_id, renewedBefore, expiryDate);

        if(!_id) {
            return genericErrorResponse(res, "Wypożyczenie nie znalezione", 404)
        }

        if(!renewedBefore) {
            const date = new Date(expiryDate);
            date.setDate(date.getDate() + 7 * 2);

            // If renewedBefore === false extend expiryDate by 14 days and change renewedBefore to true
            await BorrowingSchema.findOneAndUpdate(
                {
                    _id
                },
                {
                    renewedBefore: true,
                    expiryDate: date
                })

            return res.status(200).send({extended: true});
        } else {
            // Else change renewal request to true (if it's not already changed)
            await BorrowingSchema.findOneAndUpdate(
                {
                    _id
                },
                {
                    renewalRequest: true
                })

            return res.status(200).send({extended: false});
        }
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}