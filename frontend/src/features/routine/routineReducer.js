import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../api/axios"

// 그룹 루틴 가져오기
export const getRoutine = createAsyncThunk(
  "routine/detail",
  async (groupId) => {
    const res = await http.get(`routine/detail/${groupId}`)
    console.log("그룹 루틴 조회", res.data)
    return res.data
  }
)

// 루틴 생성
export const createRoutine = createAsyncThunk("routine/", async (info) => {
  const res = await http.post(`routine/${info.groupId}`, info.routine)
  console.log("그룹 루틴 생성", res.data)
})

// 루틴 수정
export const modifyRoutine = createAsyncThunk("routine/", async (info) => {
  const res = await http.put(`routine/${info.routineId}`, info.routine)
  console.log("그룹 루틴 수정", res.data)
})

// 루틴 삭제
export const deleteRoutine = createAsyncThunk("routine/", async (routineId) => {
  const res = await http.delete(`routine/${routineId}`)
  console.log("그룹 루틴 삭제", res.data)
})

export const routineSlice = createSlice({
  name: "routine",
  initialState: {
    routines: [
      {
        routineId: 52156,
        routineName: "슬기세트",
        exercise: [
          { name: "PUSHUP", count: 5 },
          { name: "PUSHUP", count: 5 },
        ],
        breaktime: 60,
        totaltime: 300,
      },
      {
        routineId: 1324,
        routineName: "종민세트",
        exercise: [
          { name: "BURPEE", count: 5 },
          { name: "BURPEE", count: 5 },
          { name: "BURPEE", count: 5 },
          { name: "BURPEE", count: 5 },
        ],
        breaktime: 60,
      },
      {
        routineId: 245634,
        routineName: "준우세트",
        exercise: [
          { name: "LEGRAISE", count: 5 },
          { name: "LEGRAISE", count: 5 },
          { name: "LEGRAISE", count: 5 },
          { name: "LEGRAISE", count: 5 },
          { name: "LEGRAISE", count: 5 },
          { name: "LEGRAISE", count: 5 },
        ],
        breaktime: 60,
      },
      {
        routineId: 3123,
        routineName: "승주세트",
        exercise: [
          { name: "PUSHUP", count: 5 },
          { name: "PUSHUP", count: 5 },
          { name: "PUSHUP", count: 5 },
          { name: "PUSHUP", count: 5 },
        ],
        breaktime: 60,
      },
    ],
  },
  reducers: {},
})

export default routineSlice.reducer
