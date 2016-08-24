import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox, DrawingManager } from 'react-google-maps';
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
    // console.log('GOOOOOOOOGLE: ', google);
  }
  handleMapClick(event) {
    // console.log('from goog map: ', event);
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
    console.log('from map comp: ', this.state.marker.position.lat(), this.state.marker.position.lng());
  }
  handlePlacesChanged() {
    const places = this.searchBox.getPlaces();
    console.log(places[0].geometry.location.lat(), places[0].geometry.location.lng());
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
    // const inputStyle = {
    //   border: `1px solid transparent`,
    //   borderRadius: `1px`,
    //   boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    //   boxSizing: `border-box`,
    //   MozBoxSizing: `border-box`,
    //   fontSize: `14px`,
    //   height: `32px`,
    //   marginTop: `27px`,
    //   outline: `none`,
    //   padding: `0 12px`,
    //   textOverflow: `ellipses`,
    //   width: `400px`,
    // };
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
  // changeCoords: React.PropTypes.function,
};

const mapStateToProps = (state) => {
  return {
    userGeoCoords: [state.users.coords[0], state.users.coords[1]],
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    // commitSearch: (query) => {
    //   dispatch(userActions.searchItem(query));
    // },
  }
);

// export default GoogMap;

export default connect(mapStateToProps, mapDispatchToProps)(GoogMap);
