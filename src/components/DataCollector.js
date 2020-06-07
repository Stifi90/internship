import React, { useState, useEffect } from "react";
import axios from "axios";

async function DataColector(id) {
  const incomes = await fetch(
    `https://recruitment.hal.skygate.io/incomes/${id}`
  )
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw Error(response.status);
    })
    .then((response) => response.json())
    .then((data) => data.incomes)
    .catch((error) => console.log(error));
  return incomes;
}

// const DataColector = (id) => {
//   const data= []

//   fetch(`https://recruitment.hal.skygate.io/incomes/${id}`)

// const [incomes, setIncomes] = useState([]);
// useEffect(() => {
//   fetch(`https://recruitment.hal.skygate.io/incomes/${id}`)
//     .then((response) => {
//       if (response.ok) {
//         return response;
//       }
//       throw Error(response.status);
//     })
//     .then((response) => response.json())
//     .then((data) => setIncomes(data))
//     .catch((error) => console.log(error));
// }, []);
// return incomes;
// };

export default DataColector;
