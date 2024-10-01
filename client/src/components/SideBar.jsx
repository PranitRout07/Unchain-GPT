import { useEffect,useState } from "react"
import { getTodaySessions,getYesterdaySessions,getOneWeekSessions,getRestOfSessions, updateSessionId} from '../context&store/sessionSlice'
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment"

export default function SideBar({isChat}){
    const dispatch = useDispatch();
    
    const title = useSelector((state)=>state.allSessions)
    
    const session = useSelector((state)=>state.session)

    const todaySessions = useSelector((state)=>state.todaySessions)
    const yesterdaySessions = useSelector((state)=>state.yesterdaySessions)
    const oneWeekSessions = useSelector((state)=>state.oneWeekSessions)
    const restSessions = useSelector((state)=>state.restOfSessions)
    console.log(yesterdaySessions,oneWeekSessions,restSessions,"yesterday")
   
    const loading = useSelector((state)=>state.loading)
    useEffect(()=>{
      const GroupBySession  = ()=>{
        dispatch(getTodaySessions());
        dispatch(getYesterdaySessions());
        dispatch(getOneWeekSessions());
        dispatch(getRestOfSessions());
      }
      GroupBySession();
    },[isChat])
    const handleSession = (e) =>{
        e.preventDefault();
        console.log(e.target.value,"curvalue")
        dispatch(updateSessionId(e.target.value))
    }
    
    return (
        loading!==true?<div className="w-full h-[76vh] overflow-y-auto overflow-x-hidden flex-col space-y-3 pl-8">
           
           {/* today */}
            <div className="w-full h-auto overflow-y-auto overflow-x-hidden flex-col space-y-3"> 
                <div className="text-xl font-semibold text-white pt-1 pb-1 ">
                    Today
                </div>
                <div className="w-full h-auto overflow-y-auto overflow-x-hidden flex-col space-y-3">
                {
                todaySessions.length>0 && todaySessions.map((val,index)=>{
                        return (
                            <div className="flex justify-start" key={`${Date.now()}+${index}`}>
                                <button className="text-white text-[15px] bg-transparent hover:bg-[#363636] " value={val.session_id} onClick={handleSession}>{val.session_id}</button>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            {/* yesterday */}
            <div className="w-full h-auto overflow-y-auto overflow-x-hidden flex-col space-y-3">

            <div className="text-xl font-semibold text-white pt-1 pb-1">
                    Yesterday
                </div>
                <div className="w-full h-auto overflow-y-auto overflow-x-hidden flex-col space-y-3 "> 
            {
                yesterdaySessions.length>0 && yesterdaySessions.map((val,index)=>{
                        return (
                            <div className="flex justify-start" key={`${Date.now()}+${index}`}>
                                <button className="text-white text-[15px] bg-transparent hover:bg-[#363636] " value={val.session_id} onClick={handleSession}>{val.session_id}</button>
                            </div>
                        )
                    })
                }
                </div>
            </div>

            {/* last 7 days */}
            <div className="w-full h-auto overflow-y-auto overflow-x-hidden flex-col space-y-3">
            <div className="text-xl font-semibold text-white pt-1 pb-1">
                    Last 7 Days
                </div>
                <div className="w-full h-auto overflow-y-auto overflow-x-hidden flex-col space-y-3">
            {
                oneWeekSessions.length>0 && oneWeekSessions.map((val,index)=>{
                        return (
                            <div className="flex justify-start" key={`${Date.now()}+${index}`}>
                                <button className="text-white text-[15px] bg-transparent hover:bg-[#363636] " value={val.session_id} onClick={handleSession}>{val.session_id}</button>
                            </div>
                        )
                    })
            }
            </div>
            </div>
            {/* Rest */}
            <div className="w-full h-auto overflow-y-auto overflow-x-hidden flex-col space-y-3">
            <div className="text-xl font-semibold text-white pt-1 pb-1">
                    Rest
                </div>
                <div className="w-full h-auto overflow-y-auto overflow-x-hidden flex-col space-y-3">
            {
                restSessions.length>0 && restSessions.map((val,index)=>{
                        return (
                            <div className="flex justify-start" key={`${Date.now()}+${index}`}>
                                <button className="text-white text-[15px] bg-transparent hover:bg-[#363636] " value={val.session_id} onClick={handleSession}>{val.session_id}</button>
                            </div>
                        )
                })
            }
            </div>
            </div>

        </div>:<div className="w-full h-[76vh] overflow-y-auto overflow-x-hidden flex-col space-y-3 pl-8">
        
        <div className="flex justify-start" >
                        <span className="text-white text-[15px] bg-transparent hover:bg-[#363636]" >Loading...</span>
                    </div>
    </div>
    )
}