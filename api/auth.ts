import express from 'express'
import axios from 'axios'
import {Request, Response, NextFunction, RequestHandler} from 'express'

const Auth = express.Router()

const getRedditAuth : RequestHandler = async (req: Request, res: Response, next: NextFunction) : Promise<void> =>  {
  try {
    const response = await axios.get(`https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_APP_ID}&response_type=code&redirect_uri=${process.env.REDDIT_REDIRECT}&duration=temporary&scope=read&state=${req.query.statestring}`)
    res.send(response.request.res.responseUrl)
  } catch (error) {
    next(error)
  }
}

type Params = {}
type ResBody = {}
type ReqBody = {}
type ReqQuery = {
  code: string
}

const getAccessToken : RequestHandler<Params, ResBody, ReqBody, ReqQuery> = async (req, res, next : NextFunction) : Promise<void> => {
  try {

    if (!req.query?.code) next('Must send an OAuth code');
    const { data } = await axios({
      method: 'post',
      url: 'https://www.reddit.com/api/v1/access_token',
      data: new URLSearchParams({
        "grant_type": "authorization_code",
        "code": req.query.code,
        "redirect_uri": process.env.REDDIT_REDIRECT as any
      }),
      headers: {
        'Authorization': `Basic ${strToBase64(process.env.REDDIT_APP_ID + ':' + process.env.REDDIT_APP_SECRET)}`,
        'User-Agent': 'Randdit App V.01',
        'Content-Type': "application/x-www-form-urlencoded"
      },
    });
    res.send(data);
  } catch (error) {
    next(error);
  }
}

function strToBase64(string : string) : string {
  return Buffer.from(string).toString('base64')
}

Auth.post('/api/auth/access_token', getAccessToken);
Auth.post('/api/auth', getRedditAuth)

export default Auth