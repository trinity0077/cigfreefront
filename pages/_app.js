import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header';

import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import user from '../reducers/user';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const reducers = combineReducers({ user });
const persistConfig = { key: 'cigfree', storage: createWebStorage('local') };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Cigfree</title>
        </Head>
        <Header />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
