import React from "react"
import ReactDOM from "react-dom"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { PageLayout } from "./Layout"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component{
  render(){
    return (
      <Router>
        <Route exact path="/member/:member" component={PageLayout}/>
        <Route exact path="/tag/:tag" component={PageLayout}/>
        <Route exact path="/illust/:illust" component={PageLayout}/>
        <Route exact path="/" component={PageLayout}/>
      </Router>

    )
  }
}

ReactDOM.render(<App/>, document.getElementById(("root")))