import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { JobProvider } from "./contexts/JobContext.jsx";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <JobProvider>
      <App />
    </JobProvider>
  </BrowserRouter>
);
