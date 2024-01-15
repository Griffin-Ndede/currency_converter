import React, { useState, useEffect } from 'react';

function CurrencyConverter() {
  // State variables
  const [rates, setRates] = useState();  // To store exchange rates
  const [ratesFetched, setRatesFetched] = useState();  // To track if rates have been fetched
  const [convertedAmount, setConvertedAmount] = useState("Your converted amount is ...");  // To store the converted amount
  const [amount, setAmount] = useState();  // To store the input amount
  const [fromCurrency, setFromCurrency] = useState("USD");  // To store the source currency
  const [toCurrency, setToCurrency] = useState("USD");  // To store the target currency

  useEffect(() => {
    // URL for fetching exchange rates for USD
    const URL = "https://v6.exchangerate-api.com/v6/0ba10b681bdf7772f0f7c96a/latest/USD";

    // Function to fetch rates from the API
    const fetchRates = async () => {
      const response = await fetch(URL).then((response) => response.json());

      // Check if the API call was successful
      if (response.result === "success") {
        setRates(response.conversion_rates);  // Update state with exchange rates
        setRatesFetched(true);  // Mark that rates have been fetched
      }
    };

    // Call the fetchRates function when the component mounts
    fetchRates();
  }, []);

  // Function to handle currency conversion
  const handleCurrencyConversion = async () => {
    // Fetch the exchange rates for the selected source currency
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/0ba10b681bdf7772f0f7c96a/latest/${fromCurrency}`
    ).then((response) => response.json());

    const fetchedRates = response.conversion_rates;  // Extract exchange rates
    const CurrencyRate = fetchedRates[toCurrency];  // Get the exchange rate for the target currency

    // Calculate the converted amount
    const output = amount * CurrencyRate;
      // Format the output with commas after every three digits from the right
  const formattedOutput = output.toLocaleString(undefined, { maximumFractionDigits: 2 });

  // Update state with the formatted converted amount
  setConvertedAmount(formattedOutput);
  };

  // JSX for rendering the component
  return (
    <>
      <div id='page1'>
        <h1>Currency converter</h1>
        {/* Input field for entering the amount */}
        <div className='amount'>
          <label htmlFor="amount">Enter amount</label><br></br>
          <input
            type="number"
            id="amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </div>
        {/* Dropdowns for selecting source and target currencies */}
        <div id='select'>
          <select
            id="from"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}>
            {/* Check if rates have been fetched */}
            {ratesFetched ? (
              // If rates are fetched, map through the currencies in the 'rates' object
              Object.keys(rates).map((currency, index) => (
                // For each currency, create an <option> element with currency as value and text
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))
            ) : (
              // If rates are not fetched (initial state), provide a default option with 'USD'
              <option defaultValue>USD</option>
            )}
          </select>

          <select
            id="to"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}>
            {/* Check if rates have been fetched */}
            {ratesFetched ? (
              // If rates are fetched, map through the currencies in the 'rates' object
              Object.keys(rates).map((currency, index) => (
                // For each currency, create an <option> element with currency as value and text
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))
            ) : (
              // If rates are not fetched (initial state), provide a default option with 'EUR'
              <option defaultValue>EUR</option>
            )}
          </select>

        </div>
        {/* Button to trigger currency conversion */}
        <button id='convert' onClick={handleCurrencyConversion}>Convert</button>
        {/* Display the converted amount */}
        <div id='converted'>Output: {convertedAmount}</div>
      </div>
    </>
  );
}

export default CurrencyConverter;
