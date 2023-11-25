import React from "react";

function PortfolioContainer( {displayStocks, stocks, stockAction} ) {
  
  return (
    <div>
      <h2>My Portfolio</h2>
      {
        displayStocks(stocks, stockAction)
      }
    </div>
  );
}

export default PortfolioContainer;
