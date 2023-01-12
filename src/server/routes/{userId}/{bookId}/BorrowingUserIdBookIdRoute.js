import express from "express";
import withAuth from "../../../../framework/middlewares/withAuth.js";
import createBorrowing from "../../../../services/borrowing/createBorrowing.js";
import deleteBorrowing from "../../../../services/borrowing/deleteBorrowing.js";

const router = express.Router({ mergeParams: true });

router.post("/", withAuth({ role: "LIBRARIAN" }), createBorrowing);
router.delete("/", withAuth({ role: "LIBRARIAN" }), deleteBorrowing);

export default router;