import React, { useState, useEffect, useMemo } from "react";
import api from "../service/api";
import { useHistory } from "react-router-dom";

const NewTransaction = () => {
  let history = useHistory();

  const [type, setType] = useState("-");
  const [description, setDescrition] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState(null);
  const [ymd, setYmd] = useState("");

  const validateForm = useMemo(() => {
    return !(type && description && category && value && ymd);
  });

  async function store(event) {
    event.preventDefault();

    const [year, month, day] = ymd.split("-");
    const yearMonth = `${year}-${month}`;
    const yearMonthDay = ymd;

    const data = {
      type,
      yearMonth,
      yearMonthDay,
      day,
      year,
      month,
      category,
      description,
      value,
    };

    try {
      await api.post("/api/transaction", data);
      alert("Cadastrado com sucesso");
      history.push("/");
    } catch (error) {
      alert("erro ao cadastrar");
      console.log(error);
    }
  }
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2 class="text-center mb-3">Nova transação</h2>
      <form class="form" onSubmit={store}>
        <div className="row my-2">
          <div className="col">
            <button
              type="button"
              className={
                type == "+"
                  ? "btn btn-block btn-success"
                  : "btn btn-block  btn-outline-success"
              }
              onClick={() => setType("+")}
            >
              Receita
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className={
                type == "-"
                  ? "btn btn-block btn-danger"
                  : "btn btn-block btn-outline-danger"
              }
              onClick={() => setType("-")}
            >
              Despesa
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="">Categoria</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Descrição</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescrition(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Valor</label>
          <input
            type="number"
            className="form-control"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Dia</label>
          <input
            type="date"
            className="form-control"
            value={ymd}
            onChange={(e) => setYmd(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success"
          disabled={validateForm}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default NewTransaction;
