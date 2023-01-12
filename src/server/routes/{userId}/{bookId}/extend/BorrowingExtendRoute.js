import express from "express";
import withAuth from "../../../../../framework/middlewares/withAuth.js";
import extendBorrowing from "../../../../../services/borrowing/extendBorrowing.js";
const router = express.Router({ mergeParams: true });

router.put("/", withAuth({ role: "LIBRARIAN" }), extendBorrowing);

export default router;