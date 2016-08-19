import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
// import { default as update } from "react-addons-update";
// import { default as canUseDOM } from "can-use-dom";
import { connect } from 'react-redux';
// import userActions from '../actions/userActions.js';

class GoogMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: {
        position: {
          lat: this.props.userGeoCoords[0],
          lng: this.props.userGeoCoords[1],
        },
        key: 'Taiwan',
        defaultAnimation: 2,
      },
    };
    this.handleMapClick.bind(this);
  }
  handleMapClick(event) {
    let newMarker = this.state.marker;
    newMarker.position.lat = 37.4219999;
    newMarker.position.lng = -122.0840575;
    this.setState({
      marker: newMarker,
    });
    console.log(this.state.marker, event);
  }
  render() {
    return (
      <GoogleMapLoader
        containerElement={<div style={{ height: '100%' }} />}
        googleMapElement={
          <GoogleMap
            defaultZoom={12}
            defaultCenter={{ lat: this.props.userGeoCoords[0], lng: this.props.userGeoCoords[1] }}
            onClick={event => this.handleMapClick(event)}
          >
            <Marker {...this.state.marker} />
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
    // commitSearch: (query) => {
    //   dispatch(userActions.searchItem(query));
    // },
  }
);

// export default GoogMap;

export default connect(mapStateToProps, mapDispatchToProps)(GoogMap);
