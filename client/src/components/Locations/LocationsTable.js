import React from "react";
import Loader from "../Сommons/Loader";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      city: ""
    }
  }

  render() {
    if (this.props.locations) {
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
            {this.props.locations.map((item, index, key) =>
              <tr key={item.id}>
                <td>{item.country}</td>
                <td>{item.city}</td>
                <td>
                  <button className="del" onClick={() => {
                    this.props.delSingle(item.id, index)
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
              <input type="text" name="country" id="country" title="country"
                     onChange={e => this.setState({country: e.target.value})}
                     value={this.state.country}
              />
            </p>
            <p>
              <label htmlFor="city">Название города:</label>
              <input type="text" name="city" id="city" title="city"
                     onChange={e => this.setState({city: e.target.value})}
                     value={this.state.city}
              />
            </p>
          </form>
          <div className="locationsButtons">
            <button className="addLocations"
                    onClick={() => {
                      this.props.onAdd({
                      country: this.state.country,
                      city: this.state.city
                    });
                      this.setState({country: "", city: ""})}}
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