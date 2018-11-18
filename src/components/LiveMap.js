import React, {Component} from 'react'
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import { connect } from 'react-redux';

import { fetchLiveLocations } from '../actions';

class LiveMap extends Component {

  constructor(props) {
    super(props);
    this.updateLiveLocations = this.updateLiveLocations.bind(this);
    this.renderLiveLocations = this.renderLiveLocations.bind(this);
    this.renderLiveLocation = this.renderLiveLocation.bind(this);
    this.handleZoom = this.handleZoom.bind(this);

    this.fetchTimer = undefined;

    this.state = {
      zoom: 16,
      fetchTime: new Date() 
    }
  } 

  handleZoom(e) {
    this.setState({zoom: e.target.getZoom()});
  }

  componentDidMount() {
    this.props.fetchLiveLocations(this.props.live.trailLength); // get the latest location

    // Fetch the live locations according to update speed and trail length
    this.fetchTimer = setInterval(this.updateLiveLocations, 60000 / this.props.live.updatesPerMin);
  }

  componentWillReceiveProps(nextProps) {
    // Changing the fetch inteval, stop the timer
    if (nextProps.live.updatesPerMin !== this.props.live.updatesPerMin) {
      clearInterval(this.fetchTimer);
      this.fetchTimer = setInterval(this.updateLiveLocations, 60000 / this.props.live.updatesPerMin);
    }
  }

  componentWillUnmount() {
    clearInterval(this.fetchTimer);
  }

  updateLiveLocations() {
    const startTime = new Date(); 
    startTime.setMinutes(startTime.getMinutes() - 30);
    // TODO: let user set trail length via pagination
    this.props.fetchLiveLocations(this.props.live.trailLength); // latest for each device
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
    if (this.props.live.locations) {
      return (
        <div>
          { 
            this.props.live.locations.map(deviceLocations => (
              deviceLocations.location.length > 0 ?
                this.renderLiveLocation(deviceLocations) : undefined
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
    if (this.props.live.locations && this.props.currentDevice) {
      // refocus the map on currently selected device's position
      const currLoc = this.props.live.locations.find(deviceLocation => {
        return deviceLocation.id === this.props.currentDevice.id
      });

      // If selected device contains location data
      if (currLoc.location.length > 0) {
        const lat = currLoc.location[0].latitude;
        const long = currLoc.location[0].longitude;
        focus = [lat, long];
      }
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
    live: state.live
  }
};

const mapDispatchToProps = {
  fetchLiveLocations
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveMap);