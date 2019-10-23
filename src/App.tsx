import React from "react";
import AppRouter from "./router";
import { Provider } from "react-redux";
import createStore from "./modules/Store";

const store = createStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
