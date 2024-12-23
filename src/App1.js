import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App1.css";

export default function App1() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [info, setInfo] = useState([]);
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState();
  //const [flags, setFlags] = useState ({});

  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
    )
      .then((res) => {
        setInfo(res.data[from]);
      })

      .catch((err) => console.log(err));
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info));
    Convert();
  }, [info]);

  const Convert = () => {
    if (!amount) {
        alert ("Please Enter valid number");
    }
    
    const rate = info[to];
    setOutput(amount * rate);
  };

  return (
    <div>
      <div className="box">
        <div className="container">
          <div className="box2">
            <h2>Currency Converter</h2>
          </div>
          <div className="box1">
            <div className="left">
              <h4>Amount</h4>
              <input
                type="text"
                placeholder="enter amount"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="middle">
              <h4>From</h4>
              <select onChange={(e) => setFrom(e.target.value)} value={from}>
                {options.map((o) => (
                  <option value={o}>{o.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div className="right">
              <h4>To</h4>
              <select onChange={(e) => setTo(e.target.value)} value={to}>
                {options.map((o) => (
                  <option value={o}>{o.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div className="answer">
              <h4>Converted amount</h4>
              <h4 id="output1">
                {amount +
                  " " +
                  from +
                  " " +
                  "= " +
                  output +
                  " " +
                  to.toUpperCase()}
              </h4>

              <button onClick={Convert}>Convert</button>
            </div>
          </div>
        </div>

        <div className="container1"></div>
      </div>
    </div>
  );
}
