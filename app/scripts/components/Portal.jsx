import React from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import chartActions from '../actions/chartActions.js';
import Promise from 'bluebird';


class Portal extends React.Component {
 constructor(props) {
  super(props)
 }

  randomColorGenerator(){
    return "rgba(" + Math.ceil(Math.random() * 255) + ', ' 
    + Math.ceil(Math.random() * 255) + ', ' 
    + Math.ceil(Math.random() * 255) + ', '
    + '1)';
  }  

  backgroundColors(){
    var arr = [];
    if (this.props.labels.length > 0){
      for (var i = 0; i < this.props.labels.length; i ++) {
        arr.push(this.randomColorGenerator());
      }
      return arr;
    }
  }  

  updateChart() {
    // myChart.destroy();
    var canvas = document.getElementById("myChart").getContext("2d");
    canvas.clearRect(10,10,500,500);
    var myChart = new Chart(canvas, {
      type: this.props.type1,
      data: {
          labels: this.props.labels,
          datasets: [{
              label: this.props.label,
              data: this.props.data,
              backgroundColor: this.backgroundColors(),
              borderColor: 'white',
              borderWidth: 2
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });
  }

  componentDidMount(){
    var canvas = document.getElementById("myChart");
    var ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
      type: this.props.type1,
      data: {
          labels: this.props.labels,
          datasets: [{
              label: this.props.label,
              data: this.props.data,
              backgroundColor: this.backgroundColors(),
              borderColor: 'white',
              borderWidth: 2
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });
  }


  render() {
    let category1;
    let category2;
    let category3;
    let category4;
    let category5;
    let category6;
    return (
      <div className="developerContainer">
        <div className="wrapperDiv">
          <form encType="multipart/form-data"
            onSubmit={(e) => {
                e.preventDefault();
                const info = {
                  cat1: category1.value,
                  cat2: category2.value,
                  cat3: category3.value,
                  cat4: category4.value,
                  cat5: category5.value,
                  cat6: category6.value,
                };
                console.log('*************click data captured!: ',info.category);
                  this.props.dispatchGetChartData(info);
                  category1.value = "all-categories";
                  category2.value = "all-categories";
                  category3.value = "all-categories";
                  category4.value = "all-categories";
                  category5.value = "all-categories";
                  category6.value = "all-categories";
                  setTimeout(this.updateChart.bind(this), 1000)
            }}>
            <div className="leftSide">
              <div className="auth_input">
                <label htmlFor="date_range" >Date Range</label><br />
                  <select  id="date_range" required>
                    <option value="5">Cool date component thingy</option>
                  </select>
              </div>
               <div className="auth_input">
                <label htmlFor="category1" >Y-Axis</label>
                  <select ref={(node) => { category1 = node; }}  id="category1" required>
                    <option value="all-categories">All Categories</option>
                    <option value="appliances">Appliances</option>
                    <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
                    <option value="furniture">Furniture</option>
                    <option value="books">Books</option>
                    <option value="electronics">Electronics</option>
                    <option value="tools">Tools &amp; Home Improvement</option>
                  </select>
              </div>                
              <div className="auth_input">
                <label htmlFor="category2" >Y-Axis</label>
                  <select ref={(node) => { category2 = node; }}  id="category2" required>
                    <option value="all-categories">All Categories</option>
                    <option value="appliances">Appliances</option>
                    <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
                    <option value="furniture">Furniture</option>
                    <option value="books">Books</option>
                    <option value="electronics">Electronics</option>
                    <option value="tools">Tools &amp; Home Improvement</option>
                  </select>
              </div>                
              <div className="auth_input">
                <label htmlFor="category3" >Y-Axis</label>
                  <select ref={(node) => { category3 = node; }}  id="category3" required>
                    <option value="all-categories">All Categories</option>
                    <option value="appliances">Appliances</option>
                    <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
                    <option value="furniture">Furniture</option>
                    <option value="books">Books</option>
                    <option value="electronics">Electronics</option>
                    <option value="tools">Tools &amp; Home Improvement</option>
                  </select>
              </div>
              <div className="auth_input">
                <label htmlFor="category4" >Y-Axis</label>
                  <select ref={(node) => { category4 = node; }}  id="category4" required>
                    <option value="all-categories">All Categories</option>
                    <option value="appliances">Appliances</option>
                    <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
                    <option value="furniture">Furniture</option>
                    <option value="books">Books</option>
                    <option value="electronics">Electronics</option>
                    <option value="tools">Tools &amp; Home Improvement</option>
                  </select>
              </div>
              <div className="auth_input">
                <label htmlFor="category5" >Y-Axis</label>
                  <select ref={(node) => { category5 = node; }}  id="category5" required>
                    <option value="all-categories">All Categories</option>
                    <option value="appliances">Appliances</option>
                    <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
                    <option value="furniture">Furniture</option>
                    <option value="books">Books</option>
                    <option value="electronics">Electronics</option>
                    <option value="tools">Tools &amp; Home Improvement</option>
                  </select>
              </div>               
              <div className="auth_input">
                <label htmlFor="category6" >Y-Axis</label>
                  <select ref={(node) => { category6 = node; }}  id="category6" required>
                    <option value="all-categories">All Categories</option>
                    <option value="appliances">Appliances</option>
                    <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
                    <option value="furniture">Furniture</option>
                    <option value="books">Books</option>
                    <option value="electronics">Electronics</option>
                    <option value="tools">Tools &amp; Home Improvement</option>
                  </select>
              </div>            
              <div>
                <label htmlFor="chartType" >Chart Type</label><br />
                <button>PIE</button><button>BAR</button><button>LINE</button><br /><br />
                <button type='submit' className="form_submit_button">CREATE CHART</button>
              </div>
            </div>
          </form>
          <div className="rightSide" id="canvasHolder">
            <canvas id="myChart" width="500" height="500"></canvas>
          </div>
      </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    type1: state.devChart.type1,
    data: state.devChart.data,
    labels: state.devChart.labels,
    label: state.devChart.label,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetChartData: (info) => {
      dispatch(chartActions.getChartData(info))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portal);



