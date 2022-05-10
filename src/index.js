import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <React.Suspense fallback={<div>Loading</div>}>
        <App />
      </React.Suspense>
    </QueryClientProvider>
  </React.StrictMode>
);
