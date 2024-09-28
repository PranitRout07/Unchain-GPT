import { Ollama } from "@langchain/ollama";
import { db } from "../db.js";
import { query } from "express";
import { GetLastChatID } from "../utils/getLastChatID.js";


export const AiRespController = async (req,res) =>{
    
    const chat = req.body.message;
    try{
        const llm = new Ollama({
            model: "llama3.1", // Default value
            temperature: 0,
            maxRetries: 2,
            baseUrl: "http://localhost:11434",
        });
        const completion = await llm.invoke(chat);
        completion;

        // console.log(completion)
        const query = "insert into chatandresp(`chat`,`resp`) values (?)"
        const values = [chat,completion]

       db.query(query,[values],(err,data)=>{
            if(err){
                return res.json("error while adding to database",EvalError)
            }

            res.status(200).send(`${JSON.stringify(completion)}`);
        })

        }catch(error){
            res.send("Error while invoking",error)
        }
    
}


export const GetChatHistory = async (req,res)=>{
    const query = "select `chat`,`resp` from chatandresp"
    
    const id =await GetLastChatID();
    console.log(id)
    db.query(query,(err,data)=>{
        if(err){
            console.log(err)
        }
        res.status(200).json(data)
    })
}
















export const ReceiveChat = async (req,res) =>{
    try{
        const chat = req.body?.message;
        //add chat to database

        const add_chat_query = "insert into chats(`chat`) values (?)"
        
        db.query(add_chat_query,[chat],(err,data)=>{
            if(err){
                res.json(err)
            }
        })

        const chat_id =await GetLastChatID();

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
    const query = "select `chat` from chats where id = ?"
    db.query(query,chat_id,(err,data)=>{
        if(err){
            res.send("Error while retrieving messages",err)
        }
        res.status(200).json(data[0]);
    })

}


//

export const GetLastResp = async (req,res)=>{
    const chat_id =await GetLastChatID();
    const query = "select `resp` from resps where `chat_id`= ? "
    db.query(query,[chat_id],(err,data)=>{
        if(err){
            res.json(err);
        }
        res.status(200).json(data[0])
    })
}