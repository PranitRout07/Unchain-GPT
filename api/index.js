import express from "express"

import { Ollama } from "@langchain/ollama";
import { db } from "./db.js";
import { AiRespController, GetChatHistory, GetLastChat, GetLastResp, ReceiveChat } from "./controllers/aiRespController.js";
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to db!");
});

const app = express();
app.use(express.json());

app.post("/api/airesp",AiRespController)
app.get("/api/history",GetChatHistory)


app.get("/api/chat",GetLastChat)
app.get("/api/resp",GetLastResp)
app.post("/api/generate",ReceiveChat)

app.listen(4000,()=>{
    console.log("Running in port 4000")
})