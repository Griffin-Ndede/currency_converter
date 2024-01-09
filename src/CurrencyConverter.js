import React, {useState} from 'react'

function CurrencyConverter() {
const[convertedAmount, setConvertedAmount] = useState("This is where the converted amount value will go")
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
        <div>{convertedAmount}</div>
    </div>
    </>
  )
}

export default CurrencyConverter