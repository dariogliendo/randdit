import "./App.css";
import axios from "axios";

async function authenticate(): Promise<void> {
  try {
    const { data } = await axios.post(`http://localhost:8000/`);
    console.log(data)
    
  } catch (error) {
    alert(error);
  }
}

function App() {
  return (
    <>
      <h1>Randdit</h1>
      <button onClick={authenticate}>Authenticate</button>
    </>
  );
}

export default App;
