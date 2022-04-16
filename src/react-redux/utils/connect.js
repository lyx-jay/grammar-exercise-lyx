import React from "react";
import store from "../store";


function connect (mapStateToProps, mapDispatchToProps) {
  return function handleMapCpn (WrappedComponent) {
    return class extends React.Component {
      // 使用HOC的目的就是抽取出公共的代码，将state、函数以props的形式传递给目标组件
      constructor(props) {
        super(props);
        this.state = {
          storeState: mapStateToProps(store.getState())
        }
      }

      componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
          this.setState({
            storeState: mapStateToProps(store.getState())
          })
        })
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        console.log(this.props)
        return <WrappedComponent {...this.props}
                                 {...mapStateToProps(store.getState())}
                                 {...mapDispatchToProps(store.dispatch)}/>
      }
    }
  }
}

export default connect;