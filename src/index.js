import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { WithSearch } from "@elastic/react-search-ui";

const root = createRoot(document.getElementById("root"));
root.render(
  <Theme accentColor="ruby">
    <App />
  </Theme>
);
