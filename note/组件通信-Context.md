## 组件通信-Context

### 什么是Context?

在一个典型的 React 应用中，数据通过 props 自上而下的进行传递。在层级较浅时，这种做法没有什么问题，但当嵌套组件层级加深后，这种方式就显得很繁琐且没有必要

假设组件关系如下： A -> B-> C -> D -> E，仅有 E 组件需要A组件中的数据，为了 E 组件可以拿到数据，B、C、D 都必须传递 props 才可以，这显然是极其麻烦且不必要的

为了避免逐层传递 props，可以使用 Context ，其提供了一种组件之间共享数据的方式

### Context API

#### React.createContext

创建一个 Context 对象，当组件订阅了该对象，就可以从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值

```js
const MyContext = React.createContext(defaultValue)

// 订阅是指，Context包含哪些组件，这些组件就订阅了Context
<MyContext.Provider value={bar}>
  <Display />  {/* Display 组件就订阅了MyContext，Display组件就可以通过某种方法拿到 value */}
</MyContext.Provider>
<Display /> {/* 此处的Display没有匹配到 Provider，但需要使用 value，此时，defaultValue就会生效 */}
```

只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。


#### Context.Provider

每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

```js
<MyContext.Provider value={/* 某个值 */}>
```

当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。????


#### Class.contextType


#### Context.consumer

### 类组件

```js
const ThemeContext = React.createContext(themes.dark);
ThemeContext.displayName = 'abc'; // displayName可以改变在react devtools中的组件名称

class ThemeButton extends Component {
  render() {
    let props = this.props,
        theme = this.context
    return (
      <button
        style={{backgroundColor: theme.background}}
      >{props.children}</button>
    );
  }
}

// 将ThemeContext赋值给ThemeButton.contextType之后
// 就可以在ThemeButton组件中使用this.context
ThemeButton.contextType = ThemeContext;

function ToolBar(props) {
  return (
      <ThemeButton>
        Change Theme{theme.background}
      </ThemeButton>
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
```

### 函数组件
对于函数式组件，要想订阅 Context，必须使用 Context.Consumer

```js
const ThemeContext = React.createContext(themes.dark);
ThemeContext.displayName = 'abc'; // displayName可以改变在react devtools中的组件名称

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
```