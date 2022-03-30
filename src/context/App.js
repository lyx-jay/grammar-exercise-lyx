import React, { Component } from 'react';
import ThemeButton from './theme-button';
import { ThemeContext, themes } from './theme-context';



function ToolBar(props) {
  return (
    /**
     * 
     */
    <ThemeContext.Consumer>
      {
        theme => {
          return  (
            <ThemeButton>
              Change Theme
              {theme.background}
            </ThemeButton>
          )
        }
      }

    </ThemeContext.Consumer>

  )
}



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: themes.light
    }
  }

  render() {
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          {/* 
            在ToolBar及其包含的组件中可以取到value值，前提是：
            1. 对于类组件，若 ClassComponent.contextType = Context,
               则在该类组件中可以通过 this.context 取到value值
            
            2. 对于函数式组件，如果想要订阅Context，则必须在函数式组件
               中使用<Context.Consumer></Context.Consumer>
               如ToolBar中所示
          */}
          <ToolBar />
        </ThemeContext.Provider>
      </div>
    )
  }
}

export default App;