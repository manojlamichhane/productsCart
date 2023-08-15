import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import { OrdersProps } from "@/types";

interface OrdersState {
  loading: boolean;
  orders: OrdersProps[];
  error: string;
}

const initialState: OrdersState = {
  loading: true,
  orders: [],
  error: "",
};

export const fetchAllOrders = createAsyncThunk(
  "Orders/fetchAll",
  async (session: { user: { token: string; id: string } }, thunkAPI) => {
    const config = {
      headers: { Authorization: `Bearer ${session?.user.token}` },
    };
    try {
      const response = await axios.get(
        `https://${process.env.NEXT_PUBLIC_BASE_URL}/orders/${session?.user.id}`,
        config
      );
      return response.data.data.Orders;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.response.data.message });
    }
  }
);

export const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAllOrders.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(
      fetchAllOrders.fulfilled,
      (state, action: PayloadAction<OrdersProps[]>) => {
        // Add user to the state array
        state.loading = false;
        state.orders = [...action.payload];
        state.error = "";
      }
    );
    builder.addCase(
      fetchAllOrders.rejected,
      (state, action: PayloadAction<any>) => {
        // Add user to the state array
        state.loading = false;
        state.orders = [];
        // state.error = action.payload.error;
      }
    );
  },
});

export default orderSlice.reducer;
