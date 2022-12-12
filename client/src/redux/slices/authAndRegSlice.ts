import { createSlice } from '@reduxjs/toolkit';
import { getAuthState } from '../../utils/getAuthState';

const { auth } = getAuthState();


interface AuthSliceState {
  regAndAuthState: {
    id: number,
    name: string | null,
  }
}

const initialState: AuthSliceState = {
  regAndAuthState: auth,
};

export const authAndRegSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authUser: (state, action) => {
      state.regAndAuthState = action.payload;
  },
  authLogout: (state) => {
    state.regAndAuthState = null as any
  }
}
});


export const {
  authUser, authLogout
} = authAndRegSlice.actions;

export default authAndRegSlice.reducer;