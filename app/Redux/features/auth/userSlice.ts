import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  token?: string;
}
interface payloadProps {
  token: string;
  name: string;
  email: string;
}

interface userState {
  loading: boolean;
  status: string;
  error: string;
}

const initialState: userState = {
  loading: true,
  status: "",
  error: "",
};

// this function creates a action type of Auth/fetchToken that returns a payload after calling the API

export const signUp = createAsyncThunk<any, User>(
  "Users/signUp",
  async (data, thunkAPI) => {
    try {
      const body = {
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.confirmPassword,
      };
      const response = await axios.post(
        `https://${process.env.NEXT_PUBLIC_BASE_URL}/users/signup`,
        body
      );
      return response.data.status;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.response.data.message });
    }
  }
);

export const UpdateMe = createAsyncThunk<any, payloadProps>(
  "Users/Update",
  async (payload: payloadProps, thunkAPI) => {
    try {
      const body = {
        name: payload.name,
        email: payload.email,
      };

      const config = {
        headers: { Authorization: `Bearer ${payload?.token}` },
      };

      await axios.patch(
        `https://${process.env.NEXT_PUBLIC_BASE_URL}/users/updateMyData`,
        body,
        config
      );
      // return response.data.status;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.response.data.message });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signUp.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = false;
      // check if the product from action payload exists in state
      state.status = action.payload;
      state.error = "";
    });
    builder.addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
      // Add user to the state array
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(UpdateMe.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(UpdateMe.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = false;
      // check if the product from action payload exists in state
      state.error = "";
    });
    builder.addCase(UpdateMe.rejected, (state, action: PayloadAction<any>) => {
      // Add user to the state array
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

export default authSlice.reducer;
