import React from "react";
import Loader from "../Сommons/Loader";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null,
      country: "",
      city: ""
    }
  }

  componentDidMount() {
    this.props.getLocations().then(locations => {
      this.setState({
        locations
      });
    });
  }


  render() {
    if (this.state.locations) {
      return (
        <div className="locations">
          <table>
            <thead>
            <tr>
              <th>Страна</th>
              <th>Город</th>
              <th>Удалить</th>
            </tr>
            </thead>
            <tbody>
            {this.state.locations.map((item, index, key) =>
              <tr key={item.id}>
                <td>{item.country}</td>
                <td>{item.city}</td>
                <td>
                  <button className="del" onClick={() => {
                    this.props.delSingle(item.id, index).then(() => {
                      let arr = this.state.locations;
                      arr.splice(index, 1);
                      this.setState({
                        locations: arr
                      });
                      this.props.onSuccess({
                        text: ` Location ${item.country}, ${item.city} was successfully deleted.`,
                        type: "success"
                      })
                    }).catch(error => this.props.onError({
                      text: error.message || "Unexpected error.",
                      type: "danger"
                    }));
                  }}>Удалить
                  </button>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <form>
            <p>
              <label htmlFor="country">Название страны:</label>
              <input type="text" name="country" id="country" title="country" required
                     onChange={e => this.setState({country: e.target.value})}
                     value={this.state.country}
              />
            </p>
            <p>
              <label htmlFor="city">Название города:</label>
              <input type="text" name="city" id="city" title="city" required
                     onChange={e => this.setState({city: e.target.value})}
                     value={this.state.city}
              />
            </p>
          </form>
          <div className="locationsButtons">
            <button className="addLocations"
                    onClick={() => this.props.onAdd({
                      country: this.state.country,
                      city: this.state.city
                    }).then(() => {
                      this.props.getLocations().then(locations => {
                        this.setState({
                          locations,
                          country: "",
                          city: ""
                        });
                      });
                      this.props.onSuccess({
                        text: ` Location ${this.state.country}, ${this.state.city} was successfully edded.`,
                        type: "success"
                      })
                    }).catch(error => this.props.onError({
                      text: error.message || "Unexpected error.",
                      type: "danger"
                    }))}
            >Добавить место
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <Loader/>
      )
    }
  }
}

export default Location;