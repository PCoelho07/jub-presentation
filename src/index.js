import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/lato";
import "@fontsource/inter";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 0,
        padding: 0,
        backgroundColor: "#FAFAFB",
      },
    },
  },
  fonts: {
    heading: `"Inter", sans-serif`,
    body: `"Inter", sans-serif`,
  },
});

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
