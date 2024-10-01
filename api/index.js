import express from "express"

import { db } from "./db.js";
import { GenerateAiResp, GenerateNewSession, GetLastChat, GetLastResp, GroupBySession, GroupRestOfTheSessions, GroupSessionsByLastSevenDays, GroupSessionsByToday, GroupSessionsByYesterday} from "./controllers/aiRespController.js";
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to db!");
});

const app = express();
app.use(express.json());


app.post("/api/newsession/",GenerateNewSession)
app.get("/api/chat/:session_id",GetLastChat)
app.get("/api/resp/:session_id",GetLastResp)
app.post("/api/generate",GenerateAiResp)


app.get("/api/sessions",GroupBySession)

app.get("/api/sessions/today",GroupSessionsByToday)
app.get("/api/sessions/yesterday",GroupSessionsByYesterday)
app.get("/api/sessions/oneweek",GroupSessionsByLastSevenDays)
app.get("/api/sessions/rest",GroupRestOfTheSessions)


app.listen(4000,()=>{
    console.log("Running in port 4000")
}) 