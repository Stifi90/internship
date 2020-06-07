import React, { useState, useEffect } from "react";
import "./App.css";
// import Income from "./Income";
import DataCollector from "./DataCollector";
import axios from "axios";

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const res = await axios.get(
        "https://recruitment.hal.skygate.io/companies"
      );

      res.data
        .map(async (company) => {
          const incomes = await axios.get(
            `https://recruitment.hal.skygate.io/incomes/${company.id}`
          );

          company.incomes = incomes.data.incomes;
          company.total = Number(
            incomes.data.incomes
              .map((income) => (income.value = Number(income.value)))
              .reduce((partial_sum, a) => partial_sum + a, 0)
              .toFixed(2)
          );
        })
        .sort(function (a, b) {
          return a.total - b.total;
        });

      console.log(res.data);

      setCompanies(res.data);
      setLoading(false);
    }

    getData();
  }, []);

  // const data = posts.map((post) => <Income id={post.id} />);

  // const test = posts.map((post) => DataCollector(post.id));
  // console.log(posts);
  // console.log(test);

  return <div>działa</div>;
};
export default App;
