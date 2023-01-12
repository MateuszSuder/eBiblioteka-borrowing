import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";
import BorrowingSchema from "../../schemas/BorrowingSchema.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    // Return all borrowings

    try {
        const borrowings = await BorrowingSchema.find();

        res.status(200).json({borrowings})
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }

    res.status(501).send(`Get all borrowings`);
}