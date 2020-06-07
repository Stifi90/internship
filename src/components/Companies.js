import React from "react";

const Companies = ({ companies, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="list-group mb-4">
      {companies.map((companies) => (
        <li key={companies.id} className="list-group-item">
          Company: {companies.name}
          <br /> City: {companies.city}
          <br />
          Total incomes : {companies.total}
        </li>
      ))}
    </ul>
  );
};

export default Companies;
