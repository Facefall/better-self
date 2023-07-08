---
title: Typing defaultProps
---

### Typing defaultProps

### You May Not Need `defaultProps`

目前业内共识是使用 object default value。

Function Components:

```TSX
type GreetProps = { age?: number };

const Greet = ({ age = 21 }: GreetProps) => // etc
```

Class Components:

```TSX
type GreetProps = {
  age?: number;
};

class Greet extends React.Component<GreetProps> {
  render() {
    const { age = 21 } = this.props;
    /*...*/
  }
}

let el = <Greet age={3} />;
```

### Typing `defaultProps`

在 [TS3.0+](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html) 中， 对 `defaultProps` 的类型推导有了很大提升，尽管还有一些[边界 case 问题](https://github.com/typescript-cheatsheets/react/issues/61)

Function Components

```TSX
// using typeof as a shortcut; note that it hoists!
// you can also declare the type of DefaultProps if you choose
// e.g. https://github.com/typescript-cheatsheets/react/issues/415#issuecomment-841223219
type GreetProps = { age: number } & typeof defaultProps;

const defaultProps = {
  age: 21,
};

const Greet = (props: GreetProps) => {
  // etc
};
Greet.defaultProps = defaultProps;
```

[TS Playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcARFDvmQNwBQdMAnmFnAOKVYwAKxY6ALxwA3igDmWAFxwAdgFcQAIyxQ4AXzgAyOM1YQCcACZYCyeQBte-VPVwRZqeCbOXrEAXGEi6cCdLgAJgBGABo6dXo6e0d4TixuLzgACjAbGXjuPg9UAEovAD5RXzhKGHkoWTgAHiNgADcCkTScgDpkSTgAeiQFZVVELvVqrrrGiPpMmFaXcytsz2FZtwXbOiA)

对于 _Class Components_, there are a couple ways to do it (including using the Pick utility type) but the recommendation is to "reverse" the props definition:

```TSX
type GreetProps = typeof Greet.defaultProps & {
  age: number;
};

class Greet extends React.Component<GreetProps> {
  static defaultProps = {
    age: 21,
  };
  /*...*/
}

// Type-checks! No type assertions needed!
let el = <Greet age={3} />;
```

::: details JSX.LibraryManagedAttributes 对于库作者的细微差别

上述的实现，对于 App 的 creator 来说是能正常工作的，但有时可能希望能导出 GreetProps 以供他人使用。
这种情况下，`GreetProps` 被定义，而 `age` 虽然不是 defaultProps, 会被要求必须输入.
