import { configureStore } from "@reduxjs/toolkit";
import { countryApiSlice } from "../features/country.slice";

export const store = configureStore({
    reducer: {
        [countryApiSlice.reducerPath]: countryApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(countryApiSlice.middleware);
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
