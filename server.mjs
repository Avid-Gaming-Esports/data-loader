import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
// rest of the code remains same

dotenv.config();
const app = express();
const PORT = 5000;

app.use(express.json())
app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (_req, res) => res.send('Express + TypeScript Server'));

app.post('/api/', function (req, res) {
  // console.log(req.body);
  // console.log("https://na1.api.riotgames.com/lol/match/v4/matches/" + req.body.gameID)
  axios.get("https://na1.api.riotgames.com/lol/match/v4/matches/" + req.body.gameID, {
    headers: {
      'X-Riot-Token': process.env.RIOT_API_KEY
    }
  }).then(riotResp => {
    res.send(riotResp.data);
  }).catch(err => {
    console.log(err)
  })
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});