import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
//import { setupListeners } from '@reduxjs/toolkit/query/react';
import { cryptoAPI} from '../services/cryptoAPI';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
export default configureStore({
    reducer: {
        [cryptoAPI.reducerPath]: cryptoAPI.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(cryptoAPI.middleware , cryptoNewsApi.middleware),
});

//setupListeners(store.dispatch);