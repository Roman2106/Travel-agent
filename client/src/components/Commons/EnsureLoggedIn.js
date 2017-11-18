import React from "react";
import {withRouter} from "react-router-dom";
import authToken from "../../api/authToken";

export const EnsureLoggedIn = withRouter(class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentWillMount() {
    this.props.delMessage();
  }

  componentDidMount() {
    this.props.getTrips();
    this.props.getLocations();
    this.props.getCustomers();
    const {history} = this.props;
    const isLoggedIn = Boolean(authToken.get());
    this.setState({isLoggedIn});
    if (!isLoggedIn) {
      history.replace("/login");
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    }
    return null;
  }
});