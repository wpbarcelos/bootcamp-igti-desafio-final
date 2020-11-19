const { response } = require("express");
const { ReplSet } = require("mongodb");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require("../models/TransactionModel");

const index = async (req, res) => {
  const { period = "" } = req.query;
  const [year, month] = period.split("-");
  if (!period || year.length != 4 || month.length != 2) {
    return res.status(400).send({
      error:
        'É necessário informar o parametro "period", cujo valor deve estar no format yyyy-mm',
    });
  }

  const transactions = await TransactionModel.find({
    yearMonth: `${year}-${month}`,
  })
    .sort({
      yearMonthDay: 1,
    })
    .exec();

  return res.json(transactions);
};

const store = async (req, res) => {
  try {
    const transaction = await TransactionModel.create(req.body);
    return res.json(transaction);
  } catch (error) {
    res.status(500).json(error);
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "favor informar id" });
    }

    let transaction = await TransactionModel.findById(id);

    if (!transaction) {
      res.sendStatus(404);
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json(error);
  }
};
const update = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "favor informar id" });
    }

    let transaction = await TransactionModel.findById(id);

    if (!transaction) {
      res.sendStatus(404);
    }

    await transaction.updateOne(req.body).exec();

    transaction = await TransactionModel.findById(id);

    res.json(transaction);
  } catch (error) {
    res.status(500).json(error);
  }
};
const destroy = async (req, res) => {
  try {
    await TransactionModel.deleteOne({
      _id: req.params.id,
    });
    res.status(200).send();
  } catch (error) {
    res.status(500).json(error);
  }
};

const yearMonths = async (req, res) => {
  const data = await TransactionModel.find().distinct("yearMonth");
  res.send(data);
};

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
  yearMonths,
};
