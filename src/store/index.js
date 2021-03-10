import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "store/rootReducer";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

export { store };
