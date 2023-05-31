---
title: Function Components
---

### Function Components

可以像常规函数一样，接受 `props` 参数和返回 JSX 元素

```JSX
// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = {
  message: string;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const App = ({ message }: AppProps) => <div>{message}</div>;

// you can choose annotate the return type so an error is raised if you accidentally return some other type
const App = ({ message }: AppProps): JSX.Element => <div>{message}</div>;

// you can also inline the type declaration; eliminates naming the prop types, but looks repetitive
const App = ({ message }: { message: string }) => <div>{message}</div>;
```
> Tip: You might use [Paul Shen's VS Code Extension](https://marketplace.visualstudio.com/items?itemName=paulshen.paul-typescript-toolkit) to automate the type destructure declaration (incl a [keyboard shortcut](https://twitter.com/_paulshen/status/1392915279466745857?s=20)).

::: tip  `React.FC` 不推荐使用。 那 `React.FunctionComponent` 或者 `React.VoidFunctionComponent` 呢？

你可能看到过一下这种函数式组件的写法：

``` TSX
const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
  <div>{message}</div>
);
```

但是，如今主流观点一致[不推荐](https://github.com/facebook/create-react-app/pull/8177)使用 `React.FunctionComponent` （或者 `React.FC` ）。
这是一个微妙的观点，如果你同意并且想从代码中移除这些 `React.FC` 声明，可以使用 [jscodeshift mode](https://github.com/gndelia/codemod-replace-react-fc-typescript)

一些与常规函数不同的差异点：
* `React.FucntionComponent` 会显式声明返回类型，但常规函数是隐式的。
* 提供 typechecking 和 一些属性的 autocomplete ，如 `displayName`, `propTypes`, 和 `defaultProps`
    * 需要注意的是，在 React.FucntionComponent 中使用 `defaulProps` 会有一些问题。详情见 [issue](https://github.com/typescript-cheatsheets/react/issues/87), 后文会有专门的章节讨论 `defaulProps` 这一属性。
* 在 [React 18 类型更新](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210) 前，`React.FunctionComponent` 提供隐式的对 Children 的定义(如下), 这是非常有争议的点, 这也是 CRA TS template 中移除 `React.FC` 的原因之一.

```TSX
// before React 18 types
const Title: React.FunctionComponent<{ title: string }> = ({
  children,
  title,
}) => <div title={title}>{children}</div>;
```

::: details (废弃) 使用 React.VoidFunctionComponent or React.VFC

`React.VoidFunctionComponent` 或者 `React.VFC` 在 React 18 中被废弃，要使用建议还是使用 `React.FunctionComponent` 或者 `React.FC`.

``` TSX
type Props = { foo: string };

// OK now, in future, error
const FunctionComponent: React.FunctionComponent<Props> = ({
  foo,
  children,
}: Props) => {
  return (
    <div>
      {foo} {children}
    </div>
  ); // OK
};

// Error now, in future, deprecated
const VoidFunctionComponent: React.VoidFunctionComponent<Props> = ({
  foo,
  children,
}) => {
  return (
    <div>
      {foo}
      {children}
    </div>
  );
};
```
:::

::: details Minor Pitfalls
---
以下这些模式是不推荐的：

**条件渲染**

```TSX
const MyConditionalComponent = ({ shouldRender = false }) =>
  shouldRender ? <div /> : false; // don't do this in JS either
const el = <MyConditionalComponent />; // throws an error
```

由于编译器的限制，函数组件不能返回 除了 JSX or Null 之外的任何东西，否则编译器会报错

**Array.fill**

```TSX
const MyArrayComponent = () => Array(5).fill(<div />);
const el2 = <MyArrayComponent />; // throws an error
```

遗憾的是，仅仅注释函数类型没有帮助，因此如果您确实需要返回 React 支持的其他异类，那么您需要有类型断言:

```TSX
const MyArrayComponent = () => Array(5).fill(<div />) as any as JSX.Element;
```

:::

