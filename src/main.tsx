import ReactDOM from "react-dom/client";
import { App } from "app";
import { allProviders, GlobalProvider } from "app/providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GlobalProvider providers={allProviders}>
    <App />
  </GlobalProvider>,
);
