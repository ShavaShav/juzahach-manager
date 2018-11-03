import React, {Component} from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'


class RoadMap extends Component {
  constructor() {
    super()
    this.state = {
      lat: 42.304,
      lng: -83.066,
      zoom: 13
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map style={{height: '85vh'}} center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            this.props.currentDevice
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default RoadMap;