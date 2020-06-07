import React, { useState, useEffect } from "react";
import "./App.css";
// import Income from "./Income";
import Companies from "./Companies";
import Pagination from "./Pagination";
import axios from "axios";

const App = () => {
  const [companies, setCompanies] = useState([]);
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
        if (a.total == b.total) return 0;
        if (a.total < b.total) return -1;
        if (a.total > b.total) return 1;
      });

      console.log(data);

      setCompanies(data);
      setLoading(false);
    }

    getData();
  }, []);

  const indexOfLastCompanies = currentPage * companiesPerPage;
  const indexOfFirstCompanies = indexOfLastCompanies - companiesPerPage;
  const currentCompanies = companies.slice(
    indexOfFirstCompanies,
    indexOfLastCompanies
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-1">
      <h2 className="text-primary mb-1">My Blog</h2>
      <Companies companies={currentCompanies} loading={loading} />
      <Pagination
        companiesPerPage={companiesPerPage}
        totalCompanies={companies.length}
        paginate={paginate}
      />
    </div>
  );
};
export default App;
