import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { INVITE } from "./constants";
import "./index.css";

document.title = `${INVITE.businessName} has given you access to their business on Facebook`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
