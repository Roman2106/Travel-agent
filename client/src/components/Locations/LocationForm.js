import React from "react";
import {Link} from "react-router-dom";

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: (this.props.location && this.props.location.country) || "",
      city: (this.props.location && this.props.location.city) || ""
    };
  };

  render() {
    return (
      <div className="locationsForm">
        <form>
          <p>
            <label htmlFor="country">Country:</label>
            <input type="text" name="country" id="country" title="country"
                   onChange={e => this.setState({country: e.target.value})}
                   value={this.state.country}
            />
          </p>
          <p>
            <label htmlFor="city">City:</label>
            <input type="text" name="city" id="city" title="city"
                   onChange={e => this.setState({city: e.target.value})}
                   value={this.state.city}
            />
          </p>
        </form>
        <div className="locationsButtons">
          <Link className="save" to={`/locations?page=${this.props.currentPage}`}
                onClick={() => {
                  this.props.onSaveLocation({
                    id: (this.props.location && this.props.location.id) || null,
                    country: this.state.country,
                    city: this.state.city
                  })
                }}>Save
          </Link>
          <Link to={`/locations?page=${this.props.currentPage}`} className="cancel">Cancel</Link>
        </div>
      </div>
    )
  }
}

export default LocationForm;