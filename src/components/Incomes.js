import React from "react";

const Incomes = ({ data }) => {
  return (
    <ul className="list-group mb-4">
      {data.map((item, id) => (
        <li key={id} className="list-group-item ">
          <div>
            Date: {item.date}
            <br /> Income: {item.value}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Incomes;
