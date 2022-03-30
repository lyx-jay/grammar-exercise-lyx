import React, { Component } from "react";

function enhanceProps(WrapperCpn, otherProps) {
  return (props) => <WrapperCpn {...props} {...otherProps}/>
}

class Header extends Component {
  render() {
    const {name, age, height} = this.props;
    return (
      <h2>Header {name + " " + age + " " + height}</h2>
    )
  }
}

class Main extends Component {
  render() {
    const {name, age} = this.props;
    return (
      <>
      <h2>Main {name + " " + age}</h2>
      <h3>{this.props.height}</h3>
      </>
    )
  }
}

const EnhanceHeader = enhanceProps(Header, {height: 1.9})
const EnhanceMain = enhanceProps(Main, {height: 1.7})


class App extends Component {
  render() {
    return (
      <div>
        <EnhanceHeader name='lyx' age={19}/>
        <EnhanceMain name='lyxCoder' age={199}/>
      </div>
    )
  }
}

export default App;