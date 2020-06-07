import React, { Component } from "react";

class Income extends Component {
  constructor(props) {
    super(props);
    this.apiIncome = `https://recruitment.hal.skygate.io/incomes/${props.id}`;
    this.state = {
      incomes: [],
    };
  }

  componentDidMount() {
    fetch(this.apiIncome)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          incomes: data.incomes,
        })
      )
      .catch((error) => console.log(error));
  }

  totalIncome = () => {
    let sum = this.state.incomes.map(
      (income) => (income.value = Number(income.value))
    );
    sum = sum.reduce((partial_sum, a) => partial_sum + a, 0).toFixed(2);
    return sum;
  };

  render() {
    return this.state.incomes.length > 0 ? this.totalIncome() : "nic nie ma";
  }
}

export default Income;
