import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";
import Stock from "./Stock";

function MainContainer() {
  useEffect(() => {
    fetch('http://localhost:3001/stocks')
      .then((response) => response.json())
      .then((data) => setStocks(data));
  }, []);

  const [stocks, setStocks] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [sortKey, setSortKey] = useState("");
  const [filter, setFilter] = useState("");

  const stocksToDisplay = [...stocks].sort((a,b) => {
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  }).filter((stock) => {
    if (filter === "") return true;
    return stock.type === filter;
  });

  function addToPortfolio(boughtStock) {
    setPortfolioStocks([...portfolioStocks, boughtStock]);
    console.log(`Stock #${boughtStock.id} added to portfolio.`);
  }

  function removeFromPortfolio(soldStock) {
    setPortfolioStocks(portfolioStocks.filter((stock) => stock.id !== soldStock.id));
    console.log(`Stock #${soldStock.id} removed from portfolio.`);
  }

  function generateStockComponents(stockArray, stockAction) {
    console.log(stockArray);
    //console.log(stockAction);
    return stockArray.map((stock) => {
      return (
        <Stock
          key={stock.id}
          stock={stock}
          stockAction={stockAction}
        />
      );
    });
  }

  function handleSortKeyChange(newSortKey) {
    setSortKey(newSortKey);
  }

  function handleFilterChange(event) {
    console.log(event.target.value);
    setFilter(event.target.value);
  }

  return (
    <div>
      <SearchBar onSortKeyChange={handleSortKeyChange} onFilterChange={handleFilterChange} />
      <div className="row">
        <div className="col-8">
          <StockContainer 
            displayStocks={generateStockComponents} 
            stocks={stocksToDisplay} 
            stockAction={addToPortfolio}  
          />
        </div>
        <div className="col-4">
          <PortfolioContainer 
            displayStocks={generateStockComponents} 
            stocks={portfolioStocks}
            stockAction={removeFromPortfolio} 
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
