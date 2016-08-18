import React from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import chartActions from '../actions/chartActions.js';


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
    console.log('updating chart')    
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
    let dateRange;
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
                  dateRange: dateRange.value,
                };
                  this.props.dispatchGetChartData(info);
                  category1.value = "None";
                  category2.value = "None";
                  category3.value = "None";
                  category4.value = "None";
                  category5.value = "None";
                  category6.value = "None";
                  setTimeout(this.updateChart.bind(this), 1200)
            }}>
            <div className="leftSide">

                  <div className="auth_input">
                  <label htmlFor="dateRange" >Select your time-span</label><br />
                      <select ref={(node) => { dateRange = node; }}  id="dateRange" required>
                        <option value="hour">Past hour</option>
                        <option value="day">Past day</option>
                        <option value="month">Past month</option>
                        <option value="threeMonths">Past 3 months</option>
                        <option value="sixMonths">Past 6 months</option>
                        <option value="year">Past year</option>
                      </select>
                  </div>

                   <div className="auth_input">
                   <h2>Pick up to 6 categories</h2><br />
                    <label htmlFor="category1" ></label>
                      <select ref={(node) => { category1 = node; }}  id="category1" required>
                        <option value="None">None</option>
                        <option value="appliances">Appliances</option>
                        <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
                        <option value="furniture">Furniture</option>
                        <option value="books">Books</option>
                        <option value="electronics">Electronics</option>
                        <option value="tools">Tools &amp; Home Improvement</option>
                      </select>
                  </div>  

                  <div className="auth_input">
                    <label htmlFor="category2" ></label>
                      <select ref={(node) => { category2 = node; }}  id="category2" required>
                        <option value="None">None</option>
                        <option value="appliances">Appliances</option>
                        <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
                        <option value="furniture">Furniture</option>
                        <option value="books">Books</option>
                        <option value="electronics">Electronics</option>
                        <option value="tools">Tools &amp; Home Improvement</option>
                      </select>
                  </div>      

                  <div className="auth_input">
                    <label htmlFor="category3" ></label>
                      <select ref={(node) => { category3 = node; }}  id="category3" required>
                        <option value="None">None</option>
                        <option value="appliances">Appliances</option>
                        <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
                        <option value="furniture">Furniture</option>
                        <option value="books">Books</option>
                        <option value="electronics">Electronics</option>
                        <option value="tools">Tools &amp; Home Improvement</option>
                      </select>
                  </div>

                  <div className="auth_input">
                    <label htmlFor="category4" ></label>
                      <select ref={(node) => { category4 = node; }}  id="category4" required>
                        <option value="None">None</option>
                        <option value="appliances">Appliances</option>
                        <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
                        <option value="furniture">Furniture</option>
                        <option value="books">Books</option>
                        <option value="electronics">Electronics</option>
                        <option value="tools">Tools &amp; Home Improvement</option>
                      </select>
                  </div>

                  <div className="auth_input">
                    <label htmlFor="category5" ></label>
                      <select ref={(node) => { category5 = node; }}  id="category5" required>
                        <option value="None">None</option>
                        <option value="appliances">Appliances</option>
                        <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
                        <option value="furniture">Furniture</option>
                        <option value="books">Books</option>
                        <option value="electronics">Electronics</option>
                        <option value="tools">Tools &amp; Home Improvement</option>
                      </select>
                  </div>  

                  <div className="auth_input">
                    <label htmlFor="category6" ></label>
                      <select ref={(node) => { category6 = node; }}  id="category6" required>
                        <option value="None">None</option>
                        <option value="appliances">Appliances</option>
                        <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
                        <option value="furniture">Furniture</option>
                        <option value="books">Books</option>
                        <option value="electronics">Electronics</option>
                        <option value="tools">Tools &amp; Home Improvement</option>
                      </select>
                  </div>  
                  <button onClick={(e)=>{
                    e.preventDefault();
                    category1.value = "appliances";
                    category2.value = "fashion";
                    category3.value = "furniture";
                    category4.value = "books";
                    category5.value = "electronics";
                    category6.value = "tools";
                  }}>All available categories</button>

                <br />
                <div>
                <br />
                  <button type='submit' className="form_submit_button">CREATE CHART</button>
                <br />
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



