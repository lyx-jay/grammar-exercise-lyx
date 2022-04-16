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


