import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThreeDProvider } from "./contexts/ThreeDContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThreeDProvider>
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <App />
      </Suspense>
    </ThreeDProvider>
  </React.StrictMode>
);
