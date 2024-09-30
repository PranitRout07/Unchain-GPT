import express from "express"

import { db } from "./db.js";
import { GenerateAiResp, GenerateNewSession, GetLastChat, GetLastResp, GroupBySession} from "./controllers/aiRespController.js";
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


app.listen(4000,()=>{
    console.log("Running in port 4000")
}) 