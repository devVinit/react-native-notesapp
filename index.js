import React from "react";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

const MyApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

registerRootComponent(MyApp);
