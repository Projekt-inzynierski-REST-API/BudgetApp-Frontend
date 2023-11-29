import React from "react";
import App from "./views/App";
import { createRoot } from "react-dom/client";

const root = document.getElementById("root");
const rootElement = createRoot(root);
rootElement.render(<App />);
