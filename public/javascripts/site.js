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
    if (etd.estimate) {
      etd.estimate.forEach(function(train, index) {
        arrivalInfo.push(<TrainArrival minutes={train.minutes} length={train.length} key={index} />);
      });
    }
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
    if (trainInfo.station.etd) {
      trainInfo.station.etd.forEach(function(etd, index) {
        destinations.push(<TrainDestination etd={etd} key={index} />);
      });
    }
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
  getInitialState: function() {
    return {
      TrainStationDropdownValue: 'embr'
    }
  },

  handleChange: function(newState) {
    this.setState({
      TrainStationDropdownValue: newState.target.value
    });
    // Update parent's callbackParent property
    this.props.callbackParent(newState.target.value);
  },

  render: function() {
    var TrainStationDropdownValue = this.state.TrainStationDropdownValue;
    return (
      <div className="dropdown">
        <select value={TrainStationDropdownValue} onChange={this.handleChange}>
          <option value="12th">12TH</option>
          <option value="16th">16TH</option>
          <option value="19th">19TH</option>
          <option value="24th">24TH</option>
          <option value="ashb">ASHB</option>
          <option value="balb">BALB</option>
          <option value="bayf">BAYF</option>
          <option value="cast">CAST</option>
          <option value="civc">CIVC</option>
          <option value="cols">COLS</option>
          <option value="colm">COLM</option>
          <option value="conc">CONC</option>
          <option value="daly">DALY</option>
          <option value="dbrk">DBRK</option>
          <option value="dubl">DUBL</option>
          <option value="deln">DELN</option>
          <option value="plza">PLZA</option>
          <option value="embr">EMBR</option>
          <option value="frmt">FRMT</option>
          <option value="ftvl">FTVL</option>
          <option value="glen">GLEN</option>
          <option value="hayw">HAYW</option>
          <option value="lafy">LAFY</option>
          <option value="lake">LAKE</option>
          <option value="mcar">MCAR</option>
          <option value="mlbr">MLBR</option>
          <option value="mont">MONT</option>
          <option value="nbrk">NBRK</option>
          <option value="ncon">NCON</option>
          <option value="oakl">OAKL</option>
          <option value="orin">ORIN</option>
          <option value="pitt">PITT</option>
          <option value="phil">PHIL</option>
          <option value="powl">POWL</option>
          <option value="rich">RICH</option>
          <option value="rock">ROCK</option>
          <option value="sbrn">SBRN</option>
          <option value="sfia">SFIA</option>
          <option value="sanl">SANL</option>
          <option value="shay">SHAY</option>
          <option value="ssan">SSAN</option>
          <option value="ucty">UCTY</option>
          <option value="wcrk">WCRK</option>
          <option value="wdub">WDUB</option>
          <option value="woak">WOAK</option>
        </select>
      </div>
    );
  }
});

// Render train station container
// Parent: FilterableTrainTable
var TrainStationsContainer = React.createClass({
  getInitialState: function() {
    return {
      TrainStationSelected: 'embr'
    }
  },

  onChildChanged: function(newState) {
    this.setState({
      TrainStationSelected: newState
    });
    // Update parent's callbackParent property
    this.props.callbackParent(newState);
  },

  render: function() {
    var trainInfo = this.props.trainInfo;
    console.log('this.state.TrainStationSelected:', this.state.TrainStationSelected);
    return (
      <div>
        <TrainStationDropdown callbackParent={this.onChildChanged} />
        <TrainStationTable trainInfo={trainInfo} />
      </div>
    );
  }
});

// Render outermost container
// Parent: none
var FilterableTrainTable = React.createClass({
  getInitialState: function() {
    return {
      station: 'embr'
    }
  },

  onChildChanged: function(newState) {
    this.setState({
      station: newState
    });
  },

  render: function() {
    var trainInfo;
    var station = this.state.station;
    console.log('station:', station);
    $.ajax({
      url: '/api/' + station,
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
        <TrainStationsContainer trainInfo={trainInfo} callbackParent={this.onChildChanged} />
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
