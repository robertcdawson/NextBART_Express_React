// Render train arrival in minutes and number of train cars
// Parent: TrainDestination
var TrainArrival = React.createClass({
  render: function() {
    var minutes = this.props.minutes;
    var length = this.props.length;
    return (
      <table className="table table-bordered text-center">
        <tbody>
          <tr>
            <td className="col-xs-6">
              <h1>{minutes}</h1>
              <p className="text-uppercase text-muted">Minutes</p>
            </td>
            <td className="col-xs-6">
            <h1>{length}</h1>
            <p className="text-uppercase text-muted">Cars</p>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
});

// Render train destination
// Parent: TrainStationTable
var TrainDestination = React.createClass({
  render: function() {
    var etd = this.props.etd;
    var destination = etd.destination;
    var arrivalInfo = [];
    etd.estimate.forEach(function(train, index) {
      arrivalInfo.push(<TrainArrival minutes={train.minutes} length={train.length} key={index} />);
    });
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>{destination}</h3>
        </div>
        <div className="panel-body">
          {arrivalInfo}
        </div>
      </div>
    );
  }
});

// Render train station name
// Parent: TrainStationTable
var TrainStationHeading = React.createClass({
  render: function() {
    var stationName = this.props.trainInfo.station.name;
    return (
      <div>
        <h2>{stationName}</h2>
      </div>
    );
  }
});

// Render train station heading
// Parent: TrainStationsContainer
var TrainStationTable = React.createClass({
  render: function() {
    var trainInfo = this.props.trainInfo;
    var destinations = [];
    trainInfo.station.etd.forEach(function(etd, index) {
      destinations.push(<TrainDestination etd={etd} key={index} />);
    });
    return (
      <div>
        <TrainStationHeading trainInfo={trainInfo} />
        {destinations}
      </div>
    );
  }
});

// Render station dropdown menu
// Parent: TrainStationsContainer
var TrainStationDropdown = React.createClass({
  render: function() {
    return (
      <div className="dropdown">
        <button className="btn btn-default dropdown-toggle" type="button" id="stationsDropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          Dropdown
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="stationsDropdownMenu">
          <li id="12th"><a href="#">12TH</a></li>
          <li id="16th"><a href="#">16TH</a></li>
          <li id="19th"><a href="#">19TH</a></li>
          <li id="24th"><a href="#">24TH</a></li>
          <li id="ashb"><a href="#">ASHB</a></li>
          <li id="balb"><a href="#">BALB</a></li>
          <li id="bayf"><a href="#">BAYF</a></li>
          <li id="cast"><a href="#">CAST</a></li>
          <li id="civc"><a href="#">CIVC</a></li>
          <li id="cols"><a href="#">COLS</a></li>
          <li id="colm"><a href="#">COLM</a></li>
          <li id="conc"><a href="#">CONC</a></li>
          <li id="daly"><a href="#">DALY</a></li>
          <li id="dbrk"><a href="#">DBRK</a></li>
          <li id="dubl"><a href="#">DUBL</a></li>
          <li id="deln"><a href="#">DELN</a></li>
          <li id="plza"><a href="#">PLZA</a></li>
          <li id="embr"><a href="#">EMBR</a></li>
          <li id="frmt"><a href="#">FRMT</a></li>
          <li id="ftvl"><a href="#">FTVL</a></li>
          <li id="glen"><a href="#">GLEN</a></li>
          <li id="hayw"><a href="#">HAYW</a></li>
          <li id="lafy"><a href="#">LAFY</a></li>
          <li id="lake"><a href="#">LAKE</a></li>
          <li id="mcar"><a href="#">MCAR</a></li>
          <li id="mlbr"><a href="#">MLBR</a></li>
          <li id="mont"><a href="#">MONT</a></li>
          <li id="nbrk"><a href="#">NBRK</a></li>
          <li id="ncon"><a href="#">NCON</a></li>
          <li id="oakl"><a href="#">OAKL</a></li>
          <li id="orin"><a href="#">ORIN</a></li>
          <li id="pitt"><a href="#">PITT</a></li>
          <li id="phil"><a href="#">PHIL</a></li>
          <li id="powl"><a href="#">POWL</a></li>
          <li id="rich"><a href="#">RICH</a></li>
          <li id="rock"><a href="#">ROCK</a></li>
          <li id="sbrn"><a href="#">SBRN</a></li>
          <li id="sfia"><a href="#">SFIA</a></li>
          <li id="sanl"><a href="#">SANL</a></li>
          <li id="shay"><a href="#">SHAY</a></li>
          <li id="ssan"><a href="#">SSAN</a></li>
          <li id="ucty"><a href="#">UCTY</a></li>
          <li id="wcrk"><a href="#">WCRK</a></li>
          <li id="wdub"><a href="#">WDUB</a></li>
          <li id="woak"><a href="#">WOAK</a></li>
        </ul>
      </div>
    );
  }
});

// Render train station container
// Parent: FilterableTrainTable
var TrainStationsContainer = React.createClass({
  render: function() {
    var trainInfo = this.props.trainInfo;
    return (
      <div>
        <TrainStationDropdown />
        <TrainStationTable trainInfo={trainInfo} />
      </div>
    );
  }
});

// Render outermost container
// Parent: none
var FilterableTrainTable = React.createClass({
  render: function() {
    var trainInfo;

    $.ajax({
      url: '/api',
      type: 'get',
      async: false,
      success: function(data) {
        var oParser = new DOMParser();
        var oDOM = oParser.parseFromString(data, "text/xml");
        var myObject = getJXONTree(oDOM);
        var myObjectRoot = myObject.root;
        trainInfo = myObjectRoot;
      }
    });

    return (
      <div>
        <div className="page-header">
          <h1>NextBART<br/><small>Find your next train</small></h1>
        </div>
        <TrainStationsContainer trainInfo={trainInfo} />
      </div>
    );
  }
});

// Render FilterableTrainTable
// Parent: none
ReactDOM.render(
  <FilterableTrainTable />,
  document.getElementById('container')
);
