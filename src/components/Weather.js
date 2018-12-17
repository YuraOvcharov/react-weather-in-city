import React, { Component } from 'react';

import iconCelsius from '../img/icon-celsius.svg' // relative path to image 

class Weather extends Component {

    render() {
        let urlIconWeather = `http://openweathermap.org/img/w/${this.props.weather_icon}.png`;
        return (

            <div className="weather">
                {
                    this.props.city &&
                    <div className="weather__wrap">
                        <div className="weather__title">
                            <h2>
                                {this.props.city}
                            </h2>
                            <p>
                                {this.props.actual_time}
                            </p>
                        </div>
                        <div className="container">
                            <div className="row no-left-gutter">
                                <div className="col-12 col-sm-5">
                                    <div className="weather__base-info">
                                        <img className="weather__icon" src={urlIconWeather} alt="" />
                                        <span>{Math.round(this.props.temp)}</span>
                                        <img className="icon-celsius" src={iconCelsius} styles="height: 100px;width: 100px;" alt=""/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-7">
                                    <div className="weather__other-info">
                                        <p>Максимальная температура: {this.props.temp_max}</p>
                                        <p>Минимальная температура: {this.props.temp_min}</p>
                                        <p>Влажность: {this.props.humidity} %</p>
                                        <p>Ветер: {this.props.wind_speed} м/с</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <p className="text-center">{this.props.error}</p>
            </div>
        )
    }
}

export default Weather;