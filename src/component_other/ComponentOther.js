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