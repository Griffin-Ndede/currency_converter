import React, {useState} from 'react'

function CurrencyConverter() {

    const[convertedCurrency, setConvertedCurrency] =useState("This is the value we get after converting the currency")
  return (
    <>
    <div>
        <h1>Currency converter</h1>
        <input type='number' id='amount'></input>
        <select>
            <option value="option">Currency from</option>
        </select>
        <select>
            <option value="option">Currency to</option>
        </select>
        <button id='convert'>Convert</button>
        <div>{convertedCurrency}</div>
    </div>
    </>
  )
}

export default CurrencyConverter