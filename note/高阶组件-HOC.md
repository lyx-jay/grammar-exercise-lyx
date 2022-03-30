# 高阶组件

> 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式

具体而言，高阶组件是一个函数，其参数为组件，返回值为新的组件

## 用法

当多个组件的大部分实现都相同，仅有个别部分不同时，可以使用高阶组件进行复用。

HOC定义方式

```javaScript
import React, { PureComponent } from 'react';

class App extends PureComponent {
  render() {
    return (
      <div>
        hello world
      </div>
    )
  }
}

// 类式高阶组件
function enhanceComponent(WrappedComponent) {
   class newComponent extends PureComponent {
     render() {
       return (
        //  通过这种方式可以接受传递来的参数
         <WrappedComponent {...this.props}/>
       )
     }
   }

  // 组件的名称可以通过displayName属性来修改
   newComponent.displayName = "hhh";
   return newComponent
}

// 函数式高阶组件的写法
function enhanceComponent2(WrappedComponent) {
  return props => {
    return <WrappedComponent {...props}/>
  }
}



const enhancementApp = enhanceComponent(App);

export default enhancementApp;
```

## 特点

1. HOC 不能改变原始组件，也不能使用继承来复制行为
2. 传递与HOC不相关的props，可以理解为仅传递与被包裹组件相关的props
3. 不要在render方法中使用HOC
4. 复制静态方法。当你将 HOC 应用于组件时，原始组件将使用容器组件进行包装。这意味着新组件没有原始组件的任何静态方法。为了解决这个问题，你可以在返回之前把这些方法拷贝到容器组件上

## HOC应用

### 增强props

```js
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
```

### 共享Context

```js
import React, { PureComponent, createContext } from 'react';

const UserContext = createContext({
  nickname: "默认",
  level: -1
})

function withUser(WrapperCpn) {
  return props => {
    return (
      <UserContext.Consumer>
        {
          value => {
            return <WrapperCpn {...props} {...value}/>
          }
        }
      </UserContext.Consumer>
    )
  }
}

function Header(props) {
  const { nickname, level } = props;
  return <h2>Header {"昵称:" + nickname + "等级:" + level}</h2>
}


function Footer(props) {
  const { nickname, level } = props;
  return <h2>Footer {"昵称:" + nickname + "等级:" + level}</h2>
}

const UserHeader = withUser(Header);
const UserFooter = withUser(Footer);

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <UserContext.Provider value={{ nickname: "why", level: 90 }}>
          <UserHeader />
          <UserFooter />
        </UserContext.Provider>
      </div>
    )
  }
}
```

### 渲染判断鉴权

```js
import React, { PureComponent } from 'react';

function loginAuth(Page) {
  return props => {
    if (props.isLogin) {
      return <Page/>
    } else {
      return <LoginPage/>
    }
  }
}

function LoginPage() {
  return <h2>LoginPage</h2>
}

function CartPage() {
  return <h2>CartPage</h2>
}

const AuthCartPage = loginAuth(CartPage);

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <AuthCartPage isLogin={true}/>
      </div>
    )
  }
}
```

### 生命周期劫持

```js
import React, { PureComponent } from 'react';

function logRenderTime(WrapperCpn) {
  return class extends PureComponent {
    UNSAFE_componentWillMount() {
      this.begin = Date.now();
    }

    componentDidMount() {
      this.end = Date.now();
      const interval = this.end - this.begin;
      console.log(`${WrapperCpn.name}渲染使用时间:${interval}`)
    }

    render() {
      return <WrapperCpn {...this.props}/>
    }
  }
}

class Home extends PureComponent {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <p>我是home的元素,哈哈哈</p>
      </div>
    )
  }
}


class Detail extends PureComponent {
  render() {
    return (
      <div>
        <h2>Detail</h2>
        <p>我是detail的元素,哈哈哈</p>
      </div>
    )
  }
}

const LogHome = logRenderTime(Home);
const LogDetail = logRenderTime(Detail);

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <LogHome />
        <LogDetail />
      </div>
    )
  }
}
```