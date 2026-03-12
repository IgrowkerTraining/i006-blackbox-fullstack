import React from "react";
import ReactDOM from "react-dom/client";
import "./src/styles/theme.css";
import App from "./App";
import { PostHogProvider } from "posthog-js/react";

const posthogOptions = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  // Descomentar esto durante el desarrollo si quieres ver los logs de PostHog en consola:
  // loaded: (posthog) => {
  //   if (import.meta.env.DEV) posthog.debug()
  // }
};

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={posthogOptions}>
      <App />
    </PostHogProvider>
  </React.StrictMode>,
);
