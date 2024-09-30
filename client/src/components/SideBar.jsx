import { useEffect,useState } from "react"
import { getAllSessions, updateSessionId} from '../context&store/sessionSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function SideBar(){
    const dispatch = useDispatch();
    
    const title = useSelector((state)=>state.allSessions)
    
    const session = useSelector((state)=>state.session)
    const loading = useSelector((state)=>state.loading)
    useEffect(()=>{
      const GroupBySession  = ()=>{
        dispatch(getAllSessions());
        
      }
      GroupBySession();
    },[])
    const handleSession = (e) =>{
        e.preventDefault();
        console.log(e.target.value,"curvalue")
        dispatch(updateSessionId(e.target.value))
    }
    
    return (
        loading!==true?<div className="w-full h-[76vh] overflow-y-auto overflow-x-hidden flex-col space-y-3 pl-8">
        
            {
                title.map((val,index)=>{
                    return (
                        <div className="flex justify-start" key={`${Date.now()}+${index}`}>
                            <button className="text-white text-[15px] bg-transparent hover:bg-[#363636]" value={val.session_id} onClick={handleSession}>{val.session_id}</button>
                        </div>
                    )
                })
            }

        </div>:<div className="w-full h-[76vh] overflow-y-auto overflow-x-hidden flex-col space-y-3 pl-8">
        
        <div className="flex justify-start" >
                        <span className="text-white text-[15px] bg-transparent hover:bg-[#363636]" >Loading...</span>
                    </div>
    </div>
    )
}