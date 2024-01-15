import React, {useState, useEffect} from 'react'

function CurrencyConverter() {

const [rates, setRates] = useState();
const [ratesFetched, setRatesFetched] = useState();
const[convertedAmount, setConvertedAmount] = useState("Your currency is...")
const [amount, setAmount] = useState(0);
const [fromCurrency, setFromCurrency] = useState("USD");
const [toCurrency, setToCurrency] = useState("USD");


useEffect(()=>{
    const URL = "https://v6.exchangerate-api.com/v6/0ba10b681bdf7772f0f7c96a/latest/USD"
// fetching the rates from the API
    const fetchRates = async()=>{
        const response = await fetch(URL)
        .then((response) => response.json());

// saving the rates in the state
if(response.result === "success"){
    setRates(response.conversion_rates);
    setRatesFetched(true);
}
    }
    fetchRates()
}, [])


const handleCurrencyConversion = async () => {
        // fetch the selected from currency rates
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/0ba10b681bdf7772f0f7c96a/latest/${fromCurrency}`
        ).then((response) => response.json());
        const fetchedRates = response.conversion_rates;
       // calculate and store the result
        const CurrencyRate = fetchedRates[toCurrency];
        const output = amount * CurrencyRate;
        setConvertedAmount(output);
      };

return (
    <>
    <div id='page1'>
        <h1>Currency converter</h1>
        <div className='amount'>
            <label for = "amount">Enter amount</label><br></br>
            <input 
                type="number"
                id="amount"   
                onChange={(e) => setAmount(e.target.value)}  
                value={amount} 
            />
        </div>
        <div id='select'>
        <select id="from"
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

        <select id="to"
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
        <button id='convert'onClick={handleCurrencyConversion}>Convert</button>
        <div id='converted'>Output: {convertedAmount}</div>
    </div>
    </>
  )
}

export default CurrencyConverter

//         try{
//             const response = await fetch(URL);
//             const json = await response.json();
//             console.log(json);
//         } catch(error){
//             console.log("erro", error)
//         }
//     }
//     fetchData();
// },[])