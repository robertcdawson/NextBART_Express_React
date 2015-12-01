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
    $('.dropdown-toggle').dropdown();

    return (
      <div className="dropdown">
        <button className="btn btn-default dropdown-toggle" type="button" id="stationsDropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          Dropdown
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="stationsDropdownMenu">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something here</a></li>
          <li role="separator" className="divider"></li>
          <li><a href="#">Separated link</a></li>
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
