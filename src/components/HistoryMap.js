import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet';

class HistoryMap extends Component {

  constructor(props) {
    super(props);

    this.handleZoom = this.handleZoom.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
    this.renderMidMarkers = this.renderMidMarkers.bind(this);
    this.renderHistoricalPaths = this.renderHistoricalPaths.bind(this);
    this.renderPath = this.renderPath.bind(this);

    this.midIcon = L.icon({ iconUrl: require('../assets/marker.png') });

    this.state = {
      zoom: 16
    }
  } 

  handleZoom(e) {
    this.setState({zoom: e.target.getZoom()});
  }

  renderMarker(location, label) {
    return (
      <Marker position={[location.latitude, location.longitude]}>
        <Popup>
          { this.props.currentDevice.name } ({label})
          <br/>
          { new Date(location.timestamp).toLocaleString() }
        </Popup>
      </Marker>
    )
  }

  renderMidMarkers(locations) {
    if (this.state.zoom > 17) {
      const midLocations = locations.slice(1, locations.length-1);
      return (
        midLocations.map(location => (
          <Marker key={location.id} icon={this.midIcon} position={[location.latitude, location.longitude]}>
            <Popup>
              { new Date(location.timestamp).toLocaleString() }
            </Popup>
          </Marker>
        ))
      )
    } else {
      return undefined;
    }
  }

  renderPath(locations) {
    if (locations && locations.length > 0) {
      const endLocation = locations[0];
      const startLocation = locations[locations.length-1];

      // Draw path, assumed to be in timestamped order
      var path = [];
      locations.forEach(p => {
        path.push([p.latitude, p.longitude]);
      });
  
      return (
        <div>
          { this.renderMarker(startLocation, "Start") }
          { this.renderMarker(endLocation, "End") }
          <Polyline positions={path}>
            <Popup> { this.props.currentDevice.name } </Popup>
          </Polyline>
          { this.renderMidMarkers(locations) }
        </div>
      )
    } else {
      return undefined; // no location data
    } 
  }

  renderHistoricalPaths() {
    const locations = this.props.history.locations;
    if (locations && locations.length > 0) {      
      let pathToRender = [];
      let renders = [];

      let earlierTime = new Date(locations[0].timestamp);
      locations.forEach(p => {
        // Start a new path if over a minute between locations
        const pTime = new Date(p.timestamp);
        if (earlierTime - pTime > 60000) {
          renders.push(this.renderPath(pathToRender)); // store previous path render 
          pathToRender = []; // restart path
        }

        // Add point to current path
        pathToRender.push(p);
        earlierTime = pTime; // advanced time
      });
      renders.push(this.renderPath(pathToRender));

      return renders;
    } else {
      return undefined; // no location data yet
    }
  }

  render() {
    let focus = [42.304, -83.066];
    if (this.props.history.locations && this.props.history.locations.length > 0) {
      // refocus the map on latest position
      const lat = this.props.history.locations[0].latitude;
      const long = this.props.history.locations[0].longitude;
      focus = [lat, long];
    }

    return (
      <Map style={{height: '85vh'}} center={focus} zoom={this.state.zoom} onZoom={this.handleZoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        { this.renderHistoricalPaths() }
      </Map>
    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.history,
    currentDevice: state.currentDevice
  }
};

export default connect(mapStateToProps)(HistoryMap);
