import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store.ts';
import { useSelector } from 'react-redux';
import { UserType } from '@/app/types/auth.ts';

export type AuthState = {
  user: UserType;
  authenticated?: boolean;
  access_token?: string;
  refresh_token?: string;
};

const initialState: AuthState = {
  user: undefined as unknown as UserType,
  authenticated: false,
  access_token: '',
  refresh_token: '',
};

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setAuth(state: AuthState, action: PayloadAction<any>) {
      state.user = action.payload['user'];
      state.access_token = action.payload['access_token'];
      state.refresh_token = action.payload['refresh_token'];
      state.authenticated = true;
    },
    removeAuth(state: AuthState) {
      state.user = undefined as unknown as UserType;
      state.authenticated = false;
      state.access_token = undefined;
      state.refresh_token = undefined;
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;

export const useAuth = () => useSelector((state: RootState) => state.auth);

export default authSlice.reducer;
