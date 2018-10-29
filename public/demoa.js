class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            search: "",
            cities: []
        });
    }
    // componentDidMount(){
    //     this.setState({search: "h"})
    // }``   
    onChangez = (e) => {
        this.setState({ search: e.target.value });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.search !== prevState.search) {
            var url2 = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=%09dcAMLNle138ZDrNtA5t0IKuY9u9AEg9r&q=" + this.state.search;
            fetch(url2).then(response2 => {
                if (response2.status == 200) {
                    return response2.json()
                }
                else {
                    alert("error " + response2.statusText)
                }
            }).then(listcity => {
                this.setState({ cities: listcity })
            })
        }
    }
    render() {
        if (this.state.cities.length != 0) {
            var x = this.state.cities.map(e => {
                return <div key={e.Key}>{e.LocalizedName}</div>;
            })
            return (<div>
                <input className="d-block" onChange={this.onChangez}/>
                
            </div>)
        }


        return (
        <div>
            <input className="d-block" onChange={this.onChangez} /> 
        </div>)

    }
}

ReactDOM.render(
    <Search/>,
    document.getElementById('root')
)