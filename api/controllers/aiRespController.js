import { Ollama } from "@langchain/ollama";
import { db } from "../db.js";
import { query } from "express";
import { GetLastChatID } from "../utils/getLastChatID.js";





export const GenerateAiResp = async (req,res) =>{
    try{
        const chat = req.body?.message;
        //add chat to database
        // console.log(chat,"newchat")

        const add_chat_query = "insert into chats(`chat`) values (?)"
        
        db.query(add_chat_query,[chat],(err,data)=>{
            if(err){
                
                res.json(err)
            }
        })

        const chat_id =await GetLastChatID();
        console.log(chat_id,"chat_id")

        const llm = new Ollama({
            model: "llama3.1", 
            temperature: 0,
            maxRetries: 2,
            baseUrl: "http://localhost:11434",
        });
        const completion = await llm.invoke(chat);
        completion;
    //add resp to db
    const values = [completion,chat_id]
    const add_resp_query = "insert into resps(`resp`,`chat_id`) values (?)"

    db.query(add_resp_query,[values],(err,data)=>{
        if(err){
            console.log(err)
            res.json(err);
        }
        console.log("GENERATE DATA",data[0])
        // res.status(200).json(data[0])
        res.status(200).json(completion)
    })
    

    }catch(err){
        res.send(err)
    }
    
}

//
export const GetLastChat = async (req,res)=>{
    // const chat_id =await GetLastChatID();
    const query = "select `chat` from chats"
    db.query(query,(err,data)=>{
        if(err){
            // console.log("error",err)
            res.json("Error while retrieving messages",err)
        }
        // console.log(JSON.stringify(data))
        res.status(200).json(data);
    })

}


//

export const GetLastResp = async (req,res)=>{
    // const chat_id =await GetLastChatID();
    const query = "select `resp` from resps"
    db.query(query,(err,data)=>{
        if(err){
            
            res.json(err);
        }
        // console.log(data)
        res.status(200).json(data)
    })
}