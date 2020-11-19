import React, { useState, useEffect, useMemo } from "react";
import SelectYearMonths from "../components/SelectYearMonths";
import api from "../service/api";

import { Link } from "react-router-dom";

import moneyFormat from "../utils/moneyFormat";

import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function App() {
  const [yearMonth, setYearMonth] = useState("");
  const [transactions, setTransactions] = useState([]);

  const [search, setSearch] = useState("");

  const transactionsFilter = useMemo(() => {
    return transactions.filter((item) => {
      return new RegExp(search, "i").test(item.description);
    });
  }, [transactions, search]);

  const receitas = useMemo(() => {
    return transactionsFilter
      .filter((item) => item.type == "+")
      .reduce((acc, item) => acc + item.value, 0);
  });

  const despesas = useMemo(() => {
    return transactionsFilter
      .filter((item) => item.type == "-")
      .reduce((acc, item) => acc + item.value, 0);
  });

  const saldo = useMemo(() => receitas - despesas);

  useEffect(() => {
    api
      .get("/api/transaction?period=" + yearMonth)
      .then((response) => {
        setTransactions(response.data);
      })
      .finally(() => {});
  }, [yearMonth]);

  async function deleteTransaction(id) {
    if (window.confirm("Deseja realmente excluir?")) {
      await api.delete("/api/transaction/" + id);

      setTransactions(transactions.filter((item) => item._id !== id));
    }
  }

  return (
    <>
      <div>
        <SelectYearMonths yearMonth={yearMonth} setYearMonth={setYearMonth} />

        <div className="row mt-5">
          <div className="col">
            <strong className="mr-2">Lançamentos:</strong>
            {transactionsFilter.length}
          </div>
          <div className="col">
            <strong className="mr-2">Receitas:</strong>
            <span className="text-success">{moneyFormat(receitas)}</span>
          </div>

          <div className="col">
            <strong className="mr-2">Despesas:</strong>
            <span className="text-danger">{moneyFormat(despesas)}</span>
          </div>

          <div className="col">
            <strong className="mr-2">Saldo:</strong>
            <span className={saldo < 0 ? "text-danger" : "text-success"}>
              {moneyFormat(saldo)}
            </span>
          </div>
        </div>

        <input
          type="text"
          className="form-control"
          placeholder="Busca de descrição"
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        />
        <table className="table mt-5">
          <tbody>
            {transactionsFilter.map((item) => (
              <tr
                key={item._id}
                className={item.type == "-" ? "bg-warning" : "bg-success"}
              >
                <th width="5%">{item.day}</th>
                <td width="80%">
                  <strong>{item.category}</strong>
                  <p className=" p-0 mb-0">{item.description}</p>
                </td>
                <td>{moneyFormat(item.value)}</td>
                <td>
                  <Link
                    className="btn text-dark bg-light"
                    to={`transaction/${item._id}`}
                  >
                    <FiEdit />
                  </Link>
                </td>
                <td>
                  <button
                    className="btn bg-danger"
                    onClick={() => deleteTransaction(item._id)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
