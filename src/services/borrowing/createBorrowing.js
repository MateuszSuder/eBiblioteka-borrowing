import genericErrorResponse from "../../utils/genericErrorResponse.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";
import internalFetcher from "../../http/internalFetcher.js";
import BorrowingSchema from "../../schemas/BorrowingSchema.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { userId, bookId } = req.params;
    const { reservationId } = req.query;

    if(req.user && req.user._id !== userId && req.user.role === "USER") {
        return genericErrorResponse(res, "", 403);
    }

    // todo
    // Get number of borrowings of book with status BORROWED or OVERDUE
    // Get number of reservations of book with status RESERVED
    // Count number of borrowings + reservations
    // If book.amount === borrowings + reservations return error
    // If amount is ok create borrowing

    try {
        const book = await internalFetcher("book", "GET", `${bookId}`);
        const user = await internalFetcher("user", "GET", "", {
            query: {
                id: userId
            },
            key: true
        });

        try {
            if(!book._id) return genericErrorResponse(res, "Brak książki o podanym id", 404);
            if(!user._id) return genericErrorResponse(res, "Brak użytkownika o podanym id", 404);

            const date = new Date();
            date.setDate(date.getDate() + 7 * 2);

            const borrowing = new BorrowingSchema({
                userId,
                bookId,
                expiryDate: date
            })

            await borrowing.save();

            if(reservationId) {
                await internalFetcher("reservation", "PUT", `${reservationId}`, {
                    key: true,
                    body: {
                        status: "BORROWED"
                    }
                });
            }

            res.status(201).json(borrowing);
        } catch (e) {
            return mongooseErrorResponse(res, e);
        }
    } catch (e) {
        console.log(e);
        return genericErrorResponse(res, "Nie prawidłowe id", 404);
    }
}