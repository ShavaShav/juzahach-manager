import React, {Component} from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { connect } from 'react-redux';

import { fetchLocations } from '../actions';

class RoadMap extends Component {

  // TODO: Add options to get historical (start and end times)
  // location data via time ranger. We're already set up
  // to render multiple markers for a device

  constructor(props) {
    super(props);
    this.fetchLiveLocation = this.fetchLiveLocation.bind(this);
    this.renderMarkers = this.renderMarkers.bind(this);
  } 

  componentDidMount() {
    // Fetch the latest location every 10 seconds
    this.fetchLiveLocation();
    setInterval(this.fetchLiveLocation, 10000);
  }

  fetchLiveLocation() {
    if (this.props.currentDevice) {
      this.props.fetchLocations(this.props.currentDevice.id, 1);
    }
  }

  renderMarkers() {
    if (this.props.currentDevice && this.props.currentLocations) {
      const deviceName = this.props.currentDevice.name;
      return (
        <div>
          { this.props.currentLocations.map(location => (
            <Marker key={location.id} position={[location.latitude, location.longitude]}>
              <Popup>
                { deviceName }
                <br/>
                { new Date(location.timestamp).toLocaleString() }
              </Popup>
            </Marker>
          ))}
        </div>
      )
    } else {
      return undefined;
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
      { this.renderMarkers() }
      </Map>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentDevice: state.currentDevice,
    currentLocations: state.currentLocations
  }
};

const mapDispatchToProps = {
  fetchLocations
};

export default connect(mapStateToProps, mapDispatchToProps)(RoadMap);