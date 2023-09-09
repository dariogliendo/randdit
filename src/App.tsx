import { useState, useEffect } from "react";
import "./App.css";
import Authenticate from "./components/Authenticate";

interface localData {
  code: string | null,
  codeTs: number | null
}

function App() {
  const [redditCode, setRedditCode] = useState<string | null>(null)

  useEffect(() => {
    const { code, codeTs } = getLocalData()

    if (code) {
      if (typeof codeTs === 'number' && (codeTs < codeTs + 60000)) setRedditCode(code)
      else {
        localStorage.clear()
        tryAndStoreQueryString()
      }
    } else {
      tryAndStoreQueryString()
    }

  }, [])

  function tryAndStoreQueryString(): void {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const paramsCode = urlParams.get('code')
    if (paramsCode) {
      localStorage.setItem('redditCode', paramsCode)
      localStorage.setItem('codeTs', new Date().getTime().toString())
      setRedditCode(paramsCode)
    }
  }

  function getLocalData(): localData {
    const code: string | null = localStorage.getItem('redditCode')
    const codeTs: string | null = localStorage.getItem('codeTs')

    const result: localData = { code, codeTs: null }
    if (codeTs) result.codeTs = parseInt(codeTs)
    return result
  }


  return (
    <div>
      {
        redditCode ?
          <h1>Hola</h1>
          :
          <Authenticate></Authenticate>
      }
    </div>
  );
}

export default App;
