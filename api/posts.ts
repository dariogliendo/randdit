import axios from 'axios'
import { Router } from 'express'
import { RequestHandler, NextFunction } from 'express'

const Posts = Router()

const posts: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
  try {
    const { data } = await axios.get(`https://oauth.reddit.com/api/v1/me`, {
      headers: {
        'Authorization': req.headers.authorization,
        "User-Agent": 'Randdit v1.0 App'
      }
    })
    console.log(data)
    res.send('jeje')
  } catch (error) {
    next(error)
  }
}

Posts.get('/api/posts', posts)

export default Posts