import { useEffect } from "react"
import axiosInstance from "../services/axios.service"

const randomPosts = (props: {redditCode: string}) => {
  useEffect(() => {
    getPosts()
  }, [])
  
  async function getPosts() {
    try {
      const {data} = await axiosInstance.get('/api/posts', {
        headers: {
          'Authorization': `bearer ${props.redditCode}`
        }
      })
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
        <h1>Random Posts</h1>
    </>
  )
}

export default randomPosts