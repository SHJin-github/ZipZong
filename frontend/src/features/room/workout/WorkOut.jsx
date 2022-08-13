import React, { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Timeline } from "flowbite-react"
import TeachableMachine from "../teachableMachine/TeachableMachine"
import Timer from "./Timer"
import { TodoList } from "./TodoList"

function useTimeout(callback, delay) {
  const timeoutRef = useRef(null)
  const savedCallback = useRef(callback)
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  useEffect(() => {
    const tick = () => savedCallback.current()
    if (typeof delay === "number") {
      timeoutRef.current = window.setTimeout(tick, delay)
      return () => window.clearTimeout(timeoutRef.current)
    }
  }, [delay])
  return timeoutRef
}

const WorkOut = ({ myVideo, tmModel, user, finishExercise }) => {
  const exersiceRoutine = useSelector((state) => state.exercise.rotuineInfo)
  const { breakTime, exercise: exerciseInfos } = exersiceRoutine
  const routine = useRef([])

  const [currentAction, setCurrentAction] = useState({
    type: "ready",
    duration: 3,
  })

  const [resultList, setResultlist] = useState()

  const [isRunning, setRunning] = useState(true)

  const routineIdx = useRef(0)
  useEffect(() => {
    let todo = []
    console.log("운동 시작 mounted")
    exerciseInfos.forEach((info) => {
      todo.push({
        type: "exercise",
        duration: 5,
        name: info.name,
        goal: info.count,
        success: 0,
      })
      // todo.push({ type: "breaktime", duration: breakTime })
      todo.push({ type: "breaktime", duration: 2 })
    })
    todo.pop()

    routine.current = todo
    console.log(routine)
    changeResList()
  }, [])

  const countePreExercise = useRef(0)

  const changeNextAction = () => {
    const nextAction = routine.current[routineIdx.current]
    // addSuccessCount(routineIdx.current)
    // changeResList()
    routineIdx.current++
    // console.log("다음 동작", nextAction, routineIdx)
    setCurrentAction(nextAction)
  }
  const finishAction = () => {
    // setRunning(false)
  }

  const updateSuccess = (count) => {
    // console.log("루틴idx:", routineIdx.current, "운동 동작 끝! 횟수:", count)
    const idx = routineIdx.current - 1
    routine.current[idx].success = count
    // changeResList()
    console.log(routine.current)
    countePreExercise.current = 0
  }

  const changeResList = () => {
    const list = routine.current.map((info, idx) => {
      if (info.type === "breaktime") return <div key={idx}></div>
      return (
        <div key={idx}>
          {info.name} /목표 :{info.goal} / 성공 : {info.success}
          <br />
        </div>
      )
    })

    setResultlist(list)
  }

  useEffect(() => {
    if (!isRunning && routineIdx.current < routine.current.length) {
      // console.log("루틴 인덱스", routineIdx.current)
      changeNextAction()
      setRunning(true)
    } else if (!isRunning && routineIdx.current === routine.current.length) {
      // console.log("운동 루틴 종료!!!!!!")
      finishExercise(routine.current)
    }
  }, [isRunning])

  useEffect(() => {
    changeResList()
  }, [currentAction])
  return (
    <div>
      {isRunning && (
        <Start
          myVideo={myVideo}
          action={currentAction}
          changeAction={changeNextAction}
          finishAction={finishAction}
          tmModel={tmModel}
          updateSuccess={updateSuccess}
          user={user}
        />
      )}
      {/* {isRunning &&( */}
      <div className="absolute z-50 bottom-0 ml-2">
        <TodoList />
      </div>
    </div>
  )
}

const Start = ({
  myVideo,
  action,
  changeAction,
  finishAction,
  tmModel,
  updateSuccess,
  user,
}) => {
  console.log("현재 동작 정보", action)

  useTimeout(() => {
    // console.log("시간 종료 ")
    finishAction()
  }, action.duration * 1000)
  useEffect(() => {
    return () => {
      // console.log("현재 동작  Unmount")
    }
  }, [])

  // console.log("MY VIDEO ", myVideo)
  return (
    <div>
      <div className="w-full h-full absolute">
        {/* {action.type === "exercise" && (
          <TeachableMachine
            myVideoRef={myVideo.props.myVideoRef}
            tmModel={tmModel}
            updateSuccess={updateSuccess}
            user={user}
            actionName={action.name}
          />
        )} */}
        {<Timer action={action} />}
        {!!action && (
          <div className="absolute top-0 bg-white z-50">
            현재 운동:{action?.name ?? "휴식"}, 시간:{action.duration}
          </div>
        )}
      </div>
    </div>
  )
}
export default WorkOut
