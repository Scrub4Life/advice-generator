import { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./index.css";
// SVG's
import icon from "./images/icon-dice.svg";
import divider from "./images/pattern-divider-desktop.svg";

const url = "https://api.adviceslip.com/advice";

function App() {
  const [quotes, setQuotes] = useState("");
  const [number, setNumber] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(url, { cache: "no-cache" });
      const quote = await response.json();
      setLoading(false);
      setNumber(quote.slip.id);
      setQuotes(quote.slip.advice);
      if (response.status !== 200) {
        // making yor own error
        throw new Error("cannont fetch the data");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleClick = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>ADVICE # {number}</h1>
      <div className="box">
        {loading ? <p>Loading...</p> : <p>"{quotes}"</p>}{" "}
        <img className="divider" src={divider} alt="page divider" />
        <button onClick={handleClick}>
          <img src={icon} alt="dice icon" />
        </button>
      </div>
    </div>
  );
}

export default App;
