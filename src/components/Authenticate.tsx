import axiosInstance from "../services/axios.service";

const Authenticate = () => {
  async function authenticate(): Promise<void> {
    try {
      const { data } = await axiosInstance.post(`/api/auth?statestring=alpargata`);
      window.location.replace(data)
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <h1>Randdit</h1>
      <button onClick={authenticate}>Authenticate</button>
    </>
  )
}

export default Authenticate