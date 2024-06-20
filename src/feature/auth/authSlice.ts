import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginApi, signupApi,} from './authApi';
import { toast } from 'react-toastify';
import { LoginCredentials, SignuCredentials } from './authInterface';


interface AuthState {
  isAuthenticated: boolean;
  user:any;
 loading :boolean;
  signup:boolean;
  token:string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  signup:false,
  token : null,
  loading:false
};

export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials) => {
    return await loginApi(credentials);
  }
);

export const signupUserAsync = createAsyncThunk(
  'auth/signupUser',
  async (user: SignuCredentials) => {
    return await signupApi(user);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.isAuthenticated = false;
    },
    getToken:(state)=>{
      state.token = localStorage.getItem("token")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
       state.loading = true
      
      })
      .addCase(loginUserAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.loading = false
      })
      .addCase(signupUserAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(signupUserAsync.fulfilled, (state,action) => {
        state.loading = false
        toast.success("signup successfully")
        state.signup = true
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        
      })
      .addCase(signupUserAsync.rejected, (state) => {
       state.loading = false
      })
  },
});

export const { logout,getToken } = authSlice.actions;
export default authSlice.reducer;