
# Typing Component Props

这是为熟悉 TypeScript 的 React 开发人员提供的基本方向和参考资料。

[[toc]]
### Basic Prop Types Examples

在 React + TypeScript 的项目中，你可能会使用到的 TypeScript 类型：

```tsx
type AppProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** Array 数组 */
  names: string[];
  /** union type  联合类型 */
  status: "waiting" | "success";
  /** an object with known properties 已知具体属性的对象 */
  obj: {
    id: string;
    title: string;
  };
  /** 对象数组! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  /** 任何非基础数据类型 - can't access any properties (NOT COMMON but useful as placeholder) */
  obj2: object;
  /** an interface with no required properties - (NOT COMMON, except for things like `React.Component<{}, State>`) */
  obj3: {};
  /** 字典对象，带有任何 string 类型的 key 值， value 为确定的某些类型 */
  dict1: {
    [key: string]: MyTypeHere;
  };
  dict2: Record<string, MyTypeHere>; // 同上
  /** 不返回任何值的函数 (VERY COMMON) */
  onClick: () => void;
  /** 带有形参的函数 (VERY COMMON) */
  onChange: (id: number) => void;
  /** function type syntax that takes an event (VERY COMMON) */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** alternative function type syntax that takes an event (VERY COMMON) */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function;
  /** 可选类型 (VERY COMMON!) */
  optional?: OptionalType;
  /** useState 返回的 setState 类型 */
  setState: React.Dispatch<React.SetStateAction<number>>;
};
```

### `object` as the non-primitive type

`object` 是在 TypeScript 中常被误解的类型。 它不是'any object', 而是'任何非基本数据类型(non-primitive type)'，
即代表所有不包括 `number`，`string`，`boolean`，`symbol`，`null` 和 `undefined` 的数据类型。

使用 "非基本数据类型" 的类型表达在 react 中应该尽力避免的，应该尽量少用 `object` 类型。

### Empty interface, `{}` and `Object`

`{}` 和 `Object` 都代表 "所有非空值"，并非 "空对象". [使用这些类型是常见的误用，不建议](https://typescript-eslint.io/rules/no-empty-interface/)。

```typescript
interface AnyNonNullishValue {} // equivalent to `type AnyNonNullishValue = {}` or `type AnyNonNullishValue = Object`

let value: AnyNonNullishValue;

// these are all fine, but might not be expected
value = 1;
value = "foo";
value = () => alert("foo");
value = {};
value = { foo: "bar" };

// these are errors
value = undefined;
value = null;
```

### Useful React Prop Type Examples

一些将 React 组件当做 props 传递的常用方式

```tsx
export declare interface AppProps {
  children?: React.ReactNode; // best, accepts everything React can render
  childrenElement: JSX.Element; // react element
  style?: React.CSSProperties; // style props
  
  // form 时间! the 其中的泛型参数是 event.target
  //  more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  onChange?: React.FormEventHandler<HTMLInputElement>;
  
  // 假冒所有的原生 button props，不转发自身的 ref
  props: Props & React.ComponentPropsWithoutRef<"button">; 

  // 模仿所有 MyButtonWithForwardRef 的属性，丙炔转发自身 ref
  props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>; 
}
```

::: details <u>JSX.Element vs React.ReactNode?</u>
Quote @ferdaber: A more technical explanation is that a valid React node is not the same thing as what is returned by React.createElement. Regardless of what a component ends up rendering, React.createElement always returns an object, which is the JSX.Element interface, but React.ReactNode is the set of all possible return values of a component.

JSX.Element -> Return value of React.createElement

React.ReactNode -> Return value of a component

:::

[More discussion: Where ReactNode does not overlap with JSX.Element](https://github.com/typescript-cheatsheets/react/issues/129)
[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new)


### Types or Interfaces?

Types 还是 Interfaces 都可以用来定义 Props 和 state，所以该怎么选？

#### TL;DR

使用 Interface 直到你需要用 Type - [orta](https://twitter.com/orta/status/1356129195835973632?s=20)

#### More Advice

以下是几点经验法则：

* 当你在编写库、npm 包时，总是用 `interface` 定义 public API, 这样当一些类型丢失时，使用这些第三方包的用户能通过 `declaration merging` 的方式补全类型
* 在定义 React 组件的 Props 和 State 时，考虑使用 `type`， 能提供一致性和更强的类型约束

具体解释： [Interface vs Type alias in TypeScript 2.7](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c)

TypeScript Handbook 现在也提供了一些建议在 [Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces) 这篇文章上.

> Note: 越大规模，interfaces 在性能上会更优（具体详见[此处](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections) 但对此持[保留态度](https://news.ycombinator.com/item?id=25201887)

类型对于 union types 联合类型 (例如，类型 `MyType = TypeA | TypeB`) 很有用，而接口更适合于声明字典形状，然后`implementing`或`extending`它们。

### Useful table for Types vs Interfaces
这是一个微妙的话题，不要太在意。这里有一张便利的表格:

| 比较                                            | Type | Interface |
| ----------------------------------------------- | :--: | :-------: |
| Can describe functions                          |  ✅  |    ✅     |
| Can describe constructors                       |  ✅  |    ✅     |
| Can describe tuples                             |  ✅  |    ✅     |
| Interfaces can extend it                        |  ⚠️  |    ✅     |
| Classes can extend it                           |  🚫  |    ✅     |
| Classes can implement it (`implements`)         |  ⚠️  |    ✅     |
| Can intersect another one of its kind           |  ✅  |    ⚠️     |
| Can create a union with another one of its kind |  ✅  |    🚫     |
| Can be used to create mapped types              |  ✅  |    🚫     |
| Can be mapped over with mapped types            |  ✅  |    ✅     |
| Expands in error messages and logs              |  ✅  |    🚫     |
| Can be augmented                                |  🚫  |    ✅     |
| Can be recursive                                |  ⚠️  |    ✅     |

⚠️ In some cases

(来源: [Karol Majewski](https://twitter.com/karoljmajewski/status/1082413696075382785))
