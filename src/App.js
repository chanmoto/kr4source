import './App.css';
import GraphPage from './components/graph';
import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import apolloClient from "./components/apolloClient";
import TokenForm from "./components/TokenForm";

class App extends Component {
  state = {
    token: null
  };

  componentDidMount() {
    this.setState({ token: sessionStorage.getItem("token") });
  }

  setToken = token => {
    sessionStorage.setItem("token", token);
    this.setState({ token });
  };

  render() {
    const { token } = this.state;

    return (
<GraphPage /> 
    );
  }
}

export default App;
