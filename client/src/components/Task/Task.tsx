import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from './Task.module.sass';
import doneImg from '../../assets/done.png';
import deleteImg from '../../assets/delete.png';
import { deleteTask, getTasks } from '../../redux/slices/taskSlice';
import { isDoneTask } from '../../redux/slices/taskSlice';
import { RootState } from '../../redux/store';

interface taskSliceState {
  taskState: string[];
}

interface Task {
  id: number,
  title: string,
  user_id: number,
  updatedAt: string,
  createdAt: string,
  isDone: boolean | null,
}

const Task: React.FC = () => {
  const { taskState } = useSelector((state: RootState) => state.task);
  const { sort } = useSelector((state: RootState) => state.sort)
  const dispatch = useDispatch();
  const [check, setCheck] = useState<boolean>(false);

  const userJson = localStorage.getItem('auth');
  const parse = userJson !== null ? JSON.parse(userJson): '{}';
  const sortBy = sort.sortProperty;
 
  useEffect(() => {
    if (localStorage.getItem('auth')) {
    fetch(`http://localhost:3005/${sortBy}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(parse),
    }).then((res) => res.json()).then((data) => dispatch(getTasks(data))).catch((err) => alert(err));
  }
  }, [check, sortBy]);


  const clickIsDone = (id: number, isDone: boolean | null) => {
    fetch(`http://localhost:3005/done/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isDone }),
    }).then((res) => res.json()).then((data) => dispatch(isDoneTask(data)))
    window.scrollTo(0, document.body.scrollHeight);
    if (check === false) {
      return setTimeout(() => {
        setCheck(true)
      }, 500)
    } else { return setTimeout(() => {
      setCheck(false);
    }, 500) }
    
  }

  const clickDelete = (id: number, isDone: boolean | null) => {
    if (isDone === true) {
    fetch(`http://localhost:3005/delete/${id}`, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
    },
    }).then((res) => res.json()).then((data) => { 
      dispatch(deleteTask(data))
      if (check === false) {
        return setTimeout(() => {
          setCheck(true)
        }, 1000)
      } else { return setTimeout(() => {
        setCheck(false);
      }, 1000) }
    })
  } else {alert('Ваша задача не выполнена, вы не можете ее удалить')}
  }

  return (
    <div className={styles.container}>
    <div className={styles.mainBlock}>
      {taskState?.map((el) => (
        <div key={el.id} className={el.isDone !== true? styles.parentBlock : styles.parentBlockUndone}>
      <div className={styles.block} key={el.id}>
        <div>
          <span className={styles.blockText}>{el.title}
          </span>
          </div>
      </div>
      <div className={styles.blockDone}>
      {el.isDone !== true? (<img onClick={() => clickIsDone(el.id, el.isDone)} className={styles.doneImg} src={doneImg} alt="сделано изображение" />) : (<></>)}
      <img onClick={() => clickDelete(el.id, el.isDone)} className={styles.deleteImg} src={deleteImg} alt="удалить изображение" /></div>
      </div>
    ))}
    </div>
    </div>
  )
}

export default Task
