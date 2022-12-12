import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type ParseType = {
  parse: {
    id: number,
    name: string,
  }
}

export type UserType = {
  parse: {
    id: number,
    name: string,
  }
}

export type TaskParams = {
  sortBy: string,
  parse: ParseType,
}

// export const fetchTodos = createAsyncThunk<ElType[], TaskParams>(
//   'task/fetchTodos',
//   async function ({parse, sortBy}, {rejectWithValue}) {
//     try {
//       if (localStorage.getItem('auth')) {
//         const responce = await fetch(`http://localhost:3005/${sortBy}`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//           body: JSON.stringify(parse),
//         })
//         if (responce.ok) {
//           const data = responce.json();
//           return data;
//         }
//       }
//     } catch (error) {
//       let errorMessage = "Failed to do something exceptional";
//       if (error instanceof Error) {
//         errorMessage = error.message;
//       }
//       return rejectWithValue(errorMessage);
//     }
//   }
// )

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface taskSliceState {
  taskState: ElType[];
  status: 'loading' | 'success' | 'error';
  error: any;
}

const initialState: taskSliceState = {
  taskState: [],
  status: Status.LOADING,
  error: '',
};

export type ElType = {
  id: number,
  title: string,
  isDone: boolean | null,
  user_id: number,
  createdAt: string,
  updatedAt: string,
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask: (state, action) => {
      state.taskState.push(action.payload);
  },
    getTasks: (state, action) => {
      state.taskState = action.payload;
  },
  isDoneTask: (state, action) => {
    state.taskState = state.taskState?.map((el) => {
      if (+el.id === +action.payload.id) {
        return { ...el, isDone: action.payload.isImportant }
      } return el
    })
  },
  deleteTask: (state, action) => {
    state.taskState = state.taskState.filter((el) => +el.id !== +action.payload)
  }
},
// extraReducers: (builder) => {
//   builder.addCase(fetchTodos.pending, (state) => {
//     state.taskState = [];
//     state.status = 'loading';
//   });

//   builder.addCase(fetchTodos.fulfilled, (state, action) => {
//     state.taskState = action.payload;
//     state.status = 'success';
//   });

//   builder.addCase(fetchTodos.rejected, (state, action) => {
//     state.status = 'error';
//     state.error = action.payload;
//   })
// }
});


export const {
  createTask, getTasks, isDoneTask, deleteTask
} = taskSlice.actions;

export default taskSlice.reducer;