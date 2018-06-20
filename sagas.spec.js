import test from "tape";

import { delay } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { incrementAsync } from "./sagas";

test("incrementAsync Saga test", t => {
  // get the generator funct
  // it returns an iterator object,
  const generator = incrementAsync();

  t.deepEqual(
    // next value
    generator.next().value,
    // is the delay value
    call(delay, 1000),
    "counter Saga must call delay(1000)"
  );

  t.deepEqual(
    generator.next().value,
    // calling increment
    put({ type: "INCREMENT" }),
    "counter Saga must dispatch an INCREMENT action"
  );

  t.deepEqual(
    generator.next(),
    // make sure it is done
    { done: true, value: undefined },
    "counter Saga must be done"
  );

  t.end();
});
