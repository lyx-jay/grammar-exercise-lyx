## what is Error Boundaries ?

部分UI的错误，不应该导致整个应用的崩溃，也就是说某一个组件发生错误，不应该影响其他组件的正常渲染，错误边界就是为了解决这个问题而引入的（在React 16中引入）

## How to use Error Boundaries ?

在class组件中，若使用了 `componentDidCatch` 或 `static getDerivedStateFromError` 这两个方法中的任意一个（或两个），该组件就是错误边界组件

需要注意的是，错误边界只针对组件，且只有class组件才可以称为错误边界组件

## examples

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

```js
import React, { Component } from 'react'

class ErrorBundary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </>
      )
    }
    return this.props.children;
  }
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }))
  }

  render() {
    if (this.state.counter === 5) {
      throw new Error("I crashed");
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>
  }
}

function App() {
  return (
    <>
      <div>
        <h2>两个组件在一个相同的错误边界中，若其中一个发生错误，则错误边界会替代该部分内容</h2>
        <ErrorBundary>
          <BuggyCounter />
          <BuggyCounter />
        </ErrorBundary>
      </div>
      <hr />
      <div>
        <h2>两个相同的组件，每个都包裹一个错误边界，其中一个错误也不会影响另一个组件</h2>
        <ErrorBundary>
          <BuggyCounter />
        </ErrorBundary>
        <ErrorBundary>
          <BuggyCounter />
        </ErrorBundary>
      </div>
    </>
  )
}

export default App;
```