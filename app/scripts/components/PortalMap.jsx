import React from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import chartActions from '../actions/chartActions.js';


class PortalMap extends React.Component {
 constructor(props) {
  super(props)
 }

  generateMinMax() {
    var array = [];
    for (var key in this.props.areas) {
      array.push(this.props.areas[key])
    }
    console.log('building minMax array: ', array)
    array = array.sort( function(a,b) {
      return a > b
    })
    var min = Math.floor(array[0]);
    var max = Math.floor(array[array.length-1]);
    console.log('ooooooo',min, max)
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
      "colorSteps": 20,
      "dataProvider": {
        "map": "usaLow",
        "areas": datas,
      },
      "areasSettings": {
        "autoZoom": false
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
      <div className="developerContainer">
        <div className="wrapperDiv">
          <form encType="multipart/form-data"
            onSubmit={(e) => {
                e.preventDefault();
                var updater = this.updateMap.bind(this);
                this.props.dispatchGetMapData(updater);     
            }}>
            <div className="leftMapSide">

                <br />
                <div>
                <br />
                  <button type='submit' className="form_submit_button">Generate <br /> MAP</button>
                <br />
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



