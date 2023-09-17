import { useEffect } from "react"
import axiosInstance from "../services/axios.service"

const randomPosts = (props: {redditCode: string}) => {
  useEffect(() => {
    getPosts()
  }, [])
  
  async function getPosts() {
    try {
      const {data} = await axiosInstance.get('/api/posts?subreddit=argentina', {
        headers: {
          'Authorization': `bearer ${props.redditCode}`,
          'User-Agent': 'Randdit App V.01'
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