import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox, DrawingManager, ScriptjsLoader } from 'react-google-maps';
import { default as update } from 'react-addons-update';
import { connect } from 'react-redux';

class GoogMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: {
        position: {
          lat: this.props.userGeoCoords[0],
          lng: this.props.userGeoCoords[1],
        },
        key: 'SF',
        defaultAnimation: 2,
      },
      mapCenter: {
        lat: this.props.userGeoCoords[0],
        lng: this.props.userGeoCoords[1],
      }
    };
    this.handleMapClick.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
  }
  handleMapClick(event) {
    let marker = this.state.marker;
    let newMarker = update(marker, {
      $set: {
        position: event.latLng,
        key: 'SF',
        defaultAnimation: 2,
      },
    });
    this.setState({
      marker: newMarker,
    });
    this.props.changeCoords(this.state.marker.position.lat(), this.state.marker.position.lng());
  }
  handlePlacesChanged() {
    const places = this.searchBox.getPlaces();
    console.log(places, places[0]);
    this.props.changeCoords(places[0].geometry.location.lat(), places[0].geometry.location.lng());
    this.setState({
      mapCenter: {
        lat: places[0].geometry.location.lat(),
        lng: places[0].geometry.location.lng(),
      },
      marker: {
        position: {
          lat: places[0].geometry.location.lat(),
          lng: places[0].geometry.location.lng(),
        },
      },
    });
  }
  render() {
    return (
      <GoogleMapLoader
        containerElement={<div className='reactGoogleMap_containerElement' style={{ height: '100%' }} />}
        query={{ libraries: 'geometry,drawing,places,visualization' }}
        googleMapElement={
          <GoogleMap
            defaultZoom={12}
            center={{ lat: this.state.mapCenter.lat, lng: this.state.mapCenter.lng }}
            onClick={(e)=>this.handleMapClick(e)}
          >
            <SearchBox
              controlPosition={google.maps.ControlPosition.TOP_LEFT}
              onPlacesChanged={this.handlePlacesChanged}
              style={{ width: '200px', height: '32px', fontSize: '14px', margin: '5px' }}
              placeholder="Enter Address Here..."
              ref={node => { this.searchBox = node; }}
            />
            <Marker {...this.state.marker} draggable={true} />
          </GoogleMap>
        }
      />
    );
  }
}


GoogMap.propTypes = {
  userGeoCoords: React.PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    userGeoCoords: [state.users.coords[0], state.users.coords[1]],
  };
};

const mapDispatchToProps = (dispatch) => (
  {

  }
);
export default connect(mapStateToProps, mapDispatchToProps)(GoogMap);
