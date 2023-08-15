import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/Products/productsSlice";
import cartReducer from "./features/Products/cartSlice";
import authReducer from "./features/auth/userSlice";
import orderReducer from "./features/Products/orderSlice";

export const store = configureStore({
  reducer: {
    // states are accessed in useSelector using this name
    products: productsReducer,
    Cart: cartReducer,
    Auth: authReducer,
    Order: orderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
