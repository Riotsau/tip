import { useState, useEffect } from "react";
import axios from 'axios';

export default function App() {
  return (
    <div>
      <TipCalculator />
      <StudentEditor />
    </div>
  );
}

const Weather = () => {
  const [weather, setWeather] = useState("");
  useEffect(() => {
    axios.get('http://api.weatherapi.com/v1/current.json?key=691ce340a5e74b0cb0040023231109&q=Sydney')
      .then(function (response) {
        // handle success
        setWeather(response.data);
      })
      .catch(function (error) {
        // handle error
      });
  }, []);
  return (
    <div>
      {weather && (
        <>
          location {weather.location.name} temperature {weather.current.temp_c}
        </>
      )}
    </div>
  )
}

const StudentEditor = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const handleOnClick = () => {
    console.log('name', name);
    console.log('age', age);
  }
  return (
    <div>
      <input type="text" onChange={(e) => setName(e.target.value)}></input>
      <input type="text" onChange={(e) => setAge(e.target.value)}></input>
      <button onClick={handleOnClick}>
        Submit
      </button>
    </div>
  )
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const tip = bill * ((percentage1 + percentage2) / 2 / 100);
  function handleReset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }
  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <ServiceRating percentage={percentage1} onSetPercentage={setPercentage1}>
        How did you like the service?
      </ServiceRating>
      <ServiceRating percentage={percentage2} onSetPercentage={setPercentage2}>
        How did your friend like the service?
      </ServiceRating>
      {bill > 0 && (
        <>
          <Pay bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}
function BillInput({ bill, onSetBill }) {
  return (
    <div className="billInput">
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}
function ServiceRating({ children, percentage, onSetPercentage }) {
  return (
    <div className="rating">
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSetPercentage(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}
function Pay({ bill, tip }) {
  return (
    <h3>
      You pay ${tip + bill} (${bill}+${tip}tip)
    </h3>
  );
}
function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
