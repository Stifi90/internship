import React from "react";

const Companies = ({ companies, loading, click }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="list-group">
      {companies.map((company) => (
        <li
          key={company.id}
          className="list-group-item btn"
          onClick={() => click(company.incomes)}
          // role="button"?
        >
          <div>
            Company: {company.name}
            <br /> City: {company.city}
            <br />
            Total incomes : {company.total}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Companies;
