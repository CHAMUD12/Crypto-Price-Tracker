import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import cryptoReducer from "../features/cryptoSlice";
import favoritesReducer from "../features/favoritesSlice";

// Configure persist for favorites only
const favoritesPersistConfig = {
    key: "favorites",
    storage,
    whitelist: ["favoriteIds"], // only favoriteIds will be persisted
};

const persistedFavoritesReducer = persistReducer(favoritesPersistConfig, favoritesReducer);

// Create root reducer
const rootReducer = combineReducers({
    crypto: cryptoReducer,
    favorites: persistedFavoritesReducer,
});

// Create store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"],
            },
        }),
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
