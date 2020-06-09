import React, { useState } from "react";
import Pagination from "./Pagination";
import Incomes from "./Incomes";

const Stats = ({ data }) => {
  const [incomeValue] = useState(data.map((item) => item.value));
  const [incomeDate] = useState(data.map((item) => item.date));
  const [filteredDate, setfilteredDate] = useState(
    data.map((item) => item.date)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [incomesPerPage] = useState(10);
  const [firstDate, setFirstDate] = useState(0);
  const [lastDate, setLastDate] = useState(incomeDate.length);
  //   const [income, setIncome] = useState(data.map((item) => item.value));

  const indexOfLastIncomes = currentPage * incomesPerPage;
  const indexOfFirstIncomes = indexOfLastIncomes - incomesPerPage;
  const currentData = data
    .sort(function (a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c - d;
    })
    .reverse()
    .slice(indexOfFirstIncomes, indexOfLastIncomes);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFirst = (e) => {
    setFirstDate(e.target.value);
    setfilteredDate(incomeDate.slice(e.target.value, incomeDate.length));
  };

  const handleLast = (e) => {
    setLastDate(Number(e.target.value) + Number(firstDate));
  };

  const total = (data) => {
    return data
      .slice(firstDate, lastDate)
      .reduce((partial_sum, a) => partial_sum + a, 0)
      .toFixed(2);
  };

  const average = (data) => {
    let sum = data
      .slice(firstDate, lastDate)
      .reduce((partial_sum, a) => partial_sum + a, 0)
      .toFixed(2);
    sum = sum / sum.length;
    return sum;
  };

  const lastMonth = (data) => {
    const sortDate = data.sort(function (a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c - d;
    });
    const lastMonth = 2592000000;
    const actualData = new Date(sortDate[data.length - 1].date);

    var filteredObjects = data
      .filter((item) => {
        const dataDate = new Date(item.date);
        if (actualData - lastMonth <= dataDate) {
          return item.value;
        }
      })
      .map((item) => item.value)
      .reduce((partial_sum, a) => partial_sum + a, 0);
    return filteredObjects;
  };

  return (
    <div className="container">
      <div className="container mt-1">
        <Incomes data={currentData} />
        <Pagination
          dataPerPage={incomesPerPage}
          totalData={data.length}
          paginate={paginate}
        />
      </div>
      <div>
        <label className="p-2 bd-highlight">
          <h3>Select date range:</h3>
          <select
            className="browser-default custom-select p-2 bd-highlight"
            value={firstDate}
            onChange={handleFirst}
          >
            {incomeDate.map((item, id) => (
              <option key={id} value={id}>
                {item}
              </option>
            ))}
          </select>
          <select
            className="browser-default custom-select p-2 bd-highlight"
            value={lastDate}
            onChange={handleLast}
          >
            {filteredDate.map((item, id) => (
              <option key={id} value={id}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <h4>
          Total: <span>{total(incomeValue)}</span>
          {"    "}
          Average:
          <span>{average(incomeValue).toFixed(2)}</span>
          {"    "}
          Last month (30 days before last input):
          <span>{lastMonth(data)}</span>
        </h4>
      </div>
    </div>
  );
};

export default Stats;
