import { useState, useEffect } from "react";
import "./App.css";
import Authenticate from "./components/Authenticate";
import RandomPosts from "./components/RandomPosts";
import axiosInstance from "./services/axios.service";

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

  async function tryAndStoreQueryString(): Promise<void> {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const paramsCode = urlParams.get('code')
    if (paramsCode) {
      const { data } = await axiosInstance({
        method: 'post',
        url: '/api/auth/access_token?code=' + paramsCode,
        headers: {
          "Content-Type": 'text/plain'
        },
        data: paramsCode
      })
      if (!data) throw new Error('Error trying to authenticate with Reddit')
      setRedditCode(data.access_token)
      localStorage.setItem('redditCode', data.access_token)
      localStorage.setItem('codeTs', new Date().getTime().toString())
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
          <RandomPosts redditCode={redditCode}></RandomPosts>
          :
          <Authenticate></Authenticate>
      }
    </div>
  );
}

export default App;
