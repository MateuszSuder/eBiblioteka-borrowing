import express from "express";
import withAuth from "../../../../../framework/middlewares/withAuth.js";
import askBorrowing from "../../../../../services/borrowing/askBorrowing.js";

const router = express.Router({ mergeParams: true });

router.post("/", withAuth({ role: "USER" }), askBorrowing);

export default router;