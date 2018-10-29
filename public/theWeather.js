function Search(props) {
    function onKeyPressHandle(e) {

        props.onKeyPress(e.key);

    }
    function input(e) {
        props.inputz(e.target.value)
    }
    return (
        <div className="navbar navb container-fluid">
            <div className="navbl py-auto">
                <h4>Forecast</h4>
            </div>
            <div className="boxsearch justify-content-end py-auto">
                <input className="inputCity " id="del" type="text" placeholder="Search..." onChange={input} onKeyPress={onKeyPressHandle} />
            </div>
        </div>
    );
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }
    _onPressKey = (value) => {
        this.props.confirmSearch(value)
    }
    getValue = (value) => {
        this.props._getValue(value);
    }
    render() {
        return (
            <Search inputz={this.getValue} onKeyPress={this._onPressKey} />
        )
    };
}

class WeatherOneDay extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            isClick: true,
        })
    }
    ClickHandle = () => {
        this.setState({ isClick: !this.state.isClick });
        this.props._ClickHandle(this.state.isClick);
    }
    render() {
        var imgz = "https://www.weatherbit.io/static/img/icons/" + this.props.value.weather.icon + ".png";
        var speed = Math.floor(this.props.value.wind_spd * 3.6);
        var temDisplay = this.state.isClick ? "C" : "F";
        var temClick = this.state.isClick ? "F" : "C"
        return (
            <div className="row mx-auto px-auto">
                <div className="mx-auto weatherOne">
                    <div className="px-auto mx-auto"><h4>{this.props.city}, {this.props.country_code}</h4></div>
                    <div className="px-auto mx-auto" >
                        <img src={imgz} height="90" width="90" alt="weather-icon" />
                        <span><h1 className="d-inline">{parseFloat(this.props.value.temp).toFixed(0)}<sup>o</sup>{temDisplay}</h1> &nbsp;&nbsp;&nbsp;&nbsp; <h2 className="d-inline choie" onClick={this.ClickHandle}>{temClick}</h2></span>
                    </div>
                    <div className="px-auto mx-auto"><h4>{this.props.value.weather.description}</h4></div>
                    <div className="px-auto mx-auto"><p>Update as of: {this.props.value.datetime}</p></div>
                    <div className="px-auto mx-auto"><span>Feels Like:  {parseFloat(this.props.value.app_max_temp).toFixed(0)}°</span> &nbsp;&nbsp;&nbsp;&nbsp; <span>Wind: {speed}km/h</span> &nbsp;&nbsp;&nbsp;&nbsp; </div>
                    <div className="px-auto mx-auto">Visibility: {parseFloat(this.props.value.vis).toFixed(0)} km</div>
                    <div><span>Barometer: {this.props.value.pres}mb</span>  &nbsp;&nbsp;&nbsp;&nbsp; <span>Humidity: {this.props.value.rh}%</span> &nbsp;&nbsp;&nbsp;&nbsp; </div>
                    <div className="px-auto mx-auto"> Dew: {parseFloat(this.props.value.dewpt).toFixed(0)}<sup>o</sup></div>
                </div>
            </div>
        )
    }
}

function DailWeatherMap(props) {

    function getValue() {
        props._selectItem(props._data);
    }
    return (
        <div id={props._data.valid_date} className="live__scroll--box" onClick={getValue}>
            <div>{props.columDay} {props.columDate}</div>
            <img src={props._src} className="d-inline" height="40" width="40" />
            <div><h5 className="d-inline">{parseFloat(props._max_temp).toFixed(0)}</h5><sup>o</sup>&nbsp;&nbsp;&nbsp;&nbsp;<span>{parseFloat(props._min_tem).toFixed(0)}<sup>o</sup></span></div>
            <div><h6>{props.description}</h6></div>
        </div>
    )
}

