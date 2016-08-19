import React from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import chartActions from '../actions/chartActions.js';


class PortalMap extends React.Component {
 constructor(props) {
  super(props)
 }

  generateValues(){
    var res = [];
    console.log('props.areas: ',this.props.areas)
    for (var key in this.props.areas) {
      res.push({"id": "US-" + key, "value": this.props.areas[key]})
    }
    return res;
  } 


  updateMap(datas){
  }

  componentWillMount(){
    this.props.dispatchGetMapData();
  } 
  

  render() {

    return (
      <div className="developerContainer">
        <div className="wrapperDiv">
          <form encType="multipart/form-data"
            onSubmit={(e) => {
                e.preventDefault();
                var datas = this.generateValues();
                var place = document.getElementById('myChart');
                var map = AmCharts.makeChart( place, {
                  "type": "map",
                  "theme": "light",
                  "colorSteps": 10,
                  "dataProvider": {
                    "map": "usaLow",
                    "areas": datas
                  },
                  "areasSettings": {
                    "autoZoom": true
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
            <div className="leftSide">

                <br />
                <div>
                <br />
                  <button type='submit' className="form_submit_button">UPDATE MAP</button>
                <br />
                </div>
            </div>
          </form>
          <div className="rightSide" id="canvasHolder" id='myChart'>
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
    dispatchGetMapData: () => {
      dispatch(chartActions.getMapData())
    }    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortalMap);



  // areas: [
  //   {"id": "US-AL", "value": 14}, {"id": "US-AK","value": 6}, {"id": "US-AZ","value": 8}, {"id": "US-AR",
  //       "value": 2}, {"id": "US-CA","value": 23}, {"id": "US-CO","value": 4}, {"id": "US-CT","value": 3
  //     }, {"id": "US-DE","value": 7}, {"id": "US-FL","value": 15}, {"id": "US-GA","value": 8
  //     }, {"id": "US-HI","value": 1}, {"id": "US-ID","value": 1}, {"id": "US-IL","value": 12
  //     }, {"id": "US-IN","value": 6}, {"id": "US-IA","value": 9}, {"id": "US-KS","value": 2
  //     }, {"id": "US-KY","value": 4}, {"id": "US-LA","value": 2}, {"id": "US-ME","value": 12
  //     }, {"id": "US-MD","value": 5}, {"id": "US-MA","value": 6}, {"id": "US-MI","value": 9
  //     }, {"id": "US-MN","value": 4}, {"id": "US-MS","value": 2}, {"id": "US-MO","value": 5
  //     }, {"id": "US-MT","value": 9}, {"id": "US-NE","value": 1}, {"id": "US-NV","value": 1
  //     }, {"id": "US-NH","value": 1}, {"id": "US-NJ","value": 8}, {"id": "US-NM","value": 1
  //     }, {"id": "US-NY","value": 2}, {"id": "US-NC","value": 2}, {"id": "US-ND","value": 2
  //     }, {"id": "US-OH","value": 3}, {"id": "US-OK","value": 3}, {"id": "US-OR","value": 3
  //     }, {"id": "US-PA","value": 2}, {"id": "US-RI","value": 1}, {"id": "US-SC","value": 3
  //     }, {"id": "US-SD","value": 3}, {"id": "US-TN","value": 3}, {"id": "US-TX","value": 2
  //     }, {"id": "US-UT","value": 2}, {"id": "US-VT","value": 3}, {"id": "US-VA","value": 4
  //     }, {"id": "US-WA","value": 5}, {"id": "US-WV","value": 4}, {"id": "US-WI","value": 3
  //     }, {"id": "US-WY","value": 2} 
  // ]

