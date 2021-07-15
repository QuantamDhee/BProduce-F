import { createStore } from "redux";
import itemsReducer from "./Reducers/itemsReducer";

export default createStore(
  itemsReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);