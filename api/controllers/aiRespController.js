import { Ollama } from "@langchain/ollama";
import { db } from "../db.js";
import { query } from "express";
import { GetLastChatID } from "../utils/getLastChatID.js";
import { v4 as uuidv4 } from 'uuid';




export const GenerateAiResp = async (req,res) =>{
    try{
        const chat = req.body?.message;
        const session_id = req.body?.session_id
        //add chat to database
        // console.log(chat,"newchat")

        const add_chat_query = "insert into chats(`chat`,`session_id`) values (?)"
        const val = [chat,session_id]
        db.query(add_chat_query,[val],(err,data)=>{
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
    const values = [completion,chat_id,session_id]
    const add_resp_query = "insert into resps(`resp`,`chat_id`,`session_id`) values (?)"

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
    const session_id = req.params.session_id
    // console.log(session_id)
    const query = "select `chat` from chats where `session_id` = ?"
    db.query(query,[session_id],(err,data)=>{
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
    const session_id = req.params.session_id    // console.log(req.body)
    const query = "select `resp` from resps where `session_id` = ?"
    db.query(query,[session_id],(err,data)=>{
        if(err){
            
            res.json(err);
        }
        // console.log(data)
        res.status(200).json(data)
    })
}



export const GenerateNewSession = async (req,res)=>{
    const new_session_id = uuidv4();
    res.status(201).json(new_session_id)
}

export const GroupBySession = async (req,res)=>{
    const query = "SELECT `session_id`, DATE(MAX(`create_time`)) AS date FROM chats GROUP BY `session_id` ORDER BY MAX(`create_time`) DESC"
    db.query(query,(err,data)=>{
        if(err){
            console.log(err,"error while grouping by sessions")
        }
        console.log("data after group by:-",data)
        res.status(200).json(data)
    })
}