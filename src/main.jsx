import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/AuthProvider.jsx";

const Root = ReactDOM.createRoot(document.getElementById("root"));

Root.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </>,
);
