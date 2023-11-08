import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Exchanges.css'; // Import your CSS file

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [filteredExchanges, setFilteredExchanges] = useState([]);

  useEffect(() => {
    const apiKey = '8f9edbf9-8ab2-4458-8b5a-22634b985616'; // Replace with your CoinMarketCap API key
    const apiUrl = 'https://pro-api.coinmarketcap.com/v1/exchange/assets?id=270';
    axios
      .get("/db/response.json")
      .then((response) => {
        setExchanges(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching exchange data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter exchanges based on the search input
    const filtered = exchanges.filter((exchange) =>
      exchange.currency.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredExchanges(filtered);
  }, [searchInput, exchanges]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Top Cryptocurrency Exchanges</h1>
      <input
        type="text"
        placeholder="Search Cryptocurrency"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      
      <table className="exchanges-table">
        <thead>
          <tr>
            <th>Cryptocurrency</th>
            <th>Platform</th>
            <th>Wallet Address</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {filteredExchanges.map((exchange, index) => (
            <tr key={index}>
              <td>{exchange.currency.name}</td>
              <td>{exchange.platform.name}</td>
              <td>{exchange.wallet_address}</td>
              <td>{exchange.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Exchanges;
