import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
// Corrected import path for your custom ErrorBoundary component
import ErrorBoundary from "./components/ErrorBoundary"; // <--- FIX: Changed to relative path and default import

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  // It's good to log an error here, but the ErrorBoundary will handle the UI if this throws.
  console.error("Clerk Publishable Key is missing! Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file.");
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* FIX: Removed the extra comma here */}
    </ClerkProvider>
  </ErrorBoundary>
);
