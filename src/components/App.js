import React, { useState, useEffect } from "react";
import "./App.css";
// import Income from "./Income";
import Companies from "./Companies";
import Pagination from "./Pagination";
import axios from "axios";
import Stats from "./Stats";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [statistick, setStatistick] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(10);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const res = await axios.get(
        "https://recruitment.hal.skygate.io/companies"
      );

      const data = await Promise.all(
        res.data.map(async (company) => {
          const incomes = await axios.get(
            `https://recruitment.hal.skygate.io/incomes/${company.id}`
          );

          company.incomes = incomes.data.incomes;
          company.total = incomes.data.incomes
            .map((income) => (income.value = Number(income.value)))
            .reduce((partial_sum, a) => partial_sum + a, 0)
            .toFixed(2);

          return company;
        })
      );

      data.sort(function (a, b) {
        if (a.total === b.total) return 0;
        if (a.total < b.total) return -1;
        if (a.total > b.total) return 1;
      });

      setCompanies(data);
      setFilteredCompanies(data);
      setLoading(false);
    }

    getData();
  }, []);

  const indexOfLastCompanies = currentPage * companiesPerPage;
  const indexOfFirstCompanies = indexOfLastCompanies - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstCompanies,
    indexOfLastCompanies
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getfilteredCompanies = (input) => {
    return companies.filter((company) =>
      company.name.toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleChangeName = (e) => {
    setFilteredCompanies(companies);
    const input = e.target.value;
    const filteredCompanies = getfilteredCompanies(input);
    setFilteredCompanies(filteredCompanies);
  };

  const handleOpenStats = (incomes) => {
    const statsCollector = () => {
      return <Stats data={incomes} />;
    };
    setStatistick(statsCollector);
  };
  const handleCloceStats = () => {
    setStatistick([]);
  };

  return (
    <div id="main">
      {/* <div className="container">
        <input className="center" type="text" onChange={handleChangeName} />
      </div> */}
      <div className="container input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Filter</span>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          onChange={handleChangeName}
        />
      </div>

      <div className="container mt-1">
        <Companies
          companies={currentCompanies}
          loading={loading}
          click={handleOpenStats}
        />
        <Pagination
          dataPerPage={companiesPerPage}
          totalData={filteredCompanies.length}
          paginate={paginate}
        />
      </div>
      {statistick.length !== 0 ? (
        <div className="fixed">
          {statistick}
          <button
            type="button"
            className="close btnFixed"
            onClick={handleCloceStats}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default App;
