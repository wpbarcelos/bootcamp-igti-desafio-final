const express = require("express");
const transactionRouter = express.Router();
const transationService = require("../services/transactionService");

transactionRouter.get("/", transationService.index);
transactionRouter.get("/:id/show", transationService.show);
transactionRouter.post("/", transationService.store);
transactionRouter.put("/:id", transationService.update);
transactionRouter.delete("/:id", transationService.destroy);

transactionRouter.get("/yearmonths", transationService.yearMonths);

module.exports = transactionRouter;
