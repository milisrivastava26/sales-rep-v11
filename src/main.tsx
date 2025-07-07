import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import store from "./store/index.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
);
