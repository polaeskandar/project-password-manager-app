import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import router from "./Router";
import store from "./Store";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
