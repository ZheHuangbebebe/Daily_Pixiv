import React from "react"
import ReactDOM from "react-dom"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { PageLayout } from "./Layout"

class App extends React.Component{
  render(){
    return (
      <PageLayout/>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById(("root")))