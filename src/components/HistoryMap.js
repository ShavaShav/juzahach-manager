import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

class HistoryMap extends Component {

  constructor(props) {
    super(props);

    this.handleZoom = this.handleZoom.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
    this.renderHistoricalPath = this.renderHistoricalPath.bind(this);

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

  renderHistoricalPath() {
    const locations =  this.props.historyMap.locations;
    if (locations && locations.length > 0) {
      const endLocation = locations[0];
      const startLocation = locations[locations.length-1];

      // Locations are assumed to be in timestamped order
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
        </div>
      )
    } else {
      return undefined; // no location data yet
    }
  }

  render() {
    let focus = [42.304, -83.066];

    return (
      <Map style={{height: '85vh'}} center={focus} zoom={this.state.zoom} onZoom={this.handleZoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        { this.renderHistoricalPath() }
      </Map>
    );
  }
}

const mapStateToProps = state => {
  return {
    historyMap: state.historyMap,
    currentDevice: state.currentDevice
  }
};

export default connect(mapStateToProps)(HistoryMap);
