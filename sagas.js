import { delay } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";

// Hello saga example
// function* = generator function aka a function that can be re-entered
export function* helloSaga() {
  console.log("Hello Saga!");
}
// yield keyword is used to pause and resume a generator function
// Our worker Saga: will perform the async increment task
// Delay is a util function that returhs a promise that will resolive after a num of mili secs
export function* incrementAsync() {
  yield call(delay, 1000); // block generator Saga is suspended until deplay resolves
  yield put({ type: "INCREMENT" }); // dispatch The INCREMENT action.
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  // to listen for dispatched INCREMENT_ASYNC actions and
  // run incrementAsync each time.
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

export function* DecrementAsync() {
  yield call(delay, 1000);
  yield put({ type: "DECREMENT" });
}

export function* watchDecrementAsync() {
  yield takeEvery("DECREMENT_ASYNC", DecrementAsync);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [helloSaga(), watchIncrementAsync(), watchDecrementAsync()];
}
