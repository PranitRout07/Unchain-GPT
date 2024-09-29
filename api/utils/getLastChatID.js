import { db } from "../db.js";

export const GetLastChatID = async ()=>{
    const query = "select `id` from chats ORDER BY `id` DESC LIMIT 1"
    return new Promise((resolve, reject) => {
        db.query(query, (err, data) => {
            if (err) {
                console.log("error",err);
                reject(err); 
            } else {
                resolve(data[0]?.id); 
            }
        });
    });
}