import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import axios from 'axios'

const app = express()
const port = process.env.SERVER_PORT

app.use(cors())

app.post('/', async (req, res) => {
  const response = await axios.get(`https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_APP_ID}&response_type=code&
  state=saracatunga&redirect_uri=${process.env.REDDIT_REDIRECT}&duration=temporary&scope=read`)
  console.log(response.request.res.responseUrl)
  res.send(response.request.res.responseUrl)
})

app.listen(port, () => {
  console.log('Express on port ' + port)
})
