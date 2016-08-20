import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox } from 'react-google-maps';
import { default as update } from "react-addons-update";
// import { default as canUseDOM } from "can-use-dom";
import { connect } from 'react-redux';
// import userActions from '../actions/userActions.js';

class GoogMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: {
        position: {
          lat: this.props.userGeoCoords[0] || 37.4219999,
          lng: this.props.userGeoCoords[1] || -122.0840575,
        },
        key: 'Taiwan',
        defaultAnimation: 2,
      },
    };
    this.handleMapClick.bind(this);
  }
  handleMapClick(event) {
    // console.log(typeof this.props.changeCoords);
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
  render() {
    return (
      <GoogleMapLoader
        containerElement={<div className="reactGoogleMap_containerElement" style={{ height: '100%' }} />}
        query={{ libraries: 'geometry,drawing,places,visualization' }}
        googleMapElement={
          <GoogleMap
            defaultZoom={12}
            defaultCenter={{ lat: this.props.userGeoCoords[0], lng: this.props.userGeoCoords[1] }}
            onClick={(e)=>this.handleMapClick(e)}
          >
            <Marker {...this.state.marker} draggable={false} />
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
