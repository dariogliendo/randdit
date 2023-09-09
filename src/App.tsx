import { useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import Authenticate from "./components/Authenticate";

function App() {
  const [redditCode, setRedditCode] = useState<string | null>(null)
  const localCode = localStorage.getItem('redditCode')
  const { code } = useParams()
  if (code) {
    setRedditCode(code)
    localStorage.setItem('redditCode', code)
  }
  else if (localCode) setRedditCode(localCode)

  return (
    <>
      {redditCode ? <h1>Hola</h1> : <Authenticate></Authenticate>}
    </>
  );
}

export default App;
