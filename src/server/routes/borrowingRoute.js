import express from "express";
import withAuth from "../../framework/middlewares/withAuth.js";
import getAllBorrowings from "../../services/borrowing/getAllBorrowings.js";

const router = express.Router();

router.get("/", withAuth({ role: "LIBRARIAN" }), getAllBorrowings);

export default router;