class DailWeather extends React.Component {
    constructor(props) {
        super(props);
    }
    _onClick = (value) => {
        this.props._getData(value);
    }
    render() {
        var daily = this.props.allWeather.data.map(e => {
            var img = "https://www.weatherbit.io/static/img/icons/" + e.weather.icon + ".png";
            var d = new Date(e.valid_date);
            var day = new Array();
            day[0] = "Sun";
            day[1] = "Mom";
            day[2] = "Tue";
            day[3] = "Wed";
            day[4] = "Thu";
            day[5] = "Fri";
            day[6] = "Sat";
            var _day = day[d.getDay()];
            var _date = d.getDate();
            return (

                <DailWeatherMap key={e.valid_date} _data={e} columDay={_day} columDate={_date} _src={img} _max_temp={e.max_temp} _min_tem={e.min_temp} description={e.weather.description} _selectItem={this._onClick} />
            )
        });
        return (
            <div className="container my-4"><h5>Daily</h5>
                <div className="live__scroll no-gutters" onclick={this.getData}>
                    <div className="row text-center no-gutters">
                        <div className="row">
                            {daily}
                        </div>
                    </div>
                </div>
            </div>
        )

    };
}

class Weather extends React.Component {
    constructor(props) {
        super(props);
        // this.inputRef = React.createRef();

        this.state = ({
            WeatherDaily: [],
            _weatherDaily: {},
            CityNameSearch: "Hanoi",
            noti: "",
            citysearch: "",
            currentid: "",
            preid: "",
            code: "",
            degrees: "",
        });
    }

