import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./state/store";
import "./bootstrap.css";
import "./index.css"; // boostrap Yeti

// import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
