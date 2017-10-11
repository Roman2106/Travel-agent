import React from "react";

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    if (this.props.hideAfter) {
      setTimeout(() => {
        this.props.onHide()
      }, this.props.hideAfter * 1000);
    }
  }

  render() {
    return (
      <div
        className={`alert alert-${this.props.type}`}
        onClick={this.props.hideOnClick ? () => this.props.onHide() : null}
      >
        <p className="alertText">{this.props.text}</p>
      </div>
    )
  }
}

export default Alert;