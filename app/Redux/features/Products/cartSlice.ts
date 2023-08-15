import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  loading: boolean;
  products: Product[];
  error: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity: number;
}

const initialState: CartState = {
  loading: true,
  products: [],
  error: "",
};

// this function creates a action type of Auth/fetchToken that returns a payload after calling the API

export const addProduct = createAsyncThunk<Product, string>(
  "Carts/addProduct",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`
      );
      return response.data.data.Product;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.response.data.message });
    }
  }
);

export const increaseQuantity = createAsyncThunk<Product, string>(
  "Carts/increaseQuantity",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`
      );
      return response.data.data.Product;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.response.data.message });
    }
  }
);
export const decreaseQuantity = createAsyncThunk<Product, string>(
  "Carts/decreaseQuantity",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`
      );
      return response.data.data.Product;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.response.data.message });
    }
  }
);
export const deleteProduct = createAsyncThunk<Product, string>(
  "Carts/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`
      );
      return response.data.data.Product;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.response.data.message });
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(addProduct.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = false;
      // check if the product from action payload exists in state

      const existingProduct = state.products.find(
        (item: { _id: string }) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity = existingProduct.quantity + 1;
        state.products = [...state.products];
      } else {
        const tempProduct = { ...action.payload, quantity: 1 };
        state.products = [...state.products, tempProduct];
      }
      state.error = "";
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.products = [];
      // state.error = action.payload.error;
    });

    builder.addCase(
      increaseQuantity.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Add user to the state array
        state.loading = false;

        const tempProduct = state.products.find(
          (item) => item._id === action.payload._id
        );

        if (tempProduct) {
          tempProduct.quantity = tempProduct.quantity + 1;
        }
        state.products = [...state.products];
        state.error = action.payload.error;
      }
    );

    builder.addCase(
      decreaseQuantity.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Add user to the state array
        state.loading = false;

        const tempProduct = state.products.find(
          (item: Product) => item._id === action.payload._id
        );
        if (tempProduct) {
          tempProduct.quantity = tempProduct.quantity - 1;
          if (tempProduct.quantity == 0) {
            // remove product from the cart
            const tempProduct = state.products.filter(
              (item: Product) => item._id !== action.payload._id
            );
            state.products = [...tempProduct];
          } else {
            state.products = [...state.products];
          }
        }

        state.error = action.payload.error;
      }
    );

    builder.addCase(
      deleteProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Add user to the state array
        state.loading = false;

        // remove product from the cart
        const tempProduct = state.products.filter(
          (item: Product) => item._id !== action.payload._id
        );
        state.products = [...tempProduct];
        state.error = action.payload.error;
      }
    );
  },
});

export default cartSlice.reducer;
