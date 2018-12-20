import React, { Component } from 'react';
import './App.scss';


import Info from './components/Info'
import Form from './components/Form'
import Weather from './components/Weather'

const API_KEY_WEATHER = "aa8cb8b10978badb31f995780b378a31";
const API_KEY_MAP = "C7UWPN8W69UG";

//const API_GOOGLE_MAP = "AIzaSyCckgWlg0WA3pGAKSEBTn8l0KGc_TdHw10";

class App extends Component {

  state = {
    temp: undefined,
    city: undefined,
    wind_speed: undefined,
    temp_max: undefined,
    humidity: undefined,
    temp_min: undefined,
    actual_time: undefined,
    weather_icon: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    let city = e.target.elements.city.value;
    //Проверяем введено ли в поле "Город" что-либо, если нет, то сообщаем это пользователю
    if (city) {
      //Получаем JSON файл погоды
      const apiUrl = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=metric`);
      const data = await apiUrl.json();

      //Проверяем существует ли данный город в базе, если нет, то выдаем соответствующую ошибку
      if (data.cod === "404") {
        this.setState({
          temp: undefined,
          city: undefined,
          wind_speed: undefined,
          temp_max: undefined,
          humidity: undefined,
          temp_min: undefined,
          actual_time: undefined,
          weather_icon: undefined,
          error: "К сожалению, такого города не найдено"
        });
      } else {
        //Получаем JSON файл (актуальное время для определенного города)
        const apiUrlMap = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY_MAP}&format=json&by=position&lat=${data.coord.lat}&lng=${data.coord.lon}`);
        const MapJson = await apiUrlMap.json();

        //Берем дату и предобразуем в нужный нам вид (День недели + время)
        let actualDate = new Date(`${MapJson.formatted}`);
        const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
        actualDate = days[actualDate.getDay()] + ' ' + (actualDate.getHours() < 10 ? "0" + actualDate.getHours() : actualDate.getHours()) + ":" + (actualDate.getMinutes() < 10 ? "0" + actualDate.getMinutes() : actualDate.getMinutes());

        this.setState({
          temp: data.main.temp,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          city: data.name,
          actual_time: actualDate,
          wind_speed: data.wind.speed,
          humidity: data.main.humidity,
          weather_icon: data.weather[0].icon,
          error: undefined
        });
      }
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        wind_speed: undefined,
        temp_max: undefined,
        humidity: undefined,
        temp_min: undefined,
        actual_time: undefined,
        weather_icon: undefined,
        error: "Введите название города, пожалуйста"
      });
    }
  }

  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="wrapper">
                <Info />
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  temp={this.state.temp}
                  temp_max={this.state.temp_max}
                  temp_min={this.state.temp_min}
                  city={this.state.city}
                  wind_speed={this.state.wind_speed}
                  humidity={this.state.humidity}
                  weather_icon={this.state.weather_icon}
                  actual_time={this.state.actual_time}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default App;
