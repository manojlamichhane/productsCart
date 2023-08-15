import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "@/types";

interface ProductsState {
  loading: boolean;
  products: ProductProps[];
  selectedProduct: any;
  stats: [];
  error: string;
}

const initialState: ProductsState = {
  loading: true,
  products: [],
  selectedProduct: {},
  stats: [],
  error: "",
};

// this function creates a action type of Auth/fetchToken that returns a payload after calling the API

export const fetchById = createAsyncThunk<
  // Return type of the payload creator means this function will return product with productprops as type
  ProductProps,
  // First argument to the payload creator like productId
  string
>("Product/fetchById", async (productId: string, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}`
    );
    return response.data.data.Product;
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ error: err.response.data.message });
  }
});

export const fetchAll = createAsyncThunk<ProductProps[], string>(
  "Products/fetchAll",
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://${process.env.NEXT_PUBLIC_BASE_URL}/products${query}`
      );
      return response.data.data.Products;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.response.data.message });
    }
  }
);

export const fetchStat = createAsyncThunk(
  "Products/fetchStat",
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://${process.env.NEXT_PUBLIC_BASE_URL}/products/stats`
      );
      return response.data.data.stat;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.response.data.message });
    }
  }
);

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAll.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(
      fetchAll.fulfilled,
      (state, action: PayloadAction<ProductProps[]>) => {
        // Add user to the state array
        state.loading = false;
        state.products = [...action.payload];
        state.error = "";
      }
    );
    builder.addCase(fetchAll.rejected, (state, action: PayloadAction<any>) => {
      // Add user to the state array
      state.loading = false;
      state.products = [];
      state.error = action.payload.error;
    });

    builder.addCase(fetchStat.fulfilled, (state, action: PayloadAction<[]>) => {
      // Add user to the state array
      state.loading = false;
      state.products = [];
      state.stats = [...action.payload];
      state.error = "";
    });
    builder.addCase(fetchById.pending, (state, action: PayloadAction<any>) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(fetchById.fulfilled, (state, action: PayloadAction<{}>) => {
      // Add user to the state array
      state.loading = false;
      state.products = [];
      state.selectedProduct = { ...action.payload };
      state.stats = [];
      state.error = "";
    });
    builder.addCase(fetchById.rejected, (state, action: PayloadAction<any>) => {
      // Add user to the state array
      state.loading = false;
      state.products = [];
      state.error = action.payload.error;
    });
  },
});

export default productsSlice.reducer;
