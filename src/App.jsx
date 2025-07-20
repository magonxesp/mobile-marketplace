import "./App.css";
import DefaultLayout from "@/layout/DefaultLayout";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 3600000, // 1 hour
    },
  },
});

const localStoragePersister = createAsyncStoragePersister({
  storage: {
    getItem: async (key) => window.localStorage.getItem(key),
    setItem: async (key, value) => window.localStorage.setItem(key, value),
    removeItem: async (key) => window.localStorage.removeItem(key)
  },
});

export default function App() {
  return (
    <PersistQueryClientProvider 
      client={queryClient}
      persistOptions={{ persister: localStoragePersister }}
    >
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="product/:productId" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PersistQueryClientProvider>
  );
}
