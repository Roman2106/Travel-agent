import React from "react";
import {Link} from "react-router-dom";
import queryString from "query-string"

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: this.props.location && this.props.location.country || "",
      city: this.props.location && this.props.location.city || ""
    };
  };

  render() {
    let queryParams = queryString.parse(window.location.search.substr(1));
    let currentPage = queryParams.page >= 1 ? parseInt(queryParams.page, 10) : 1;
    // console.log(this.props.location.id);
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
          <button className="addLocations"
                  onClick={() => {
                    this.props.history.push(`/locations?page=${String(currentPage)}`);
                    this.props.onSaveLocation({
                      id: this.props.location && this.props.location.id || null,
                      country: this.state.country,
                      city: this.state.city
                    })
                  }}>Save
          </button>
          <Link to={`/locations?page=${String(currentPage)}`} className="cancel">Cancel</Link>
        </div>
      </div>
    )
  }
}

export default LocationForm;