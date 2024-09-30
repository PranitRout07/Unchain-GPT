import { createAsyncThunk, createSlice, isPending} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    session:'3afff817-ff92-4373-be9d-dbbad9cf2e38',
    allSessions:[],
    loading:true
}

export const getAllSessions=  createAsyncThunk("getAllSessions",async()=>{
    const res = await axios.get("/api/sessions")
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
        builder.addCase(getAllSessions.fulfilled,(state,action)=>{
            state.loading = false
            state.allSessions = action.payload;
        }),
        builder.addCase(createSession.fulfilled,(state,action)=>{
            state.session = action.payload;
        }),
        builder.addCase(getAllSessions.pending,(state,action)=>{
            state.loading = true
        })
    }
})

export const {updateSessionId} = sessionSlice.actions
export default sessionSlice.reducer