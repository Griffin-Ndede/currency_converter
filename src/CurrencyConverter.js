import React, {useState} from 'react'

function CurrencyConverter() {
const[convertedAmount, setConvertedAmount] = useState("This is where the converted amount value will go")

function handleCurrencyConversion(){
    setConvertedAmount("This is the converted amount")
}
  return (
    <>
    <div id='page1'>
        <h1>Currency converter</h1>
        <div className='amount'>
            <label for = "amount">Enter amount</label><br></br>
            <input type='number' id='amount'></input>
        </div>
        <div id='select'>
            <select>
                <option value="option">Currency from</option>
            </select>
            <select>
                <option value="option">Currency to</option>
            </select>
        </div>
        <button id='convert'onClick={handleCurrencyConversion}>Convert</button>
        <div id='converted'>{convertedAmount}</div>
    </div>
    </>
  )
}

export default CurrencyConverter