import express from "express"

import { db } from "./db.js";
import { GenerateAiResp, GetLastChat, GetLastResp} from "./controllers/aiRespController.js";
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to db!");
});

const app = express();
app.use(express.json());




app.get("/api/chat",GetLastChat)
app.get("/api/resp",GetLastResp)
app.post("/api/generate",GenerateAiResp)

app.listen(4000,()=>{
    console.log("Running in port 4000")
}) 