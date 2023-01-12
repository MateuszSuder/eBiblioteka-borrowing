import genericErrorResponse from "../../utils/genericErrorResponse.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";
import BorrowingSchema from "../../schemas/BorrowingSchema.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { userId } = req.params;

    if(req.user && req.user._id !== userId) {
        return genericErrorResponse(res, "", 403);
    }

    try {
        const borrowings = await BorrowingSchema.find({
            userId
        })

        res.status(200).json({borrowings});
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}