    componentDidMount = () => {
        fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=" + this.state.CityNameSearch + "&key=dbf137339be7440fa20a84d61d8a4428")
            .then(result => {
                if (result.status == 200) {
                    return result.json()
                }
                else {
                    this.setState({ noti: "Can not find country" });
                    // alert(("error: " + result.statusText))
                }
            })
            .then(WeatherObject => {
                this.setState({
                    WeatherDaily: WeatherObject,
                    _weatherDaily: WeatherObject.data[0],
                    currentid: WeatherObject.data[0].valid_date,

                });
                document.getElementById(this.state.currentid.toString()).className = "live__scroll--box chooseday";


                if (this.state._weatherDaily.weather.code == 200 || this.state._weatherDaily.weather.code == 201 || this.state._weatherDaily.weather.code == 202) {
                    document.body.style.backgroundImage = "url('spaylia-1072748-unsplash.jpg')";
                }
                else if (this.state._weatherDaily.weather.code == 230 || this.state._weatherDaily.weather.code == 231 || this.state._weatherDaily.weather.code == 232 || this.state._weatherDaily.weather.code == 233) {
                    document.body.style.backgroundImage = "url('spaylia-1072748-unsplash.jpg')";
                }
                else if (this.state._weatherDaily.weather.code == 300 || this.state._weatherDaily.weather.code == 301 || this.state._weatherDaily.weather.code == 302) {
                    document.body.style.backgroundImage = "url('light_rain.jpg')";
                }
                else if (this.state._weatherDaily.weather.code == 500 || this.state._weatherDaily.weather.code == 501 || this.state._weatherDaily.weather.code == 502 || this.state._weatherDaily.weather.code == 511 || this.state._weatherDaily.weather.code == 520 || this.state._weatherDaily.weather.code == 521 || this.state._weatherDaily.weather.code == 522 || this.state._weatherDaily.weather.code == 900) {
                    document.body.style.backgroundImage = "url('light_rain.jpg')";
                }
                else if (this.state._weatherDaily.weather.code == 600 || this.state._weatherDaily.weather.code == 601 || this.state._weatherDaily.weather.code == 602 || this.state._weatherDaily.weather.code == 610) {
                    document.body.style.backgroundImage = "url('istock-615101030.jpg')";
                }
                else if (this.state._weatherDaily.weather.code == 611 || this.state._weatherDaily.weather.code == 612) {
                    document.body.style.backgroundImage = "url('jessica-fadel-453102-unsplash.jpg')";
                }
                else if (this.state._weatherDaily.weather.code == 621 || this.state._weatherDaily.weather.code == 622 || this.state._weatherDaily.weather.code == 623) {
                    document.body.style.backgroundImage = "url('jessica-fadel-453102-unsplash.jpg')";
                }
                else if (this.state._weatherDaily.weather.code == 700 || this.state._weatherDaily.weather.code == 711 || this.state._weatherDaily.weather.code == 721 || this.state._weatherDaily.weather.code == 731 || this.state._weatherDaily.weather.code == 741 || this.state._weatherDaily.weather.code == 751) {
                    document.body.style.backgroundImage = "url('timelapse-of-the-mist-and-cloud-in-mount-emei-sichuan-province-china_n1eesla__S0000.jpg')";
                }
                else if (this.state._weatherDaily.weather.code == 800) {
                    document.body.style.backgroundImage = "url('blue-sky.jpg')";
                }
                else if (this.state._weatherDaily.weather.code == 801 || this.state._weatherDaily.weather.code == 802 || this.state._weatherDaily.weather.code == 803) {
                    document.body.style.backgroundImage = "url('blue-sky.jpg')";
                }
                else if (this.state._weatherDaily.weather.code == 804) {
                    document.body.style.backgroundImage = "url('chuttersnap-758542-unsplash.jpg')";
                }
            })

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.degrees !== prevState.degrees) {
            var weatherMain = this.state.WeatherDaily;
            var weatherMap = this.state._weatherDaily;
            if (this.state.degrees == "C") {
                for (var i = 0; i < 16; i++) {
                    weatherMain.data[i].temp = parseFloat((weatherMain.data[i].temp * 1.8) + 32).toFixed(0);
                    weatherMain.data[i].max_temp = parseFloat((weatherMain.data[i].max_temp * 1.8) + 32).toFixed(0);
                    weatherMain.data[i].min_temp = parseFloat((weatherMain.data[i].min_temp * 1.8) + 32).toFixed(0);
                    weatherMain.data[i].app_max_temp = parseFloat((weatherMain.data[i].app_max_temp * 1.8) + 32).toFixed(0);
                }
            }
            else if (this.state.degrees == "F") {
                for (var i = 0; i < 16; i++) {
                    weatherMain.data[i].temp = parseFloat((weatherMain.data[i].temp - 32) / 1.8).toFixed(0);
                    weatherMain.data[i].max_temp = parseFloat((weatherMain.data[i].max_temp - 32) / 1.8).toFixed(0);
                    weatherMain.data[i].min_temp = parseFloat((weatherMain.data[i].min_temp -32) / 1.8).toFixed(0);
                    weatherMain.data[i].app_max_temp = parseFloat((weatherMain.data[i].app_max_temp - 32) /1.8).toFixed(0);
                }
            }

            this.setState({
                WeatherDaily: weatherMain,
                _weatherDaily: weatherMap,
            })
        }
        if (this.state.CityNameSearch !== prevState.CityNameSearch) {
            fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=" + this.state.CityNameSearch + "&key=dbf137339be7440fa20a84d61d8a4428")
                .then(result => {
                    if (result.status == 200) {
                        return result.json()
                    }
                    else {
                        this.setState({ noti: "Can not find country" });

                        // alert(("error: " + result.statusText))
                    }
                })
                .then(WeatherObject => {
                    this.setState({
                        WeatherDaily: WeatherObject,
                        _weatherDaily: WeatherObject.data[0],
                        currentid: WeatherObject.data[0].valid_date,

                    });
                })
        }

