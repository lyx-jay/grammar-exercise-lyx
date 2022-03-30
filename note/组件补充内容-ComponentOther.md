# ref转发

## ref基础

Ref 转发是一个可选特性，其允许某些组件接收 ref，并将其向下传递（换句话说，“转发”它）给子组件。
Ref 对于需要以常规DOM形式管理的组件非常有用，比如 input、button等，该特性对于可重用组件库非常有用

```js
import React, { PureComponent, createRef, forwardRef } from 'react';

const Home = forwardRef(function(props, ref) {
  return (
    <div>
      <h2 ref={ref}>Home</h2>
      <button>按钮</button>
    </div>
  )
})

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.homeTitleRef = createRef();
  }

  render() {
    return (
      <div>
        <Home ref={this.homeTitleRef}/>
        <button onClick={e => this.printInfo()}>打印ref</button>
      </div>
    )
  }

  printInfo() {
    console.log(this.homeTitleRef.current);
  }
}
```

## HOC中使用refs

```js
import React from 'react';

function logProps(WrappedComponent) {
  class LogProps extends React.Component {

    render() {
      const {aref, ...rest} = this.props  // 该this.props 指所有的包含常规props和ref参数的所有props，这里做一个解构
      return (
        <WrappedComponent {...rest} ref={aref}/>  // 这里的ref是固定语法，表明该DOM是我们想要获取的
      )
    }
  }

  return React.forwardRef((props, a) => {
    // props指的是name、age这样的常规的参数
    // a 指的是ref参数，forwardRef函数第二个参数就是用来传递ref值的
    return <LogProps {...props} aref={a}/>
  });
}


class FancyButton extends React.Component {
  render() {
    return (
      <>
        <h2>Fancy button</h2>
      </>
    )
  }
}

const EnhanceFancyButton = logProps(FancyButton);


class App extends React.Component {
  constructor(props) {
    super(props);

    this.fancyRef = React.createRef();

  }

  render() {
    return (
      <>
        <EnhanceFancyButton ref={this.fancyRef} name="lyx"/>
        <button onClick={e => this.printRef()} >button</button>
      </>
    )
  }
  printRef() {
    console.log(this.fancyRef);
  }
}

export default App;
```

## Fragments
使用 Fragments 不会在DOM中创建额外的节点
```js
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}

// 短语法
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}

```

短语法不支持 key 或属性，若需要传递属性，需要使用Fragment