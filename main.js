import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import Counter from "./Counter.jsx";
import reducer from "./reducers";
import rootSaga from "./sagas";

// Create a Saga middleware with a list of Sagas to run
const sagaMiddleware = createSagaMiddleware();

// Connect the Saga middleware to the Redux store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const action = type => store.dispatch({ type });

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action("INCREMENT")}
      onDecrement={() => action("DECREMENT")}
      onIncrementAsync={() => action("INCREMENT_ASYNC")}
      onDecrementAsync={() => action("DECREMENT_ASYNC")}
    />,
    document.getElementById("root")
  );
}

render();

store.subscribe(render);
