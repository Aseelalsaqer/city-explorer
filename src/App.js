import axios from "axios";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      REACT_APP_LOCATION: process.env.REACT_APP_LOCATION,
      lat: "",
      lon: "",
      displayName: "",
      mapFlag: false,
      displayErr: false,
    };
  }
  getData = async (event) => {
    event.preventDefault();
    let cityName = event.target.cityName.value;
    let myKey = this.state.REACT_APP_LOCATION;
    let url = `https://eu1.locationiq.com/v1/search.php?key=${myKey}&q=${cityName}&format=json`;
    try {
      let result = await axios.get(url);
      console.log(result.data);
      this.setState({
        lat: result.data[0].lat,
        lon: result.data[0].lon,
        displayName: result.data[0].display_name,
        mapFlag: true,
      });
    } catch {
      console.log("err");
      this.setState({
        displayErr: true,
      });
    }
  };
  render() {
    return (
      <>
        <h1>Location App</h1>
        <form onSubmit={this.getData}>
          <input type="text" name="cityName" placeholder="Enter city name" />
          <button type="submit">Get Location</button>
        </form>
        <p>Display Name: {this.state.displayName} </p>
        <p>Lat: {this.state.lat} </p>
        <p>Lon: {this.state.lon} </p>

        {this.state.mapFlag && (
          <img
            src={`https://maps.locationiq.com/v3/staticmap?key=${this.state.REACT_APP_LOCATION}&center=${this.state.lat},${this.state.lon}`}
            alt="map"
          />
        )}
        {this.state.displayErr && <p>Sorry Error</p>}
      </>
    );
  }
}

export default App;
