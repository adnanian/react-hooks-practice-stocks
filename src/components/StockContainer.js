import React from "react";
//import Stock from "./Stock";

function StockContainer( {displayStocks, stocks, stockAction} ) {
  return (
    <div>
      <h2>Stocks</h2>
      {displayStocks(stocks, stockAction)}
    </div>
  );
}

export default StockContainer;
