import express from 'express'
import {Request, Response, NextFunction} from 'express'
import 'dotenv/config'
import cors from 'cors'
import Auth from './api/auth.js'
import Posts from './api/posts.js'

interface RequestError extends Error {
  type: string,
  status: number
}

const app = express()
const port = process.env.SERVER_PORT

app.use(cors())

app.use(Auth)
app.use(Posts)

// Error handling
app.use((error : RequestError, req : Request, res: Response, next: NextFunction) => {
  console.error("Call to ERROR middleware")
  console.error('')
  console.error("Path: ", req.path)
  console.error("Error: ", error)

  if (error.type == 'time-out') res.status(408).send(error)
  else res.status(500).send(error)
  next()
})

app.listen(port, () => {
  console.log('Express on port ' + port)
})
