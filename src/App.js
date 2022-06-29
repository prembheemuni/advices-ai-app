import React from "react";
import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

const alanKey =
  "6602e6b4e3092fff5af22cbb2fa30bff2e956eca572e1d8b807a3e2338fdd0dc/stage";

function App() {
  const [advise, setAdvise] = useState("");
  const fetchCall = async () => {
    const response = await Axios.get("https://api.adviceslip.com/advice");
    const data = await response.data;
    const msg = data?.slip.advice;
    setAdvise(msg);
    return msg;
  };

  useEffect(() => {
    fetchCall();
    const alanInstance = alanBtn({
      key: alanKey,
      onCommand: async ({ command }) => {
        if (command === "speak") {
          const ab = await fetchCall();
          alanInstance.playText(ab);
        }
      },
    });
  }, []);

  return (
    <div className="homebg">
      <div className="instructions"></div>
      <div className="container">
        <h3>Ask "Say prem Something"</h3>
        <h1>{advise}</h1>
        <button onClick={fetchCall}>Give me Advise</button>
      </div>
    </div>
  );
}

export default App;
