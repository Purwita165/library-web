import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./out.css";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/queryClient";

// 🔔 import toaster
import { Toaster } from "sonner";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* 🔔 global toaster */}
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
