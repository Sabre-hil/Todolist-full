import React, { FormEvent, ChangeEvent ,useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Task from '../Task/Task'
import { createTask } from '../../redux/slices/taskSlice'
import styles from './Main.module.sass'
import { RootState } from '../../redux/store';


const Main: React.FC = () => {
  const { regAndAuthState } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const [taskInputState, setTaskInputState] = useState({title: ''})
  const inputRef = useRef<HTMLInputElement>(null);
  
  const changeHandler = (e: ChangeEvent) => {
    setTaskInputState((prev) => ({
      ...prev,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
    }))
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    const responce = await fetch('http://localhost:3005/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(taskInputState)
    })
    if (responce.ok) {
      const data = await responce.json()
      dispatch(createTask(data))
      window.scrollTo(0, document.body.scrollHeight)
      if (inputRef.current) {
        inputRef.current.value = ""
        inputRef.current?.focus()
      }   
    }
  }

  return (
    <div>
      {regAndAuthState
        ? (
        <div>
          <form className={styles.formBlock} onSubmit={submitHandler}>
            <div>
              <input ref={inputRef} className={styles.input} onChange={changeHandler} type="text" placeholder="Enter your task" name="title" />
            </div>
            <div>
              <button className={styles.button} type="submit">Записать</button>
            </div>
          </form>
          <div>
            <Task />
          </div>
        </div>
          )
        : (
        <div className={styles.blockGreetings}>
          <div className={styles.greetings}>Сохраняй свои мечты вместе с нами</div>
        </div>
          )}

    </div>
  )
}

export default Main
