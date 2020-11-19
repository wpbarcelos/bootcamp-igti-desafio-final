import React, { useState, useEffect } from "react";

import api from "../service/api";

export default function SelectYearMonths({ setYearMonth, yearMonth }) {
  const [loading, setLoading] = useState(true);
  const [yearMonths, setYearMonths] = useState([]);

  const monthLegends = [
    { month: "01", name: "Janeiro" },
    { month: "02", name: "Fevereiro" },
    { month: "03", name: "Março" },
    { month: "04", name: "Abril" },
    { month: "05", name: "Maio" },
    { month: "06", name: "Junho" },
    { month: "07", name: "Julho" },
    { month: "08", name: "Agosto" },
    { month: "09", name: "Setembro" },
    { month: "10", name: "Outubro" },
    { month: "11", name: "Novembro" },
    { month: "12", name: "Dezembro" },
  ];

  function getLabel(yearMonth) {
    let [year, month] = yearMonth.split("-");

    let name = monthLegends.find((item) => item.month == month)?.name || "";

    return `${name}/${year}`;
  }

  function nextYearMonth() {}

  useEffect(() => {
    api.get("/api/transaction/yearmonths").then((response) => {
      setYearMonths(response.data || []);
      setYearMonth(response.data[0]);
      setLoading(false);
    });
  }, []);

  function nextYearMonth() {
    let idx = yearMonths.indexOf(yearMonth);
    if (yearMonths[idx + 1]) {
      setYearMonth(yearMonths[idx + 1]);
    }
  }

  function prevYearMonth() {
    let idx = yearMonths.indexOf(yearMonth);
    if (yearMonths[idx - 1]) {
      setYearMonth(yearMonths[idx - 1]);
    }
  }

  if (loading) {
    return <div />;
  }
  return (
    <>
      <div className="d-flex justify-content-center">
        <a
          onClick={prevYearMonth}
          className="btn btn-primary"
          disabled={yearMonths.indexOf(yearMonth) == 0}
        >
          &larr;
        </a>
        <select
          className="form-control col-md-3"
          value={yearMonth}
          onChange={(event) => {
            setYearMonth(event.target.value);
          }}
        >
          {yearMonths.map((item) => (
            <option value={item} key={item}>
              {getLabel(item)}
            </option>
          ))}
        </select>
        <button
          onClick={nextYearMonth}
          className="btn"
          disabled={yearMonths[yearMonths.length - 1] == yearMonth}
        >
          &rarr;
        </button>
      </div>
    </>
  );
}
