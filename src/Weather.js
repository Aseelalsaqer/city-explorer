import React from "react";

class Weather extends React.Component {
  render() {
    return (
      <>
        <p>{this.props.date} : {this.props.description}</p>
      </>
    );
  }
}
export default Weather;
