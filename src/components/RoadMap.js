import React, {Component} from 'react'
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import { connect } from 'react-redux';

import { fetchLiveLocations } from '../actions';

class RoadMap extends Component {

  // TODO: Add options to get historical (start and end times)
  // location data via time ranger. We're already set up
  // to render multiple markers for a device

  constructor(props) {
    super(props);
    this.updateLiveLocations = this.updateLiveLocations.bind(this);
    this.renderLiveLocations = this.renderLiveLocations.bind(this);
    this.renderLiveLocation = this.renderLiveLocation.bind(this);
    this.handleZoom = this.handleZoom.bind(this);

    this.state = {
      zoom: 16 
    }
  } 

  handleZoom(e) {
    this.setState({zoom: e.target.getZoom()});
  }

  componentDidMount() {
    // Fetch the latest locations every 5 seconds
    this.updateLiveLocations();
    setInterval(this.updateLiveLocations, 5000);
  }

  updateLiveLocations() {
    // TODO: let user set trail length via pagination
    this.props.fetchLiveLocations(10); // latest for each device
  }

  renderLiveLocation(deviceLocations) {
    let opacity = 1;
    if (this.props.currentDevice && 
      deviceLocations.id !== this.props.currentDevice.id) {
        opacity = 0.5; // dim non-selected device
    }

    // Device *always* contains at least most recent location
    const location = deviceLocations.location[0];

    // Locations are assumed to be in timestamped order
    var path = [];
    deviceLocations.location.forEach(p => {
      path.push([p.latitude, p.longitude]);
    });

    return (
      <div key={location.id}>
        <Marker opacity={opacity} position={[location.latitude, location.longitude]}>
          <Popup>
            { deviceLocations.name }
            <br/>
            { new Date(location.timestamp).toLocaleString() }
          </Popup>
        </Marker>
        <Polyline positions={path} opacity={opacity}>
          <Popup>
              { deviceLocations.name }
          </Popup>
        </Polyline>
      </div>
    )
  }

  renderLiveLocations() {
    if (this.props.liveLocations) {
      return (
        <div>
          { 
            this.props.liveLocations.map(deviceLocations => (
              this.renderLiveLocation(deviceLocations)
            ))
          }
        </div>
      )
    } else {
      return undefined; // no location data yet
    }
  }

  render() {
    let focus = [42.304, -83.066];
    if (this.props.liveLocations && this.props.currentDevice) {
      // refocus the map on currently selected device's position
      const currLoc = this.props.liveLocations.find(deviceLocation => {
        return deviceLocation.id === this.props.currentDevice.id
      });
      const lat = currLoc.location[0].latitude;
      const long = currLoc.location[0].longitude;
      focus = [lat, long];
    }

    return (
      <Map style={{height: '85vh'}} center={focus} zoom={this.state.zoom} onZoom={this.handleZoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
      { this.renderLiveLocations() }
      </Map>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentDevice: state.currentDevice,
    deviceList: state.deviceList,
    liveLocations: state.liveLocations
  }
};

const mapDispatchToProps = {
  fetchLiveLocations
};

export default connect(mapStateToProps, mapDispatchToProps)(RoadMap);