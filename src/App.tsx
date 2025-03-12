import { Provider } from "react-redux";
import {persistor, store} from "./store";
import Home from "./pages/Home";
import {PersistGate} from "redux-persist/integration/react";

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Home />
            </PersistGate>
        </Provider>
    );
};

export default App;
