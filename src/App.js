import { Component } from "react";
import Dashboard from "./Dashboard";
import { getUserFromLocalStorage } from "./utils";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    }
  }

  componentDidMount() {
    if (getUserFromLocalStorage() === null) {
      return window.location.replace("/login");
    }
    this.setState({ isLoggedIn: true });
  }

  render() {
    if (!this.state.isLoggedIn) return null;
    return (
      <Dashboard />
    )
  }
}

export default App;