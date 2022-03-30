import React, { Component } from "react";
import { ThemeContext } from "./theme-context";

class ThemeButton extends Component {
  render() {
    let props = this.props,
        theme = this.context
    console.log(theme);
    return (
      <button
        style={{backgroundColor: theme.background}}
      >{props.children}</button>
    );
  }
}

// 将ThemeContext赋值给ThemeButton.contextType之后
// 就可以在ThemeButton组件中使用this.context
// ThemeButton.contextType = ThemeContext;

export default ThemeButton;