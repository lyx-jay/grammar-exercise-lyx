import React from "react";

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  },
};

// 创建一个Context对象
const ThemeContext = React.createContext(themes.dark);
ThemeContext.displayName = 'abc'
export {
  ThemeContext,
  themes
};