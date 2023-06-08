---
title: Hooks
---

## Hooks

Hooks 在 [`@types/react` 16.8 之后就支持了](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L800-L1031)

[[toc]]

### useState

对于简单值，类型推断非常有效

```TSX
const [state, setState] = useState(false);
// `state` is inferred to be a boolean
// `setState` only takes booleans
```

如果需要使用依赖于推断的复杂类型，请参见使用 [Using Inferred Types](../troubleshooting/types.md)一节。


但是,需要 hooks 使用空值作为初始值,这时候该怎么定义类型呢?
显示的定义类型,并使用 union type :

```TSX
const [user, setUser] = useState<User | null>(null);

// later...
setUser(newUser);
```

你可以使用 as 断言初始值类型, 如果 其值在之后很快就初始化并一直有值.

```TSX
const [user, setUser] = useState<User>({} as User);

// later...
setUser(newUser);
```
上述代码暂时性的对 TS 编译器说谎, 说 `{}` 是 User 类型. 你应该紧接着设置好 `user` 的值.
如果不设置,后续的代码运行时会将 `user` 视为 `User` 类型,这可能导致 runtime error.


### useCallback
你可以像用其他函数一样使用 `useCallback`

```TSX
const memoizedCallback = useCallback(
  (param1: string, param2: number) => {
    console.log(param1, param2)
    return { ok: true }
  },
  [...],
);
/**
 * VSCode will show the following type:
 * const memoizedCallback:
 *  (param1: string, param2: number) => { ok: boolean }
 */
 ```

 在 React 小于 18 的版本, `useCallback` 的函数类型签名的参数类型为 `any[]`

 ```TSX
 function useCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList
): T;
```

在 React 18 之后的版本(包括 18), `useCallback`的函数签名改为了:

```TSX
function useCallback<T extends Function>(callback: T, deps: DependencyList): T;
```

因此, 以下代码会在 React 18 之后的版本 造成 `Parameter 'e' implicitly has an 'any' type` 错误,而 React 18 之前的版本不会出错:

```TSX
// @ts-expect-error Parameter 'e' implicitly has 'any' type.
useCallback((e) => {}, []);
// Explicit 'any' type.
useCallback((e: any) => {}, []);
```

### useReducer

你可以为 reducer action 使用 [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions), 不要忘了定义 reducer 的返回类型,否则 TS 会自行推导.

```TSX
import { useReducer } from "react";

const initialState = { count: 0 };

type ACTIONTYPE =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: string };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - Number(action.payload) };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement", payload: "5" })}>
        -
      </button>
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        +
      </button>
    </>
  );
}
```

[view in TS playground](https://www.typescriptlang.org/play?#code/LAKFEsFsAcHsCcAuACAVMghgZ2QJQKYYDGKAZvLJMgOTyEnUDcooRsAdliuO+IuBgA2AZUQZE+ZAF5kAbzYBXdogBcyAAwBfZmBCIAntEkBBAMIAVAJIB5AHLmAmgAUAotOShkyAD5zkBozVqHiI6SHxlagAaZGgMfUFYDAATNXYFSAAjfHhNDxAvX1l-Q3wg5PxQ-HDImLiEpNTkLngeAHM8ll1SJRJwDmQ6ZIUiHIAKLnEykqNYUmQePgERMQkY4n4ONTMrO0dXAEo5T2aAdz4iAAtkMY3+9gA6APwj2ROvImxJYPYqmsRqCp3l5BvhEAp4Ow5IplGpJhIHjCUABqTB9DgPeqJFLaYGfLDfCp-CIAoEFEFeOjgyHQ2BKVTNVb4RF05TIAC0yFsGWy8Fu6MeWMaB1x5K8FVIGAUglUwK8iEuFFOyHY+GVLngFD5Bx0Xk0oH13V6myhplZEm1x3JbE4KAA2vD8DFkuAsHFEFcALruAgbB4KAkEYajPlDEY5GKLfhCURTHUnKkQqFjYEAHgAfHLkGb6WpZI6WfTDRSvKnMgpEIgBhxTIJwEQANZSWRjI5SdPIF1u8RXMayZ7lSphEnRWLxbFNagAVmomhF6fZqYA9OXKxxM2KQWWK1WoTW643m63pB2u+7e-3SkEQsPamOGik1FO55p08jl6vdxuKcvv8h4yAmhAA)

::: details 在 `redux` 中使用 `Reducer`

 redux 库提供了为编写 reducer 函数的 TS 类型 `Reducer<State, Action>`, 该类型能处理返回类型.

 ```TSX
import { Reducer } from 'redux';

export function reducer: Reducer<AppState, Action>() {}
 ```

 ### useEffect / useLayoutEffect

`useEffect` 和 `useLayoutEffect` 都是为了处理副作用的,其返回值返回可选的清除函数.如果不需要关心返回值, 类型自然也就不需要.
当使用 `useEffect`时,需要注意不要返回除了 `undefined` 和函数之外的任何类型,否则 TS 和 react 都报错. 在使用箭头函数时需注意:

```TSX
function DelayedEffect(props: { timerMs: number }) {
  const { timerMs } = props;

  useEffect(
    () =>
      setTimeout(() => {
        /* do stuff */
      }, timerMs),
    [timerMs]
  );
  // bad example! setTimeout implicitly returns a number
  // because the arrow function body isn't wrapped in curly braces
  return null;
}
```

::: details 上述代码的优化方案
```TSX
function DelayedEffect(props: { timerMs: number }) {
  const { timerMs } = props;

  useEffect(() => {
    setTimeout(() => {
      /* do stuff */
    }, timerMs);
  }, [timerMs]);
  // better; use the void keyword to make sure you return undefined
  return null;
}
```
:::


### useRef

在 TS 中,useRef 返回的 reference, 既不是一个 [read-only](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/abd69803c1b710db58d511f4544ec1b70bc9077c/types/react/v16/index.d.ts#L1025-L1039)的, 也不是一个 [mutable](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/abd69803c1b710db58d511f4544ec1b70bc9077c/types/react/v16/index.d.ts#L1012-L1023), 取决于类型参数是否完全覆盖初始值.

#### Option 1: DOM element ref

[为了访问一个 DOM element](https://legacy.reactjs.org/docs/refs-and-the-dom.html):

provide only the element type as argument, and use null as initial value. In this case, the returned reference will have a read-only .current that is managed by React. TypeScript expects you to give this ref to an element's ref prop:

```TSX
function Foo() {
  // - If possible, prefer as specific as possible. For example, HTMLDivElement
  //   is better than HTMLElement and way better than Element.
  // - Technical-wise, this returns RefObject<HTMLDivElement>
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Note that ref.current may be null. This is expected, because you may
    // conditionally render the ref-ed element, or you may forget to assign it
    if (!divRef.current) throw Error("divRef is not assigned");

    // Now divRef.current is sure to be HTMLDivElement
    doSomethingWith(divRef.current);
  });

  // Give the ref to an element so React can manage it for you
  return <div ref={divRef}>etc</div>;
}
```