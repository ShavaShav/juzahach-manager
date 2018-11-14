import React, {Component} from 'react'
import { Map, TileLayer } from 'react-leaflet'

class HistoryMap extends Component {

  constructor(props) {
    super(props);

    this.handleZoom = this.handleZoom.bind(this);

    this.state = {
      zoom: 16
    }
  } 

  handleZoom(e) {
    this.setState({zoom: e.target.getZoom()});
  }

  render() {
    let focus = [42.304, -83.066];

    return (
      <Map style={{height: '85vh'}} center={focus} zoom={this.state.zoom} onZoom={this.handleZoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
      </Map>
    );
  }
}


export default HistoryMap;