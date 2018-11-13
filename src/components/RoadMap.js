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
    this.renderLiveOverlay = this.renderLiveOverlay.bind(this);
    this.renderLiveLocation = this.renderLiveLocation.bind(this);
  } 

  componentDidMount() {
    // Fetch the latest locations every 5 seconds
    this.updateLiveLocations();
    setInterval(this.updateLiveLocations, 5000);
  }

  updateLiveLocations() {
    if (this.props.deviceList && this.props.deviceList.length > 0) {
      this.props.fetchLiveLocations(10); // latest for each device
    }
  }

  renderLiveLocation(deviceLocations) {

    // Device *always* contains at least most recent location
    const location = deviceLocations.location[0];

    // Locations are assumed to be in timestamped order
    var path = [];
    deviceLocations.location.forEach(p => {
      console.log(p);
      path.push([p.latitude, p.longitude]);
    });

    return (
      <div>
        <Marker key={location.id} position={[location.latitude, location.longitude]}>
          <Popup>
            { deviceLocations.name }
            <br/>
            { new Date(location.timestamp).toLocaleString() }
          </Popup>
        </Marker>
        <Polyline positions={path}/>
      </div>
    )
  }

  renderLiveOverlay() {
    // TODO: Use custom markers (Disabled, coloured to diff, etc.)
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
    const uWindsor = [42.304, -83.066];
    return (
      <Map style={{height: '85vh'}} center={uWindsor} zoom={16}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
      { this.renderLiveOverlay() }
      </Map>
    );
  }
}

const mapStateToProps = state => {
  return {
    deviceList: state.deviceList,
    liveLocations: state.liveLocations
  }
};

const mapDispatchToProps = {
  fetchLiveLocations
};

export default connect(mapStateToProps, mapDispatchToProps)(RoadMap);