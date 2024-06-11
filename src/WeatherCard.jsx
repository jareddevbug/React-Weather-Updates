function WeatherCard(props) {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4>
            {props.country}
            <span>
              <p>{props.cloud}</p>
            </span>
          </h4>
          <img
            src={`https://openweathermap.org/img/wn/${props.icon}.png`}
            alt="weather icon"
          />
        </div>
        <div className="card-content">
          <h1>{props.feels}</h1>

          <div className="card-aside">
            <p>
              feels like: <span>{props.feels}</span>
            </p>
            <p>
              Humidity: <span>{props.humidity}</span>
            </p>
            <p>
              Wind Speed: <span>{props.wind}</span>
            </p>
            <p>
              Pressure: <span>{props.pressure}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherCard;
