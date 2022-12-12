import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Sort.module.sass';
import { changeSortProperty } from '../../redux/slices/sortSlice';
import { RootState } from '../../redux/store';

export type List = {
  name: string, sortProperty: string
}

export const list: List[] = [
  { name: 'Все', sortProperty: 'allTasks' },
  { name: 'Сделанные', sortProperty: 'doneTasks' },
  { name: 'Несделанные', sortProperty: 'undoneTasks' },
];


const Sort: React.FC = () => {
  const [isShowPanel, setIsShowPanel] = useState(false);
  const { sort } = useSelector((state: RootState) => state.sort);
  const dispatch = useDispatch()

  const activity = () => {
    setIsShowPanel(true);
  };

  const onClickListItem = (obj: List) => {
    dispatch(changeSortProperty(obj))
    setIsShowPanel(false);
  };

  return (
   <div className={styles.sortBlock}>
     <span className={styles.sortDesr} onClick={activity}>сортировка:</span>
     <span className={styles.sortDesr}>{sort.name}</span>
     {isShowPanel? (
       <div className={styles.sortChoose}>
         {list?.map((el, i) => (<span key={i} className={el.sortProperty === sort.sortProperty? styles.activity : styles.sortPropertyFront} onClick={() => onClickListItem(el)}>{el.name}</span>))}
       </div>
     ) : ('')}
   </div>
   )
}

export default Sort;