        if (this.state.currentid != prevState.currentid) {
            document.getElementById(this.state.currentid.toString()).className = "live__scroll--box chooseday";
            try {
                document.getElementById(this.state.preid).className = "live__scroll--box";
            } catch (error) {

            }
            this.setState({ preid: this.state.currentid })

            if (this.state._weatherDaily.weather.code == 200 || this.state._weatherDaily.weather.code == 201 || this.state._weatherDaily.weather.code == 202) {
                document.body.style.backgroundImage = "url('spaylia-1072748-unsplash.jpg')";
            }
            else if (this.state._weatherDaily.weather.code == 230 || this.state._weatherDaily.weather.code == 231 || this.state._weatherDaily.weather.code == 232 || this.state._weatherDaily.weather.code == 233) {
                document.body.style.backgroundImage = "url('spaylia-1072748-unsplash.jpg')";
            }
            else if (this.state._weatherDaily.weather.code == 300 || this.state._weatherDaily.weather.code == 301 || this.state._weatherDaily.weather.code == 302) {
                document.body.style.backgroundImage = "url('light_rain.jpg')";
            }
            else if (this.state._weatherDaily.weather.code == 500 || this.state._weatherDaily.weather.code == 501 || this.state._weatherDaily.weather.code == 502 || this.state._weatherDaily.weather.code == 511 || this.state._weatherDaily.weather.code == 520 || this.state._weatherDaily.weather.code == 521 || this.state._weatherDaily.weather.code == 522 || this.state._weatherDaily.weather.code == 900) {
                document.body.style.backgroundImage = "url('light_rain.jpg')";
            }
            else if (this.state._weatherDaily.weather.code == 600 || this.state._weatherDaily.weather.code == 601 || this.state._weatherDaily.weather.code == 602 || this.state._weatherDaily.weather.code == 610) {
                document.body.style.backgroundImage = "url('istock-615101030.jpg')";
            }
            else if (this.state._weatherDaily.weather.code == 611 || this.state._weatherDaily.weather.code == 612) {
                document.body.style.backgroundImage = "url('jessica-fadel-453102-unsplash.jpg')";
            }
            else if (this.state._weatherDaily.weather.code == 621 || this.state._weatherDaily.weather.code == 622 || this.state._weatherDaily.weather.code == 623) {
                document.body.style.backgroundImage = "url('jessica-fadel-453102-unsplash.jpg')";
            }
            else if (this.state._weatherDaily.weather.code == 700 || this.state._weatherDaily.weather.code == 711 || this.state._weatherDaily.weather.code == 721 || this.state._weatherDaily.weather.code == 731 || this.state._weatherDaily.weather.code == 741 || this.state._weatherDaily.weather.code == 751) {
                document.body.style.backgroundImage = "url('timelapse-of-the-mist-and-cloud-in-mount-emei-sichuan-province-china_n1eesla__S0000.jpg')";
            }
            else if (this.state._weatherDaily.weather.code == 800) {
                document.body.style.backgroundImage = "url('blue-sky.jpg')";
            }
            else if (this.state._weatherDaily.weather.code == 801 || this.state._weatherDaily.weather.code == 802 || this.state._weatherDaily.weather.code == 803) {
                document.body.style.backgroundImage = "url('blue-sky.jpg')";
            }
            else if (this.state._weatherDaily.weather.code == 804) {
                document.body.style.backgroundImage = "url('chuttersnap-758542-unsplash.jpg')";
            }
        }

    }
    onClickHandel = (value) => {
        var t = value ? "C" : "F";
        this.setState({
            degrees: t,
            citysearch: "",
        })
    }
    onKeyPress = (value) => {
        if (value === 'Enter') {
            this.setState({ CityNameSearch: this.state.citysearch });
            // console.log(value);
            document.getElementById('del').value = "";
        }
    }
    inputz = (value) => {
        this.setState({ citysearch: value });
        // console.log(value);
    }
    __getData = (value) => {
        console.log(value);
        this.setState({ preid: this.state.currentid })
        this.setState({ currentid: value.valid_date.toString() });
        this.setState({ _weatherDaily: value });
    }

    render() {
        var _weatherDaily = this.state.WeatherDaily;
        var vanh = this.state._weatherDaily;
        var city_name = this.state.WeatherDaily.city_name;
        var country_code = this.state.WeatherDaily.country_code;
        if (_weatherDaily.length == 0) {

            return <div></div>;

        }
        var noti = this.state.noti;
        return (
            <div>
                <SearchBar _getValue={this.inputz} confirmSearch={this.onKeyPress} />
                <WeatherOneDay noti={noti} city={city_name} country_code={country_code} value={vanh} _ClickHandle={this.onClickHandel} />
                <DailWeather allWeather={_weatherDaily} _getData={this.__getData} />
            </div>
        );
    }
}

ReactDOM.render(
    <Weather />,
    document.getElementById("root")
)