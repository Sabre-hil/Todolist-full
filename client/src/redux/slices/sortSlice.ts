import { createSlice } from '@reduxjs/toolkit';

export enum SortPropertyEnum {
  ALL = 'allTasks',
  DONE = 'doneTasks',
  UNDONE = 'undoneTasks',
}

interface sortSliceState {
  sort: {
    name: string,
    sortProperty: string
  }
}

const initialState: sortSliceState = {
  sort: { name: 'Все', sortProperty: SortPropertyEnum.ALL },
};


export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    changeSortProperty: (state, action) => {
      state.sort = action.payload;
    }
}
});


export const { changeSortProperty } = sortSlice.actions;

export default sortSlice.reducer;