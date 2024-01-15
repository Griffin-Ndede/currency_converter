import React, {useState, useEffect} from 'react'

function CurrencyConverter() {

const [rates, setRates] = useState();
const [ratesFetched, setRatesFetched] = useState();
const[convertedAmount, setConvertedAmount] = useState("This is where the converted amount value will go")

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

function handleCurrencyConversion(){
    setConvertedAmount("This is the converted amount")
}
console.log(ratesFetched)
  return (
    <>
    <div id='page1'>
        <h1>Currency converter</h1>
        <div className='amount'>
            <label for = "amount">Enter amount</label><br></br>
            <input type='number' id='amount'></input>
        </div>
        <div id='select'>
            <select id="from">
        {ratesFetched ? (
          Object.keys(rates).map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))
        ) : (
          <option defaultValue>USD</option>
        )}
      </select>
      <select id="to">
        {ratesFetched ? (
          Object.keys(rates).map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))
        ) : (
          <option defaultValue>EUR</option>
        )}
      </select>
        </div>
        <button id='convert'onClick={handleCurrencyConversion}>Convert</button>
        <div id='converted'>{convertedAmount}</div>
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