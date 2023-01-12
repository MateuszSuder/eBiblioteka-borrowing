import mongoose from "mongoose";

const BorrowingSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    renewalRequest: {
        type: Boolean,
        required: false,
        default: false
    },
    renewedBefore: {
        type: Boolean,
        required: false,
        default: false
    },
    debt: {
        type: Number,
        required: false,
        default: 0,
        min: 0
    },
    status: {
        type: String,
        enum: ["BORROWED", "OVERDUE", "RETURNED"],
        default: "BORROWED"
    }
})

export default mongoose.model("Borrowing", BorrowingSchema);