import { createAsyncThunk, createSlice, isPending} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    session:'3afff817-ff92-4373-be9d-dbbad9cf2e38',
    todaySessions:[],
    yesterdaySessions:[],
    oneWeekSessions:[],
    restOfSessions:[],
    loading:true
}

export const getTodaySessions=  createAsyncThunk("getTodaySessions",async()=>{
    const res = await axios.get("/api/sessions/today")
    return res.data;
})

export const getYesterdaySessions =  createAsyncThunk("getYesterdaySessions",async()=>{
    const res = await axios.get("/api/sessions/yesterday")
    return res.data;
})

export const getOneWeekSessions =  createAsyncThunk("getOneWeekSessions",async()=>{
    const res = await axios.get("/api/sessions/oneweek")
    return res.data;
})

export const getRestOfSessions=  createAsyncThunk("getRestOfSessions",async()=>{
    const res = await axios.get("/api/sessions/rest")
    return res.data;
})

export const createSession = createAsyncThunk("createSession",async()=>{
    const res = await axios.post("/api/newsession")
    return res.data;
})
export const sessionSlice = createSlice({

    name:'session',
    initialState,
    reducers:{
        updateSessionId : (state,action)=>{
            state.session = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getTodaySessions.fulfilled,(state,action)=>{
            state.loading = false
            state.todaySessions = action.payload;
        }),
        builder.addCase(getYesterdaySessions.fulfilled,(state,action)=>{
            state.loading = false
            state.yesterdaySessions = action.payload;
        }),
        builder.addCase(getOneWeekSessions.fulfilled,(state,action)=>{
            state.loading = false
            state.oneWeekSessions = action.payload;
        }),
        builder.addCase(getRestOfSessions.fulfilled,(state,action)=>{
            state.loading = false
            state.restOfSessions = action.payload;
        }),
        builder.addCase(createSession.fulfilled,(state,action)=>{
            state.session = action.payload;
        }),
        builder.addCase(getTodaySessions.pending,(state,action)=>{
            state.loading = true
        }),
        builder.addCase(getYesterdaySessions.pending,(state,action)=>{
            state.loading = true
        }),
        builder.addCase(getOneWeekSessions.pending,(state,action)=>{
            state.loading = true
        }),
        builder.addCase(getRestOfSessions.pending,(state,action)=>{
            state.loading = true
        })
    }
})

export const {updateSessionId} = sessionSlice.actions
export default sessionSlice.reducer