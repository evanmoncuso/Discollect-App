import React from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import { browserHistory } from 'react-router';
import chartActions from '../actions/chartActions.js';


class PortalMap extends React.Component {
 constructor(props) {
  super(props)
 }

  generateMinMax() {
    let array = [];
    for (let key in this.props.areas) {
      array.push(this.props.areas[key])
    }
    array.sort( function(a,b) {
      return a - b;
    })
    var min = Math.floor(array[0]);
    var max = Math.floor(array[array.length-1]);
    return [min, max];
  }

  generateValues(){
    var res = [];
    for (var key in this.props.areas) {
      res.push({"id": "US-" + key, "value": this.props.areas[key]})
    }
    return res;
  }


  updateMap(){
    var datas = this.generateValues();
    var ends = this.generateMinMax();
    var min = ends[0];
    var max = ends[1];
    console.log('min and max: ', min, max)
    var place = document.getElementById('myMap');
    var map = AmCharts.makeChart( place, {
      "type": "map",
      "theme": "chalk",
      "colorSteps": 30,
      "dataProvider": {
        "map": "usaLow",
        "areas": datas,
      },
      "areasSettings": {
        "autoZoom": false
      },
      "zoomControl": {
        "homeButtonEnabled": false
      },
      "valueLegend": {
        "right": 10,
        "minValue": min,
        "maxValue": max,
        'fontSize': 15,
        'color': 'white',
      },
      "export": {
        "enabled": true
      }
    });
  }

  render() {
    return (
      <div className="main_container developerContainer">
        <div className="wrapperDiv">
            <div className="mapVis" id='mapTitle'>
            Density of <br />Discollect users, <br />
            state by state.
            </div>
          <form encType="multipart/form-data"
            onSubmit={(e) => {
                e.preventDefault();
                // document.getElementById("mapTitle").("display");
                document.getElementById("mapTitle").className = "mapText";
                var updater = this.updateMap.bind(this);
                this.props.dispatchGetMapData(updater);
                var datas = this.generateValues();
                var place = document.getElementById('myMap');
                var map = AmCharts.makeChart( place, {
                  "type": "map",
                  "theme": "chalk",
                  "colorSteps": 20,
                  "dataProvider": {
                    "map": "usaLow",
                    "areas": datas
                  },
                  "areasSettings": {
                    "autoZoom": false
                  },
                  "valueLegend": {
                    "right": 10,
                    "minValue": "little",
                    "maxValue": "a lot!"
                  },
                  "export": {
                    "enabled": true
                  }
                });
                // console.log('into form - collecting state data: ', this.props.areas)
                 // this.props.dispatchGetMapData();
                  // setTimeout(this.updateChart.bind(this), 1200)
            }}>
            <div className="leftMapSide">

                <br />
                <div>
                <br />
                <br />
                <br />
                <div className="button_container">
                  <button type='submit' className="yellow_button">
                    Generate Map
                  </button>
                </div>
                <br />
                <br />
                </div>
                <div className="button_container">
                  <button className="yellow_button" onClick={(e)=>{
                      e.preventDefault();
                      browserHistory.push('/portal');
                  }}>
                    Return to Charts
                  </button>
                </div>
            </div>
          </form>
          <div className="mapSide" id="myMap">
          </div>
      </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    areas: state.devMap,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetChartData: (info) => {
      dispatch(chartActions.getChartData(info))
    },
    dispatchGetMapData: (updater) => {
      dispatch(chartActions.getMapData(updater))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortalMap);
