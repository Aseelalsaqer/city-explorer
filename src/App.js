import axios from "axios";
import React from "react";
import Weather from "./Weather";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      displayName: "",
      mapFlag: false,
      displayErr: false,
      
    };
  }

  // getWeatherData = async (lat,lon) => {
  //   let weatherURL = `https://aseel-city.herokuapp.com/weather?lat=${lat}&lon=${lon}`;
  //   try {
  //     if (
  //       cityName === "Amman" ||
  //       cityName === "Paris" ||
  //       cityName === "Seattle"
  //     ) {
  //       let weatherData = await axios.get(weatherURL);
  //       this.setState({
  //         weatherData: weatherData.data
  //       });
  //     }
  //   } catch {
  //     console.log("err");
  //     this.setState({
  //       displayErr: true,
  //     });
  //   }
  // };
getWeatherData = async(lat,lon)=>{
  try {
    let result2 = await axios.get(
      `https://aseel-city.herokuapp.com/weather?lat=${lat}&lon=${lon}`
    );

    this.setState({ weatherData: result2.data });

    console.log(JSON.stringify(result2.data));
  } catch {
    console.log("err22");
    this.setState({
      displayErr: true,
    });
  }
}
  getData = async (event) => {
    event.preventDefault();
    let cityName = event.target.cityName.value;
    let myKey = process.env.REACT_APP_LOCATION;
    let url = `https://us1.locationiq.com/v1/search.php?key=${myKey}&q=${cityName}&format=json`;
    try {
      let result = await axios.get(url);
      console.log(result.data);
      this.setState({
        lat: result.data[0].lat,
        lon: result.data[0].lon,
        displayName: result.data[0].display_name,
        mapFlag: true,
      });
      this.getWeatherData(this.state.lat,this.state.lon);
      
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
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION}&center=${this.state.lat},${this.state.lon}`}
            alt="map"
          />
        )}
        <h1>Weather</h1>
        {this.state.weatherData &&
          this.state.weatherData.map(function (w, i) {
            return <Weather date={w.date} description={w.description} />;
          })}
        {this.state.displayErr && <p>Sorry Error</p>}
      </>
    );
  }
}

export default App;
