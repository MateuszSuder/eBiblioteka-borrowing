import express from "express";
import withAuth from "../../../framework/middlewares/withAuth.js";
import getUserBorrowings from "../../../services/borrowing/getUserBorrowings.js";

const router = express.Router({ mergeParams: true });

router.get("/", withAuth({ role: "USER" }), getUserBorrowings);

export default router;