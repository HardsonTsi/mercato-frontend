import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store.ts';
import { useSelector } from 'react-redux';
import { UserType } from '@/app/types/auth.ts';

export type AuthState = {
  user: UserType;
  authenticated?: boolean;
  token?: string;
  refresh_token?: string;
};

const initialState: AuthState = {
  user: undefined as unknown as UserType,
  authenticated: false,
  token: '',
};

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setAuth(state: AuthState, action: PayloadAction<any>) {
      state.user = action.payload['user'];
      state.token = action.payload['token'];
      state.authenticated = true;
    },
    removeAuth(state: AuthState) {
      state.user = undefined as unknown as UserType;
      state.authenticated = false;
      state.token = undefined;
    },
    refreshUser(state: AuthState, action: PayloadAction<any>) {
      console.log('paylaod', action.payload);
      state.user = action.payload;
    },
  },
});

export const { setAuth, removeAuth, refreshUser } = authSlice.actions;

export const useAuth = () => useSelector((state: RootState) => state.auth);

export default authSlice.reducer;
