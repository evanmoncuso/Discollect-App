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
    // console.log(event);
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
    // console.log(this.state.marker.position.lat(), this.state.marker.position.lng());
  }
  render() {
    return (
      <GoogleMapLoader
        containerElement={<div style={{ height: '100%' }} />}
        query={{ libraries: 'geometry,drawing,places,visualization' }}
        onClick={(e) => {console.log('dbc',e);}}
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
