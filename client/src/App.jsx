import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import SideBar from './components/SideBar'
import Markdown from 'react-markdown'
import close from '/close.svg'
import plus from '/plus.svg'
import { getAllSessions,createSession } from './context&store/sessionSlice'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const [count, setCount] = useState(0)

  const [hideSideBar,setHideSideBar] = useState(false)

  const dispatch = useDispatch()

  const [isCurChat,setIsCurChat] = useState(false)
  const [isResp,setIsResp] = useState(false)
  const [storeChat,setStoreChat] = useState([])
  const [storeResp,setStoreResp] = useState([])
  // const [session,setSession] = useState('3afff817-ff92-4373-be9d-dbbad9cf2e38')

  const session = useSelector((state)=>state.session)
  const [curChat,setCurChat] = useState('')
  const [response,setResponse] = useState('')


  useEffect(()=>{
    const storeChat = async ()=>{
      const res = await axios.get(`/api/chat/${session}`)
      console.log(res)
      setStoreChat(res.data)
    }
    storeChat();
    setIsCurChat(false)
  },[isCurChat,session])

  useEffect(()=>{
    const storeResp = async()=>{
      const res = await axios.get(`/api/resp/${session}`)
      setStoreResp(res.data)
      setIsResp(false)
    }
    storeResp()
  },[isResp,session])



  // console.log(storeChat,storeResp)




  const sendChat = async(e) =>{
    e.preventDefault();
    setIsCurChat(true);
    const resp = await axios.post("/api/generate",{"message":curChat,"session_id":session})
    setIsResp(true)
    setResponse(resp.data)
  }

const curSessionId = useSelector((state)=>state.session)
const handleNewSession = async (e)=>{
  e.preventDefault();
  //axios req will be send to create a new session and store the chats and responses using this session.
  // const res = await axios.post("/api/newsession")
  dispatch(createSession());
  
  // setSession(curSessionId);
  
}

  const handleOnClick = (e) =>{
    e.preventDefault();
    setHideSideBar(!hideSideBar)
  
  
//generate a new session on click
//in that moment other functions are also affected like each get function will now get the data from the new session new session is send through the body.

  
  }
  return (
    <div className='bg-transparent overflow-y-hidden w-full h-screen flex '>
      

    {/* sidebar (it can be hidden)*/}
    {hideSideBar===false?<div className='transition-all duration-300 ease-in-out w-[40%] sm:w-[35%] md:w-[30%] lg:w-[23%] xl:w-[15%] 2xl:[15%] min-h-[100%] bg-[#202020] overflow-hidden flex-col'>

      {/* here is gap */}
      <div className='w-full min-h-[8%] flex justify-center items-center bg-[#202020]'>
      {hideSideBar!==true?<div className='w-full flex justify-between items-end pl-8 pr-6'>

          <button onClick={handleOnClick} className='text-white bg-[#202020] transition-all duration-300 hover:scale-105 '> 
              <img className='h-5 w-5 ' src={close}/>
          </button>

          <button onClick={handleNewSession} className='text-white bg-[#202020] transition-all duration-300 hover:scale-105 '> 
              <img className='h-5 w-5 ' src={plus}/>
          </button>
          
      </div>:""}



        {/* <div className='flex justify-between space-x-2'>
          <div className='pr-1'>
            <img className='w-6 h-6' src="/explore.png"/>
          </div>

          <div>
            <span className='text-white font-semibold text-[15px]'>Explore Models</span>
          </div>
        </div> */}



      </div>
    

      <div className='h-full overflow-y-auto w-full overflow-x-hidden'>
      
        <SideBar/>
      </div>


    </div>:""}



    {/* main body where all chat and ai responses will be shown */}
   <div className={ `transition-all duration-300 ease-in-out flex-1 min-h-screen relative`}>


      {/* intro */}
      <div className='w-full min-h-[8%] flex justify-center items-center bg-[#1c1c1c]'>
   

        
      <div className='absolute left-6'>
      {hideSideBar===true?<div className='w-full flex justify-start gap-4'><button onClick={handleOnClick} className='text-white p-2 bg-[#1c1c1c] transition-all duration-300 hover:scale-105 '> <img className='h-5 w-5 ' src={close}/></button>
        <button onClick={handleNewSession} className='text-white bg-[#202020] transition-all duration-300 hover:scale-105 '> 
              <img className='h-5 w-5 ' src={plus}/>
        </button>
      
      </div>:""}
      </div>


        <div className='text-2xl font-sans font-semibold text-white'>
          <h1>Unchain-GPT</h1>
        </div>

        <div className='absolute right-6 '>
          <select className='pl-3 pr-3 pt-[5px] pb-[5px] text-[17px] font-semibold outline-none shadow-lg rounded-lg'>
            <option>llama3.1</option>
            <option>mistral</option>
            <option>dolphin-phi</option>
          </select>
      </div>

      </div>

      {/* main body */}
      <div className='w-full h-[77vh] overflow-y-scroll'>


      {
        storeChat.length>0 && storeChat.map((chat,index)=>{
          return (
           
            <div key={index}>
            <div className='flex justify-center w-full pt-8 pb-8 overflow-x-hidden'>
        <p className='w-[56%] overflow-x-hidden text-white text-[18px] p-5 rounded-3xl bg-[#303030]' > {storeChat[index].chat}
        </p>
      </div>
  {storeResp.length>index?<div className='flex justify-center w-full pt-8 pb-8 overflow-x-hidden'>
    <Markdown className='w-[56%] overflow-x-hidden text-white text-[18px] bg-transparent'>
      {storeResp[index].resp}
    </Markdown>
  </div>:<div className='flex justify-center w-full pt-8 pb-8 overflow-x-hidden'>
            <p className='text-white text-[16px]'>Loading...</p>
          </div>}
        </div>


          )
        })
      }

      </div>

      {/* fixed div at the bottom of the page which doesnot need to move */}
      <div className='w-full flex justify-center absolute bottom-10 '>
        
        <input placeholder='Message Unchain-GPT' className='p-4 bg-[#303030] w-[56%] text-[16px] text-white rounded-full outline-none' value={curChat} onChange={(e)=>{setCurChat(e.target.value)}}  />

        <div className='flex justify-center'>
          <button className='hover:scale-105 shadow-lg' onClick={sendChat}><img src="/send.svg" className='h-9 w-10 bg-white p-2 rounded-full'/></button>
        </div>
      </div>



    </div>

    </div>
  )
}

export default App
