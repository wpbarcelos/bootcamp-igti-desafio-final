import React, { useMemo, useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";
import api from "../service/api";

const NewTransaction = () => {
  const { id } = useParams();
  let history = useHistory();

  const [type, setType] = useState("-");
  const [description, setDescrition] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState(null);
  const [ymd, setYmd] = useState("");
  const [loading, setLoading] = useState(true);

  const validateForm = useMemo(() => {
    return !(description && category && value && ymd);
  });

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/transaction/${id}/show`)
      .then((response) => {
        const { data } = response;
        setType(data.type);
        setDescrition(data.description);
        setCategory(data.category);
        setValue(data.value);
        setYmd(data.yearMonthDay);
        setLoading(false);
      })
      .catch((err) => {
        alert("Ocorreu um erro ao consultar o registro");
        console.log(err);
      });
  }, [id]);

  async function update(event) {
    event.preventDefault();

    const [year, month, day] = ymd.split("-");
    const yearMonth = `${year}-${month}`;
    const yearMonthDay = ymd;

    const data = {
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
      await api.put("/api/transaction/" + id, data);
      alert("Atualizado com sucesso");
    } catch (error) {
      alert("erro ao cadastrar");
      console.log(error);
    }
  }

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2 class="text-center mb-3">Nova transação</h2>
      <form class="form" onSubmit={update}>
        <div className="row my-2">
          <div className="col">
            <button
              type="button"
              className={
                type == "+"
                  ? "btn btn-block btn-success"
                  : "btn btn-block  btn-outline-success"
              }
              disabled
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
              disabled
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
          Atualizar
        </button>
      </form>
    </div>
  );
};

export default NewTransaction;
